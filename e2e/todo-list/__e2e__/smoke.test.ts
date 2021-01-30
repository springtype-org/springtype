import { Selector } from 'testcafe';

// eslint-disable-next-line
fixture`TODO List`.page`../dist/index.html`;

test('Remove and adds todos from/to the list', async (t) => {
    await t
        .click(Selector('button[name=remove]'))
        .expect(Selector('#nothing-to-do').exists).ok()
        .typeText(Selector('input[name=description]'), 'test todo')
        .click(Selector('button[name=add]'))
        .expect(Selector('.task').nth(0).exists).ok()
});
