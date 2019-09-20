### SpringType v2

> "Everything should be made as simple as possible, but no simpler." - Albert Einstein

SpringType is a tiny but full-featured web app framework written in TypeScript.
You get most features of Angular, React and Vue in < 20KiB (gzipped).
SpringType is faster and more memory efficient than any of the three major frameworks.

It features (out-of-the-box):

- [ ] Functional reactive programming using RxJS for time-complexities
- [ ] Redux based state machine with an intuitive API and optional immutability and local persistence
- [ ] Headache-free DOM element to Web Component binding
- [ ] SSR, server side rendering and VDOM hydration
- [x] Use of modern API's (Web Components, Proxy, Symbol, Decorators, ...)
- [x] TSX (typed JSX) based templating
- [x] Shared memory for hassle-free Web Component inter-linking
- [x] Fast lazy VDOM supporting SVG and even custom script DOM manipulation
- [x] Modular i18n, supporting custom formatters
- [x] Dynamic DOM router
- [x] ShadowDOM encapsulated styling (TSS, typed style sheets)
- [x] Environment-aware logging
- [x] Dependency Injection
- [x] Super-simple, zero-configuration bundling
- [x] Ultra-fast HMR bundling
- [x] Deep change detection and automatic re-rendering, circuit-breakable
- [x] Headache-free style to Web Component binding

We've designed SpringType to be simple, but incredibly powerful and efficient.
Like with any architecture, there are pro's and con's. Here are the con's:

- SpringType uses modern API's and requires polyfills to work in some browsers
- SpringType uses custom, alternative implementations for all modules excluding RxJS
- SpringType works best when you transpile your CSS, SCSS, SASS, LESS, Stylus to TSS
- SpringType is tiny and efficient because it lacks some bells and whistles

https://www.conventionalcommits.org/en/v1.0.0-beta.3/
