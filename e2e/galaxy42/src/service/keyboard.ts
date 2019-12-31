import { injectable } from "../../../../src/core/di";
import { stream } from "../../../../src/core/stream/source/stream";
import { JournalStream } from "../../../../src/core/stream/journal-stream";
import hotkeys from "hotkeys-js";

@injectable
export class KeyboardService {

  protected up$: JournalStream<KeyboardEvent>;
  protected down$: JournalStream<KeyboardEvent>;
  protected left$: JournalStream<KeyboardEvent>;
  protected right$: JournalStream<KeyboardEvent>;
  protected enter$: JournalStream<KeyboardEvent>;

  constructor() {
    hotkeys('left,right,up,down,enter', (event, handler) => {

      switch (handler.key) {
        case 'left':
          this.left$.write(event);
          break;
        case 'right':
          this.right$.write(event);
          break;
        case 'up':
          this.up$.write(event);
          break;
        case 'down':
          this.down$.write(event);
          break;
        case 'enter':
          this.enter$.write(event);
          break;
      }
    });

    this.up$ = stream<KeyboardEvent>();
    this.down$ = stream<KeyboardEvent>();
    this.left$ = stream<KeyboardEvent>();
    this.right$ = stream<KeyboardEvent>();
    this.enter$ = stream<KeyboardEvent>();
  }

  onUp(fn: () => void) {
    this.up$.subscribeForCurrentAndFuture(fn);
  }

  onDown(fn: () => void) {
    this.down$.subscribeForCurrentAndFuture(fn);
  }

  onLeft(fn: () => void) {
    this.left$.subscribeForCurrentAndFuture(fn);
  }

  onRight(fn: () => void) {
    this.right$.subscribeForCurrentAndFuture(fn);
  }

  onEnter(fn: () => void) {
    this.enter$.subscribeForCurrentAndFuture(fn);
  }

}
