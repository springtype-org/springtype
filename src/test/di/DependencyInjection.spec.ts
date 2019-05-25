import {Gain} from "./components/Gain";
import {ApplicationContext, InjectionProfile, InjectionStrategy} from "@springtype/core";
import {validateRequired} from "@springtype/validate";
import {Simple} from "./components/Simple";
import {expect} from "chai";
import 'mocha';

describe('DI', () => {
    it('injection', () => {
        let gain: Gain = ApplicationContext.getInstance().getBean(Gain);
        expect(validateRequired(gain)).to.equal(true);
        expect(validateRequired(gain.testInject())).to.equal(true);
    });
    it('simple starter I', () => {
        let simple = ApplicationContext.getInstance().getBean(Simple, InjectionProfile.DEFAULT, InjectionStrategy.FACTORY);
        let simple2 = ApplicationContext.getInstance().getBean(Simple, InjectionProfile.DEFAULT, InjectionStrategy.FACTORY);

        expect(simple === simple2).to.equal(false, 'NEW does NOT work.');
        expect(simple.calc(7, 7)).to.any;

        let singletonSimple = ApplicationContext.getInstance().getBean(Simple);
        expect(simple === singletonSimple || simple2 === singletonSimple).to.equal(false, 'NEW and SINGLETON together does NOT work.');
    });

    it('simple starter II', () => {
        let simple = ApplicationContext.getInstance().getBean(Simple);
        expect(validateRequired(simple)).to.equal(true, 'dependency injection failed');
        expect(simple.calc(7, 7)).to.equal(42);
    });
});


