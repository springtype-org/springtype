## SpringType

[![Gitter](https://badges.gitter.im/springtype-official/springtype.svg)](https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

### Simplicity

> "Everything should be made as simple as possible, but no simpler." - Albert Einstein

A lit full-stack web framework 💎
Imagine coding without headaches 🍀
We 🤗 elegant web and Node.js APIs.
It's 📦tiny, ⚡fast and fun to use 😃
And written in ❤️ TypeScript 👩‍💻👨‍💻

- [x] Zero runtime dependencies
- [x] Supports all main features you know from React, Angular and Vue.js in about 10KiB (gip) all-in(!)
- [x] Superior type-checking (compile-time, no runtime overhead)
- [x] Fast and lazy VDOM supporting SVG and even custom script DOM manipulation
- [x] Headache-free DOM element to VDOM binding
- [x] Modern API's and ECMAScript language features (WeakMap, Proxy, Symbol, Decorators, ...)
- [x] TSX (typed JSX) based templating (compile-time, no runtime overhead, much like React)
- [x] PostCSS (CSS modules) / template string based SCSS/LESS/CSS4 styling (compile-time, no runtime overhead, much like styled-components), supports theming out of the box
- [x] Shared memory for hassle-free component inter-linking (no Provider/Context headache)
- [x] Simple and dynamic DOM router for client-side routing
- [x] Modular i18n, supporting JSON translations and custom formatter
- [x] Environment-aware logging
- [x] Dependency Injection using decorators (much like Angular, but simpler)
- [x] Super-simple, zero-configuration bundling (based on Webpack 4 atm, but we have big plans)
- [x] Deep change detection and automatic re-rendering, circuit-breakable (Proxy-based)
- [x] Google Material Design UI toolkit
- [x] Ionic 4 toolkit integration

#### On the roadmap
- [ ] Functional reactive programming for time-complexities
- [ ] Redux based state machine with an intuitive API and optional immutability + local/session storage persistence
- [ ] SSR, server side rendering, static page rendering and VDOM re-hydration (once SpringType server landed)

#### Caveats

We've designed SpringType to be simple, but incredibly powerful and efficient.
Like with any architecture, there are pro's and con's.

Here are some con's:

- SpringType uses custom, alternative implementations for commonly known patterns (re-invented the wheel)
- To be tiny and efficient, SpringType lacks some bells and whistles
