<h1 align="center">SpringType</h1>

> "Everything should be made as simple as possible, but no simpler." - Albert Einstein

[![Gitter](https://badges.gitter.im/springtype-official/springtype.svg)](https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<h2 align="center">Example code</h2>

```tsx
import { tsx, render } from "springtype";

interface HelloMessageProps {
  text: string;
}

const HelloMessage = ({ text }: HelloMessageProps) => {
  return (
    <div>
      Hello, {text}!
    </div>
  )
}
render(<HelloMessage text="World" />);
```

For a more complex demo, see: 
<a href="https://github.com/springtype-org/springtype/tree/main/e2e/todo-list/src/component/TodoList.tsx">TODO list demo</a>

<h2 align="center">Features</h2>

- ✅ React-like VDOM supporting SVG and native DOM access via `ref`
- ✅ HTML-compatible `TSX` - supports standard `class`
- ✅ < 1.5k bundle size: `991 bytes` (best, brotli) - `1245 bytes` (worst, umd, gz)
- ✅ Zero dependencies
- ✅ Purely functional
- ✅ First class TypeScript support
- ✅ > 95% Unit Test coverage
- ✅ TestCafé smoke tests

<h2 align="center">Philosophy</h2>

<b>Less is more! Complexity is the devil!</b>  SpringType does render the TSX structure only one-time.

SpringType does NOT update the DOM. This takes away tons of complexity and performance headaches.

After initial rendering, you can basically go with pure TypeScript/DOM APIs to mutate the DOM wherever and whenever it is actually needed - not when the framework *thinks* it's needed. 

However there is...

- <a href="https://github.com/springtype-org/st-query">st-query</a> - a jQuery-like nano library for runtime DOM manipulation (+~`500 byte`)
- <a href="https://github.com/springtype-org/st-route">st-route</a> - an Expess-like nano library for client-side DOM routing (+~`400 byte`)

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
