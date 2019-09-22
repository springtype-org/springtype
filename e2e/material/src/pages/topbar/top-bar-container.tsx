import {Attribute, CustomElement, ILifecycle} from "../../../../../src/web/customelement";
import {IVirtualNode, IVirtualNodeAttributes} from "../../../../../src/web/vdom/interface/IVirtualNode";
import {VariantType} from "../../../../../material/src/component/mwc-top-bar/mwc-top-bar";
import {tsx} from "../../../../../src/web";
import '../../../../../material/src/component/mwc-top-bar/mwc-top-bar'

@CustomElement('top-bar-container', {shadowMode: "none"})
export class TopBarContainer extends HTMLElement implements ILifecycle {
    @Attribute()
    type: VariantType = false;


    render(): IVirtualNode<IVirtualNodeAttributes> {
        const name = !this.type ? 'STANDARD' : this.type.toUpperCase();
        return <div>
            <h2>{name}</h2>
            <div style="max-width: 400px; max-height: 300px; overflow: hidden; scrollbar-y: auto; overflow-y: auto; border: 1px black solid;">
                <mwc-top-bar mwc-title={name} mwc-variant={this.type}/>
                <div>
                    <div style="margin: 15px;"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor. Aenean massa
                        <strong> strong</strong>. Cum sociis natoque penatibus
                        et magnis dis parturient montes, nascetur ridiculus
                        mus. Donec quam felis, ultricies nec, pellentesque
                        eu, pretium quis, sem. Nulla consequat massa quis
                        enim. Donec pede justo, fringilla vel, aliquet nec,
                        vulputate eget, arcu. In enim justo, rhoncus ut,
                        imperdiet a, venenatis vitae, justo. Nullam dictum
                        felis eu pede <a class="external ext" href="#">link </a>
                        mollis pretium. Integer tincidunt. Cras dapibus.
                        Vivamus elementum semper nisi. Aenean vulputate
                        eleifend tellus. Aenean leo ligula, porttitor eu,
                        consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                        dapibus in, viverra quis, feugiat a, tellus. Phasellus
                        viverra nulla ut metus varius laoreet. Quisque rutrum.
                        Aenean imperdiet. Etiam ultricies nisi vel augue.
                        Curabitur ullamcorper ultricies nisi.</p></div>
                </div>
            </div>
            </div>
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'top-bar-container': Partial<TopBarContainer>;
        }
    }
}
