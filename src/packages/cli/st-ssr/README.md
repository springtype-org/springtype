## st-ssr

Server-side rendering used to be a complicated topic to talk about -- but not anymore.

With SpringType SSR you can simply run one command or call two functions (programmatic API)
to server-side-render any page and get the resulting HTML DOM in return.

CLI example:

`npx st-ssr http://127.0.0.1:8080/#/someSubPage someSubPage.html`

If you plan to execute this CLI more often, please install the package locally:

    npm i st-ssr
    
And run it like that:
     
    $(npm bin)/st-ssr

Or:
  
    ./node_modules/.bin/st-ssr

Programmatic API example:

    import { ssr, saveDOMSnapshot } from "st-ssr";
    
    const dom = await ssr('http://127.0.0.1:8080/#/someSubPage');
    await saveDOMSnapshot(dom, 'someSubPage.html');
   
Can you imagine SSR to be any simpler? :)

_Have a lot of fun!_

### Limitations & Performance

- Limitations of Chromium vs. Google Chrome apply (e.g. media codecs)
- As fast and memory efficient as Chromium

### Congratulations

- Eric Bidelman ([ebidel](https://github.com/ebidel)), https://developers.google.com/web/tools/puppeteer/articles/ssr
