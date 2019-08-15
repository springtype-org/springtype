import 'testcafe';
import {CaseTransformer} from "../../../src/lang";

fixture `CaseTransformer`;

test('kebabToCamelCase', async t => {

    const fooBar = CaseTransformer.kebabToCamelCase('foo-bar');

    await t
        .expect(fooBar)
        .eql('fooBar');
});