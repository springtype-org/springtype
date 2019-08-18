import 'testcafe';
const fs = require('fs');

fixture `integration tests`;

test('./dist exists', async t => {

    await t
        .expect(fs.existsSync('./dist'))
        .eql(true);
});