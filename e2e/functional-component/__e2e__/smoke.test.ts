import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`Visit page`.page`../dist/index.html`;

test('Click button and check contents', async (t) => {
    await t
        .click(Selector('button'))
        .expect(Selector('#someText').exists).ok()
});
