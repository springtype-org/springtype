
      ____             _            _____                 
     / ___| _ __  _ __(_)_ __   __ |_   _|   _ _ __   ___ 
     \___ \| '_ \| '__| | '_ \ / _` || || | | | '_ \ / _ \
      ___) | |_) | |  | | | | | (_| || || |_| | |_) |  __/
     |____/| .__/|_|  |_|_| |_|\__, ||_| \__, | .__/ \___|
           |_|                 |___/     |___/|_|         



## TODO

Pre-beta-release TODO list:

Conventional Commits

- Modules:
  - core
    - decouple test submodule dependency
  - cd
    - Impl. @FieldMirror, a @Field that can link the state between web components
  - devtools
    - Packaging for Chrome & Firefox
  - general
    - tslint + rules
  - ssr
    - implement express router bridge
    - API for environment check
    - initial state for server-side rendering
    - how to identify first whole rendering
    - export router ($st.Router)
  - webcomponent
    - add initial rendering algorithm ("spark")
    - use differential rendering algorithm ("graphmaster") only for 1+n 
    - FieldChange interface declaration and hooks?
    - collectNamespaceAttributes: Better ways?
  - test
    - Impl. @Before and @After
    - Proof injects working
  - state
    - .state property?
    - @MapStateToField - instances -> WeakSet (memory leak!)
    - Allow to configure StoreConfig
    - Support for selectors: https://github.com/rematch/rematch/blob/master/plugins/select/README.md
    - Support for loading: https://github.com/rematch/rematch/blob/master/plugins/loading/README.md
    - Support for persist: https://github.com/rematch/rematch/blob/master/plugins/persist/README.md
  - material-ui
    - Theme support
    - setTheme
    - More UI elements
    - icon typing: https://github.com/mui-org/material-ui/pull/7820/files
    
- Write documentation for all modules (inline)

- Write tests (70 to 90% goal)
  - First finish "test" module implementation
     
- How to deal with SSR (server side rendering) and AOT compiles?

#### Love SpringType?
Please donate:
https://www.patreon.com/springtype

# Usage
    npm i
    ts-node src/scratch/DependencyInjection.spec.ts
    
## Example Intellij    
### Executing test
    1. Add a new configuration for Mocha
    2. Add your Node Interpreter path to node module
    3. Add to Node options "--require C:\Users\CHANGE_ME\AppData\Roaming\npm\node_modules\ts-node\register"
    4. Select file pattern and enter this "src/**/*.spec.ts"
    
![Alt text](tests.jpg)

