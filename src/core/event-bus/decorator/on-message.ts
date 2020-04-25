export const MESSAGE_ASSIGNMENTS = 'MESSAGE_ASSIGNMENTS';

export function onMessage(topicName: string): any {

  return function (target: any, propertyKey: string) {

    if (!target[MESSAGE_ASSIGNMENTS]) {
      target[MESSAGE_ASSIGNMENTS] = {};
    }
    target[MESSAGE_ASSIGNMENTS][topicName] = propertyKey;
  }
}
