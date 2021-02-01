<h1 align="center">SpringType v3</h1>

> TypeScript/TSX nano-framework for web apps & PWAs < 2k

[![Gitter](https://badges.gitter.im/springtype-official/springtype.svg)](https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<h2 align="center">Example code</h2>

> "Everything should be made as simple as possible, but no simpler." - Albert Einstein

```tsx
import { tsx, render, Ref } from "springtype";

interface HelloSpringTypeButtonProps {
  framework: string;
}

const HelloSpringTypeButton = ({ framework }: HelloSpringTypeButtonProps) => {

  const btnRef: Ref = {};
  
  const onClick = (evt: MouseEvent) => {
    console.log('SpringType combines TSX with native DOM! :-)');
    btnRef.current.style.transform = 'scale(2)';
  }
  return <button ref={btnRef} onClick={onClick}>Version: {framework}</button>
}
render(<HelloSpringTypeButton framework="v3" />);
```

For a more complex demo, see: 
<a href="https://github.com/springtype-org/springtype/tree/main/e2e/todo-list/src/component/TodoList.tsx">TODO list demo</a>

<h2 align="center">Features</h2>

- ✅ React-like VDOM supporting SVG and native DOM access via `ref`
- ✅ HTML-compatible `TSX`: Supports `class` instead of `className` etc.
- ✅ < 2k bundle size: `1123 bytes` (best, brotli) - `1775 bytes` (worst, umd, gz)
- ✅ Zero dependencies
- ✅ Purely functional
- ✅ First class TypeScript support
- ✅ Unit Test coverage >70%
- ✅ TestCafé smoke tests

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
