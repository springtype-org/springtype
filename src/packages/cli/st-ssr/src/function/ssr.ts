import * as puppeteer from 'puppeteer';
import {defaultBlacklistResources} from "../definition/defaultBlacklistResources";

export async function ssr(url, blacklistRemoteResources: Array<string> = defaultBlacklistResources) {

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const stylesheetContents = {};
    const renderUrl = new URL(url);

    // intercept network requests
    await page.setRequestInterception(true);

    // stash the responses of local stylesheets.
    page.on('response', async resp => {

        const responseUrl = resp.url();
        const sameOrigin = new URL(responseUrl).origin === new URL(url).origin;
        const isStylesheet = resp.request().resourceType() === 'stylesheet';

        if (sameOrigin && isStylesheet) {
            stylesheetContents[responseUrl] = await resp.text();
        }
    });

    page.on('request', req => {

        if (blacklistRemoteResources.find(regex => req.url().match(regex))) {
            return req.abort();
        }

        /* replace files with minified versions (TODO: parametrize)
        if (req.url().endsWith('styles.css')) {
            return req.respond({
                status: 200,
                contentType: 'text/css',
                body: fs.readFileSync('./public/styles.min.css', 'utf-8')
            });
        }
         */

        // ignore requests for resources that don't produce DOM
        // (images, stylesheets, media).
        const whitelist = ['document', 'script', 'xhr', 'fetch'];
        if (!whitelist.includes(req.resourceType())) {
            return req.abort();
        }
        req.continue();
    });

    renderUrl.searchParams.set('headless', '');

    await page.goto(renderUrl, {waitUntil: 'networkidle0'});

    // Inline the CSS.
    // Replace stylesheets in the page with their equivalent <style>.
    await page.$$eval('link[rel="stylesheet"]', (links, content) => {

        links.forEach(link => {

            const cssText = content[link.href];

            if (cssText) {

                const style = document.createElement('style');
                style.textContent = cssText;
                link.replaceWith(style);
            }
        });

    }, stylesheetContents);

    // serialized HTML of page DOM
    const html = await page.content();

    await browser.close();

    return html;
}