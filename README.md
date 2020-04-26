<h1 align="center">SpringType</h1>

> A re-invention of a union-set of features seen in [React, Angular, Vue].
> A simplified, fastified, minified apporach to modern web development.
> It's < 20K (gzip) all-in, including VDOM, DOM router, components, DI, state management, i18n, Redux store, event bus, streaming API. Tree-shaking makes sure that usual build sizes are < than our favourite cat meme :-)

<img src="catmeme.gif" />

[![Gitter](https://badges.gitter.im/springtype-official/springtype.svg)](https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<h2 align="center">Simplicity</h2>

> "Everything should be made as simple as possible, but no simpler." - Albert Einstein

SpringType is the result of 35 web developer years of suffering 😅 But now, imagine web dev without headaches! 🍀🎉 In SpringType we've reduced the complexity of it all. Everything is simple 🤩 It's also minimalist 📦 and fast ⚡. Written in ❤️ TypeScript 👩‍💻👨‍💻 you get type-safety and code completion in all major IDE's.

<h2 align="center">Features</h2>

- [x] Fast and lazy VDOM supporting SVG and native DOM access (`@component, @attr, @event`)
- [x] No more JSX/TSX limits: Any valid HTML is valid TSX! (no `className` etc., just copy & paste HTML, it just works)
- [x] Tiny. Supports all main features you know from React, Angular and Vue.js in < 16KiB (gzip) all-in(!)
- [x] Security & Maintainability. SpringType core & web have *0 runtime dependencies*
- [x] Headache-free DOM element to VDOM binding (`@ref modalDiv`, `<div ref={modalDiv: this}>e.g. a Bootstrap modal</div>`)
- [x] Modern API's and ECMAScript language features (WeakMap, Proxy, Symbol, Decorators, ...)
- [x] TSX (typed JSX) based templating (compile-time, no runtime overhead) (`st.render(<MyComponent iAmTyped={"yes"}><SoEasy /></MyComponent>)`)
- [x] Deep change detection, circuit-breakable, no Provider/Context headache (`@context`, `@onContextChange`)
- [x] Reactive, functional API (`debounce()`, `component()`, ...)
- [x] Simple & effective high-performance event bus (internal app components event-driven communication) (`st.sendMessage(...)`, `st.onMessage(...)`, `@onMessage`)
- [x] Simple and dynamic DOM router for client-side routing (`<Route path=["home", "", "*"]><p>Home!</p></Route>`, `<RouteList>`)
- [x] Modular i18n, supporting JSON translations and custom formatter (`t('hello-world')`, `<T>Hello, world!</T>`)
- [x] Environment-aware logging (`st.log`, `st.warn`, `st.error`)
- [x] Dependency Injection using decorators (`@inject`, `st.inject(...)`)
- [x] Redux store integration out-of-the-box

<h2 align="center">3rd party framework integrations</h2>

- [x] Ionic Framework 4 support for Mobile App / SPA development  (just use it AS IS, <a href="https://github.com/springtype-org/st-ionic-example-app">integration example</a>), generate a project using `st-create`
- [x] Bootstrap 4 support (just use it AS IS, <a href="https://github.com/springtype-org/st-bootstrap">integration example</a>, generate a project using `st-create`)
- [x] Materialize CSS support (just use it AS IS, <a href="https://github.com/springtype-org/st-materialize">integration example</a>, generate a project using `st-create`)
- [x] <a href="https://github.com/springtype-org/st-material">Google Material Design UI toolkit (material.io) based high-performance component library</a> (`st-material`), generate a project using `st-create`

<h2 align="center">Bundling, Live Reload & Developer Experience</h2>

- [x] <a href="https://github.com/springtype-org/st-start">Super-simple, zero-configuration bundling using `st-start` (based on Webpack 4 and Babel 7)</a>
- [x] <a href="https://github.com/springtype-org/st-create">Project scaffolding, generate SpringType projects, components etc. using `st-create`</a>
- [x] TSX (typed JSX) based templating (compile-time, no runtime overhead, much like React)
- [x] Superior type-checking (compile-time, no runtime overhead)
- [x] PostCSS (CSS modules) / template string based SCSS/LESS/CSS4 styling (compile-time, no runtime overhead, much like styled-components), supports theming out of the box

<h2 align="center">Pro's & Con's</h2>

We've designed SpringType to be simple, but incredibly powerful and efficient.
Like with any architecture, there are pro's and con's.

- SpringType uses custom, alternative implementations for commonly known patterns (we've re-invented the wheel)
- To be tiny and efficient, SpringType lacks some bells and whistles

<h2 align="center">Short-term Roadmap</h2>

We're keen to improve this implementation until we feel really comfortable with it. Right now this lacks:

- [ ] SSR, server side rendering, static page rendering and VDOM re-hydration (once SpringType server landed)

<h2 align="center">Backers</h2>

Thank you so much for supporting us financially! 🙏🏻😎🥳👍

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/17221813?v=4&s=150">
        </br>
        <a href="https://github.com/jsdevtom">Tom</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Maintainers</h2>

SpringType is brought to you by:

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/454817?v=4&s=150">
        </br>
        <a href="https://github.com/kyr0">Aron Homberg</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/12079044?s=150&v=4">
        </br>
        <a href="https://github.com/mansi1">Michael Mannseicher</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Contributing</h2>

Please help out to make this project even better and see your name added to the list of our
[CONTRIBUTORS.md](./CONTRIBUTORS.md) :tada:
