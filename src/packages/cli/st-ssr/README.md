## st-ssr

Server-side rendering used to be a complicated topic to talk about -- but not anymore.

With SpringType SSR you can simply run one command or call two functions (programmatic API)
to server-side-render any page and get the resulting HTML DOM in return.

CLI example:

`npx st-ssr http://127.0.0.1:8080/#/someSubPage someSubPage.html`

Programmatic API example:

    import { ssr, saveDOMSnapshot } from "st-ssr";
    
    const dom = await ssr('http://127.0.0.1:8080/#/someSubPage');
    await saveDOMSnapshot(dom, 'someSubPage.html');
   
Can you imagine this task to be any simpler? :)

_Have a lot of fun!_

### Limitations & Performance

- No limitations are known, as this solution uses a headless chrome (Google Chrome) under it's hood.
- As fast and memory efficient as Google Chrome.

### Congratulations

- Eric Bidelman ([ebidel](https://github.com/ebidel)), https://developers.google.com/web/tools/puppeteer/articles/ssr
