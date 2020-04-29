import { st } from "../st";

export const tap = (value: any, topic: string = 'tap') => {
  const tapTopic = `$${topic}`;
  st.log('tap', tapTopic, value);
  st.globalThis[tapTopic] = value;
  return value;
}
