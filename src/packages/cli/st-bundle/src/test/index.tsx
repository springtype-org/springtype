import { ActiveRenderer } from "@springtype/core";

export const lala: string = 'foo2 michis';

function myDecorator(proto: any) {

}

// @ts-ignore
console.log('tsx resource', <img src={import('../../assets/lala.png')} />);

@myDecorator
class Xyz extends HTMLElement {

}