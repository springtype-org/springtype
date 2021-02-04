import {Selector} from 'testcafe';

// eslint-disable-next-line
fixture`Rating Component`.page`../dist/index.html`;

async function assertStarsFilledTo(starsCount: number, stars: Selector, filledToIndex: number, t: TestController): Promise<void> {
    for (let i = 0; i < starsCount; i++) {
        const star = stars.filter(`[data-index="${i}"]`).nth(0);
        const isFilled = (await star.classNames).includes('filled')

        if (i <= filledToIndex) {
            await t.expect(isFilled).ok()
        } else {
            await t.expect(!isFilled).ok()
        }
    }
}

test('should show initial rating', async (t) => {

    await t.wait(10);
    
    const initialFilledCount = 3;
    const stars = Selector('.star');
    const starsCount = await stars.count;

    await t.expect(starsCount).eql(5);
    await assertStarsFilledTo(starsCount, stars, initialFilledCount - 1, t);
});

test('should fill star being hovered and those left of it', async (t) => {

    await t.wait(10);

    const stars = Selector('.star');

    const starsCount = await stars.count;

    await t.hover(`.star[data-index="0"]`);

    await assertStarsFilledTo(starsCount, stars, 0, t);

    await t.hover(`.star[data-index="4"]`);

    await assertStarsFilledTo(starsCount, stars, 4, t);

    await t.hover(`.star[data-index="2"]`);

    await assertStarsFilledTo(starsCount, stars, 2, t);

    await t.hover(`.star[data-index="3"]`);

    await assertStarsFilledTo(starsCount, stars, 3, t);

    await t.hover(`.star[data-index="1"]`);

    await assertStarsFilledTo(starsCount, stars, 1, t);
});

test('should remember user\'s selection', async (t) => {

    await t.wait(10);

    const stars = Selector('.star');
    const starsCount = await stars.count;

    await t.click(`.star[data-index="2"]`);
    await t.hover(`body`);

    await assertStarsFilledTo(starsCount, stars, 2, t);

    await t.click(`.star[data-index="4"]`);
    await t.hover(`.star[data-index="2"]`);
    await t.click(`.star[data-index="1"]`);
    await t.hover(`body`);

    await assertStarsFilledTo(starsCount, stars, 1, t);
});

