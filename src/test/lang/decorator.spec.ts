import {Try, UndefinedError} from "../../package/lang";
import {expect} from "chai";
import {PropertyComparator, CompareType} from "../../package/lang/src/util/PropertyComparator";

describe('lang', () => {
    it('Try ', function () {
        const array = ["first"];
        expect(Try.of(() => array[1]).recover(UndefinedError,
            () => "second").get()).to.equal("second")

    });
    it('Try o ', function () {
        const o: any = {};
        expect(
            Try.of(() => o["dsdf"]["jkj"])
                .recover(TypeError,
                    () => "second").isSuccess()).to.equal(true)

    });
    it('PropertyComparator o ', function () {
        expect( PropertyComparator.equal({
            prop: "test", nested: {prop: "test", nested: {prop: "test", nested: {}}}
        }, {
            prop: "test", nested: {prop: "test", nested: {prop: "test",prop1: "test", nested: {}}}
        })).to.equal(false);
        expect( PropertyComparator.equal({
            prop: "test", nested: {prop: "test", nested: {prop: "test", nested: {}}}
        }, {
            prop: "test", nested: {prop: "test", nested: {prop: new String("test"),prop1: "test", nested: {}}}
        }, CompareType.PARTIAL)).to.equal(true);

        expect(PropertyComparator.equal([2,3],[2,3,4], CompareType.PARTIAL)).to.equal(true);
        expect(PropertyComparator.equal([2,3,4],[2,3], CompareType.PARTIAL)).to.equal(false);
        expect(PropertyComparator.equal([2,3],[2,3,4])).to.equal(false);
        expect(PropertyComparator.equal("sd",new String("sd"))).to.equal(true);
        expect(PropertyComparator.equal(1,new Number(1))).to.equal(true);
        expect(PropertyComparator.equal(1.5,new Number(1.5))).to.equal(true);
        const milliseconds = Date.now();
        expect(PropertyComparator.equal(new Date(milliseconds),new Date(milliseconds))).to.equal(true);
    });
});


