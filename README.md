![SpringType Logo](https://www.springtype.org/img/logo.svg)

# SpringType

##### Develop amazing Websites, PWA's and Apps with ease and fun.

## Quick Start

If you're new to SpringType and keen to try it out, just open a terminal and type:

    npx st-create
    
Everything else should be self-explanatory :-)

*Have a lot of fun!*    
    
P.s.: Just make sure that you have [Node.js installed](https://nodejs.org), 
so that `npx` has a chance to work properly.

For anyone else interested in SpringType, please take a few minutes to learn about
our motivation and philosophy.

## The Big Picture

### Our Motivation

SpringType aims to be the web development framework with the most elegant API's and the 
greatest developer experience. This is a stellar goal, but we believe that what we can 
achieve is only limited by what we can imagine.

From 50 years of experience (combined) we learned that all systems of high complexity fail in major aspects.
The more a system grows in complexity...
- *Total cost of Ownership:* ...the more time you have to invest.
- *Developer experience:* ...the less motivated your team is.
- *Performance:* ...the more code is written on top of a bad architecture.
- *Reliability:* ...the more (and harder to fix) bugs will be implemented.
- *Security:* ...the less it can be truly hardened.

That's why we invented SpringType. We're frustrated by today's complex framework API's and
implementations. None of the popular frameworks are fitting into our vision of how 
software development should look like.

We've read the code of all popular web development frameworks. Our initial motivation was
to learn. But sadly, we saw so much code that didn't match our high standards that we came
to the conclusion that there is a need and potential for a new solution.

As a result, we started to re-think many concepts in web development and investigated modern core 
technologies like Web Components and modern EcmaScript standard features.

We wished for a framework that provides us with API's that allow us to easily 
implement features that we need in real-world applications -- but also allows us 
to do that with an elegant architecture that doesn't stand between our goals and the reality.

SpringType comes with an architecture and implementation that is itself easy to understand,
structured in small bunches of code and is, as such, very modular and easy to test. 

The overall code size is small and it's runtime performance is on par or even better than 
React, Angular and Vue.js. 

We believe that the SpringType API's are very elegant, but it's on you to judge.

Only code that matches our high standards for elegance, readability, testability, 
runtime performance and security passes our evaluation. 

### Philosophy of Innovation and Stability

SpringType should provide you with the most elegant architecture and algorithms 
of the time. But to meet this requirement, we need to revise our ideas and implementations quite
frequently. Sometimes, radical changes must be made to be able to improve.

On the other hand, we want to provide you with consistent API's you can truly rely on.
Nothing is as frustrating as a minor version upgrade to break all tests.

Our compromise is:

#### Alpha releases

You must expect *all* API's to change *completely*.

#### Beta releases

Are accumulated alpha releases, so you must expect *all* API's to change *completely*.

#### Stable releases: Minor and patch level

*We won't change any existing API in any minor or patch stable release.* We might add new API's to add new features and fix bugs, but any change will be regression tested and changes in runtime behaviour will be announced boldly.

#### Stable releases: Major

We'll do anything to prevent the need to release a new major version. 
Our architecture is rock-solid and only if it renders out-dated over time we'll decide to develop a whole new architecture.
This likely to happen, when core technologies change to a major degree (DOM standards, Web Component standards, EcmaScript standards). 

### Philosophy of Documentation

An easy to follow documentation with plenty of copy and paste examples
is important for a stellar developer experience. Thus, we focus on 
implementing `docuducks` - our tool to generate a beautiful website 
including a developer guide, interactive examples and API docs.

On top of that, the `README.md` files in each `src/packages/*` sub-module
tell you more about the architecture and why we decided to implement
it like that. 

It's just, we are a little limited in resources. That's why we focus 
on high level documentation first. Low-level code and API documentation
will be written once we've released with the stable version.

### Philosophy of Tests

A good unit and end-2-end test coverage is important for us. However,
we're focusing on architecture and features at the moment. 

Once we've finished `st-test`, we will try to reach at least 70% test
coverage in unit tests and have every page in all project templates 
been tested with TestCafe end-2-end tests.

For the stable version release, 95% test coverage should be the minimum. 

## Pre-beta Roadmap

- [ ] Stabilization, performance improvements (algorithms)
- [ ] Implement `st-transform` as a library for compiling SpringType projects (get rid of webpack and parcel)
- [ ] Update `st-start` to be a live reloading web server (using `st-transform`)
- [x] SSR implemented using `st-ssr` ~~Update `st-build` to be a static compiler CLI (using `st-transform`) including SSR support (using headless Chrome)~~~
- [ ] Implement SCSS transformation for `st-tss` 
- [ ] Enhance `@springtype/material-ui` to include all components necessary and include icon typing such as https://github.com/mui-org/material-ui/pull/7820/files, allow for theming
- [ ] Implement `docuducks` - a spiritual successor of `docusaurus` and release https://www.springtype.org as a SpringType PWA including a nice to read developer guide, interactive code examples and API docs.
- [x] Implemented unit/integration/e2e testing using TestCafe ~~Implement `st-test` as a unit testing executor (https://github.com/GoogleChrome/puppeteer, mocha and chai)~~
- [ ] Improvements for `@springtype/state`, such as `.state` proxied property, configurable StoreConfig, rematch/plugin/select, rematch/plugin/loading, rematch/plugin/persist
- [ ] Update and enhance the dev tools for Chrome and Firefox (new UI based on `@springtype/material-ui`, improved component inspector)
- [ ] Implement `st-native` to support the seamless creation of native apps using Capacitor https://capacitor.ionicframework.com/docs/
- [ ] Provide more Web Component and project templates (Personal website, Blog, PWA App, Admin portal, Login Page, etc.)

A beta release is expected by mid of November 2019.

#### Love SpringType?
Please donate:
https://www.patreon.com/springtype