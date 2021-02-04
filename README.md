<h1 align="center">SpringType</h1>

<p align="center">
„Everything should be made as simple as possible, but no simpler.” - Albert Einstein
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/springtype"><img src="https://img.shields.io/npm/v/springtype.svg?style=flat-square" alt="SpringType NPM version"/></a> 
  <a href="https://lgtm.com/projects/g/springtype-org/springtype/context:javascript"><img src="https://img.shields.io/lgtm/grade/javascript/g/springtype-org/springtype.svg?logo=lgtm&logoWidth=18" alt="LGTM Code Quality Rating" /></a>
  <a href="https://lgtm.com/projects/g/springtype-org/springtype/alerts"><img src="https://img.shields.io/lgtm/alerts/g/springtype-org/springtype.svg?logo=lgtm&logoWidth=18" alt="LGTM Total alerts" /></a>
  <a href="https://github.com/springtype-org/springtype/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/springtype-org/springtype.svg" alt="License" /></a>
  <a href="https://circleci.com/gh/springtype-org/springtype"><img src="https://circleci.com/gh/springtype-org/springtype.svg?style=svg" alt="Circle CI" /></a>
  <a href="https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge"><img src="https://badges.gitter.im/springtype-official/springtype.svg" alt="Gitter Chat" /></a>
</p>

<h2 align="center">Example code</h2>

SpringType combines the best parts of the React API with the simplicity of jQuery:

```tsx
import { tsx, render, Ref } from "springtype";
import { $ } from "st-query";

interface HelloMessageProps {
  text: string;
}

// a functional component, just like in React
// but it only renders one time
const HelloMessage = ({ text }: HelloMessageProps) => {

  // reference is stored when the element is created
  const messageRef: Ref = {};

  // because there is no magic re-rendering,
  // we can safely use setInterval() and can also
  // safely wave goodbye to fancy hooks like useCallback() or useEffect()!
  setInterval(() => {

    // in case we want to change the rendering,
    // we just do this programmatically, where it's needed
    $(messageRef.current).html(<p>SpringType </p>);

  }, 1000 /* 1 sec */);

  return (
    <div ref={messageRef}>
      Hello, {text}!
    </div>
  )
}

// SpringType renders to document.body by default
// but you can just provide a second argument to change this
render(<HelloMessage text="World" />);
```

For a more complex demo, see: 
<a href="https://github.com/springtype-org/springtype/tree/main/e2e/todo-list/src/component/TodoList.tsx">TODO list demo</a>

<h2 align="center">Features</h2>

- ✅ React-like VDOM supporting native DOM access via `ref`
- ✅ HTML/SVG-compatible `TSX` - supports standard `class`
- ✅ ~1k bundle size: `961 byte` (best, brotli) - `1209 byte` (worst, umd, gz)
- ✅ Zero dependencies
- ✅ Purely functional
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage
- ✅ TestCafé smoke tests

<h2 align="center">Philosophy</h2>

<b>Less is more! Complexity is the devil!</b>  SpringType does render the TSX structure only one-time.

SpringType does NOT update the DOM. This takes away tons of complexity and performance headaches.

After initial rendering, you can basically go with pure TypeScript/DOM APIs to mutate the DOM wherever and whenever it is actually needed - not when the framework *thinks* it's needed. 

However there is...

- <a href="https://github.com/springtype-org/st-query">st-query</a> - a jQuery-like nano library for runtime DOM manipulation (+~`500 byte`)
- <a href="https://github.com/springtype-org/st-route">st-route</a> - an Expess-like nano library for client-side DOM routing (+~`400 byte`)
- <a href="https://github.com/springtype-org/st-bus">st-bus</a> - a socket.io-like nano library for application/component eventing (+~`150 byte`)

...to make your life easier :-)

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
        src="https://avatars2.githubusercontent.com/u/17221813?s=150&v=4">
        </br>
        <a href="https://github.com/jsdevtom">Tom</a>
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
