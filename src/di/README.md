## Dependency Injection (DI) and Inversion of Contol (IoC)

The SpringType dependency injection is modeled after the original Spring frameworks
implementation. The basic idea is, to match the Springs DI architecture and API 
in a way that it feels comfortable for most used features. 

However, SpringType concentrates on features that are pragmatically usable for
modern web development. Thus, we abandoned many out-dated approaches like XML-based
bean configuration and component scanning. 

TypeScript is a typed superset of next-gen JavaScript and thus it comes with
many features that allow for a more elegant implementation of the core ideas.
Likewise, some limitations hold us back from implementing some fancy ideas. 

However, we always strive to adjust implementation details and concepts in order 
to find new, elegant solutions that yield an optimal ratio between performance 
and simplicity.

### Basic Concepts & Ideas

#### Object-oriented programming & Polymorphism

Dependency Injection (DI) and Inversion of Control (IoC) applies to Object-oriented
programming. It's about `class Car` requires four instances (objects) of `class Wheel`
to actually work. Also the `class SportsCar` which inherits from `class Car` needs 
four wheels (polymorphism). 

#### Inversion of Control & Dependency Injection

Back in the old days (90s, early 2000s) most applications were not using advanced
concepts like Inversion of Control. This means that `class Car` would create four
instances of `class Wheel` by using `new Wheel()` either hard-coded in 4 lines of code
or in a loop. As you can see the implementation of, `Car` will always force itself
to use this specific `Wheel` to be used. But what if we want to try another type of
`Wheel`? For example a `TestWheelTypeA` or a `OptimizedRacingWheel`. Both could be 
subclasses of `Wheel` and they would be compatible with each other as all those
classes probably implement the interface `IWheel`. 

This is, where Dependency Injection and Inversion of Control comes into play:

- A Dependency Injection framework implements an elegant syntactic sugar API to 
  allow to specify the type of `Wheel` (dependency) that should be used from
  *outside the actual implementation of car*. The object instance of `class Wheel` 
  is created by a `Factory` and injected into the constructor of `class Car`.

- Inversion of Control is explains this paradigm change as an inversion: 
  `class Car` does no longer control the instantiation of `class Wheel`. 
  `class Wheel` is injected into the class which depends on it (`class Car`) instead, 
  which inverts the control flow logic.

### Implementation

Lets take a deep dive into how we implemented the dependency injection framework:

#### Components (`@Component`)

Classes that are injectable as dependencies for other classes are called components.
Each component class should be annotated by the decorator `@Component`.

#### `BeanFactory`'s

Every object (class instance) that can be injected as a dependency is resolved by the
algorithms implemented in `class BeanFactory`. This class also has a `registry` object to know
about all components. Whenever the BeanFactory needs to create an instance of a component
in order to inject it as a dependency for another classes instance, it remembers the
first instance of it's class in the `singletonInstances` object.

#### `ApplicationContext`'s

This class is a direct sub-class of `BeanFactory`. The idea is, that you could have more
than one context of your application. For example "server-side" and "client-side" code.

If you share this code, you probably don't want to share all classes between the contexts 
as their implementations might be incompatible with the execution environment (Node.js, Browser).

This is the same idea, Spring had in mind originally, but we put it to the next level by
leveraging the power of being able to have a codebase seamlessly shared between server and client.

In order to fetch instances of your classes, you can fetch a default application context instance using:
`ApplicationContext.getInstance()`.

### Features

We carefully crafted the algorithms of the DI to do what the developer would expect to happen.
The intention was to have a simple to use system with a minimal API, everybody could easily remember.
It should be self-explanatory and simply not possible to "use it wrong".

#### Dependency injection for constructor arguments

Whenever you refer to a class in a constructor argument and doesn't give it a default value, 
the DI will inject a singleton instance of this class. It is important that those classes are 
annotated with `@Component`.

Example:

    @Component
    export class HelloWorld {
    
        constructor(test: Test) {
            // will inject a singleton instance of class Test
        }
    }

#### Dependency injection for method arguments

If you'd like to inject dependencies for method arguments, you need to put the `@Autowired` decoration
above the method definition. 

Example:

    @Component
    export class HelloWorld {
    
        @Autowired
        private someOtherMethod(test: Test) {
            // will inject a singleton instance of class Test
        }
    }

#### Special injection rules using `@Inject`

In case you want to specify specific classes or values to be injected, you can set the `@Inject` decorator
in front of the argument you want to define a special behaviour for.

