import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`Functional Component`.page`../dist/index.html`;

test('Click button and check contents', async (t) => {
    await t
        .click(Selector('button'))
        .expect(Selector('#someText').exists).ok()
});
