import {convertObjToGbo} from 'gbo-reader';

// ts-node obj-to-gbo.ts assets/cube.obj
// -> assets/cube.obj.gbo
convertObjToGbo(process.argv[2], process.argv[2] + '.gbo');
