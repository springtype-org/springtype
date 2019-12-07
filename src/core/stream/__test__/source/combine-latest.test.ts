import { stream } from "../../source/stream";
import { streamCombineLatestItems } from "../../source/combine-latest-items";

describe("combine-latest", () => {

  it('combines events when both streams emit', (cb: Function) => {

    const startTime = Date.now();
    const $1 = stream<number>();
    const $2 = stream<number>();

    setTimeout(() => {
      $1.write(5)
    }, 100);


    setTimeout(() => {
      $2.write(10)
    }, 300);

    const $3 = streamCombineLatestItems<number>($1, $2);

    $3.subscribeForPastAndFuture(() => {
      const diffTime = Date.now() - startTime;
      expect(diffTime).toBeGreaterThanOrEqual(300);
      cb();
    })
  });
});
