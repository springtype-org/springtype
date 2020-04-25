import { MESSAGE_ASSIGNMENTS } from "../decorator/on-message";

export const callOnMessage = (topicName: string, value: any, instance: any) => {

  const prototype = Object.getPrototypeOf(instance);

  if (!prototype[MESSAGE_ASSIGNMENTS]) return;

  // walk thru @onMessage assignments
  for (const assignmentTopicName in prototype[MESSAGE_ASSIGNMENTS]) {
    if (assignmentTopicName !== topicName) {
      continue;
    }
    const targetMethodName = prototype[MESSAGE_ASSIGNMENTS][topicName];

    // call method
    instance[targetMethodName].call(instance, value);
  }
}
