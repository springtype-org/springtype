import { IBoundingBox } from "./interface/ibounding-box";

export const isColliding = (bbox1: IBoundingBox, bbox2: IBoundingBox) => {
  return (
    bbox1.x + bbox1.width > bbox2.x &&
    bbox1.x < bbox2.x + bbox2.width &&
    bbox1.y + bbox1.height > bbox2.y &&
    bbox1.y < bbox2.y + bbox2.height
  );
};
