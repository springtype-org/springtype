import {Gain} from "./components/Gain";
import {ApplicationContext, InjectionProfile, InjectionStrategy} from "../../package/core/src/index";
import {expect} from "chai";
import {validateRequired} from "../../package/validate/src/decorators";
import {Simple} from "./components/Simple";


describe('DI', () => {
    it('injection', () => {
        let gain: Gain = ApplicationContext.getInstance().getBean(Gain);
        expect(validateRequired(gain)).to.equal(true);
        expect(validateRequired(gain.testInject())).to.equal(true);
    });
    it('simple starter I', () => {
        let simple = ApplicationContext.getInstance().getBean(Simple, InjectionProfile.DEFAULT, InjectionStrategy.NEW);
        let simple2 = ApplicationContext.getInstance().getBean(Simple, InjectionProfile.DEFAULT, InjectionStrategy.NEW);

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


