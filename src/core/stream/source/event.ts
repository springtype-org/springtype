import { JournalStream } from "../journal-stream";

export const streamEvent = <T extends Event>(domElement: Element, eventName: string, capture: boolean = false) => {
  const $ = new JournalStream<T>();
  domElement.addEventListener(eventName, async (event: Event) => { $.write(event as unknown as T) }, capture);
  return $;
}
