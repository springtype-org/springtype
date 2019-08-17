import { ActiveRenderer } from "@springtype/core";
import { lala } from "./foo";

console.log('foo!asd!!?!', process.env.ARON, lala, 1234);

// @ts-ignore
console.log('tsx resource', <img src={import('../../assets/lala.png')} />);

if (process.env.NODE_ENV === 'production') {

    console.log('abc in prod');

} else {

    console.log('NOT in prod');

}