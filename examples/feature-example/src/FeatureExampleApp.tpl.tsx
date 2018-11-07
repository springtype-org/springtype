import {FeatureExampleApp} from "./FeatureExampleApp";

export default (view: FeatureExampleApp) =>

    <div>
        <h2>Burger Button Example</h2>

        <feature-example props={ { menuItems: ['One', 'Two'] } } />
    </div>