##### Injection of new instances

Lets assume you want to inject a new instance instead of injecting a singleton instance.

Example:

    @Component
    export class HelloWorld {
    
        @Autowired
        private someOtherMethod(@Inject(Test, InjectionStrategy.NEW) test: Test) {
            // will inject a new instance of class Test
        }
    }


##### Injection of different classes

Sometimes, a specific sub-class of an abstract superclass is desired to be injected.

Example:

    @Component
    export class HelloWorld {
    
        @Autowired
        private someOtherMethod(@Inject(SpecialTest) test: Test) {
            // will inject a singleton instance of class SpecialTest
        }
    }

##### Injection of class instances using factory functions

There are cases when you want to inject one or more instances of a class with or without usage of the DI.

Example:

    function testFactory() {
    
        const ac = ApplicationContext.getInstance();
        const tests = [];
        
        for (let i=0; i<10; i++) {
            const testInstance = ac.getBean(Test, InjectionProfile.DEFAULT, InjectionStrategy.NEW);
            testInstance.prepareSpecially(i);
            tests.push(testInstance);
        }
        return tests;
    }

    @Component
    export class HelloWorld {
    
        @Autowired
        private someOtherMethod(@Inject(testFactory()) test: Array<Test>) {
            // will inject 10 new instances class Test
        }
    }

##### Injection of arbitrary values

Especially for unit testing, the injection of arbitrary values instead of production-code implementations 
might be helpful. You can inject any arbitrary value by just referencing it, even if it's not of the 
specified type. This is desired type-unsafety for the developers ease:

Example:

    @Component
    export class HelloWorld {
    
        @Autowired
        private someOtherMethod(@Inject({arbitrary: true}) test: Test) {
            // will inject an arbitary object with the property arbitrary: true
        }
    }

#### Injection Profiles

##### Automatic mock class injection using `mockedBy` in `InjectionProfile.TEST`

One problem common to almost all DI implementations is the need to extend or
override classes for unit testing. This is because classes are injecting 
production-grade code that would i.e. run code not desired for the unit test case.

SpringType's DI allows to specify what class should be used for mocking in test mode
on a granular per-class level at design time. 


Example:

    @Component({
        mockedBy: TestMock
    })
    export class Test {
    
        // probably don't want to inject this in unit tests
        constructor(httpService: HttpService) {
        }
        
        prepareSpecially(i: number): void {
        
            // production behaviour goes here
            console.log('prepareSpecially', i);
            
            // example of what you don't want to execute in unit tests
            this.httpService.delete('/admin', i);
        }
    }
    
    // you can decide if you extend Test or not
    
    @Component
    export class TestMock extends Test {
    
        // no injections
        constructor() {
        
            // no httpService injected
            super(null);
        }
        
        prepareSpecially(i: number): void {
            // mock behaviour goes here
        }
    }
    
Whenever you are in unit test mode, beans will be resolved using `InjectionProfile.TEST` resulting in a 
mocked test instance to be returned:

    // instance of TestMock
    const testInstance = ApplicationContext.getInstance().getBean(Test, InjectionProfile.TEST);
     
But for `InjectionProfile.DEFAULT` profile, a `Test` class instance will be returned: 
     
    // instance of Test
    const testInstance = ApplicationContext.getInstance().getBean(Test, InjectionProfile.DEFAULT);

If you don't specify a mock implementation using `mockedBy`, the DI will always return the original 
class implementation. The behaviour follows down the dependency graph, so that you will, in test mode,
never need to care for manual mocking anymore.

### Limitations

#### You cannot define a dependency using an interface. It must be a class (superclass).

Because interfaces are a synthetic "syntax sugar" in TypeScript and only available
at compile time, they are not part of the generated EcmaScript code. Due to this fact,
the dependency injection that works at runtime (code execution time) cannot resolve 
from an interface named at compile time to a matching class implementation at runtime.

To deal with polymorphism and architecture concerns, we suggest to:
- Define an interface at compile time (i.e.: `interface ICar { ... }`)
- Implement an abstract super-class (i.e.: `abstract class Car implements ICar { ... }`)
- Provide as much class implementations inheriting from the abstract super-class as you need (i.e.: `class MyCar extends Car { ... }; export class CarTest extends Car { ... }`)
- Define the abstract class as the dependency in constructor and method arguments (e.g.: `car: Car`)
- Add the `@Inject()` decorator to further specify the injection target class implementation (`@Inject(bySymbol(MyCar))`)