import {Merge, Partial} from "../../../lang";
import {VirtualElementAttributes} from "./TypedVirtualElementAttributes";
import {VirtualElementGlobalEventHandlers} from "./VirtualElementGlobalEventHandlers";

export interface SVGVirtualElementAttributes<T> extends VirtualElementAttributes, VirtualElementGlobalEventHandlers {
    class: string;
    className: string;
    style: string;

    // support many children
    children: Array<T>;

    // TODO: Support all namespace indicator attributes!
    xmlnsXlink: string;
    xmlnsSvgjs: string;
    xlinkHref: string;

    // DOM string value support

    // attributes
    // TODO: Add all of them: MDN SVG Attribute reference!

    classList: Array<string>;
    value: number;
    valueInSpecifiedUnits: number;
    baseVal: number;
    readonly animVal: SVGAngle;

    x: string|number;
    y: string|number;
    width: string|number;
    height: string|number;
    size: string|number;
    cx: string|number;
    cy: string|number;
    dy: string|number;
    dx: string|number;
    fill: string;
    family: string;
    x1: string|number;
    y1: string|number;
    x2: string|number;
    y2: string|number;
    r: string;
    rx: string|number;
    ry: string|number;
    viewBox: string;
    d: string;
    transform: string;

    xmlns: string;
    version: string;
}

declare global {
    namespace JSX {

        // TODO: Support SMIL (animateTransform etc.)

        interface IntrinsicElements {
            "circle": Merge<Partial<SVGCircleElement>, Partial<SVGVirtualElementAttributes<SVGCircleElement>>>;
            "clipPath": Merge<Partial<SVGClipPathElement>, Partial<SVGVirtualElementAttributes<SVGClipPathElement>>>;
            "defs": Merge<Partial<SVGDefsElement>, Partial<SVGVirtualElementAttributes<SVGDefsElement>>>;
            "desc": Merge<Partial<SVGDescElement>, Partial<SVGVirtualElementAttributes<SVGDescElement>>>;
            "ellipse": Merge<Partial<SVGEllipseElement>, Partial<SVGVirtualElementAttributes<SVGEllipseElement>>>;
            "feBlend": Merge<Partial<SVGFEBlendElement>, Partial<SVGVirtualElementAttributes<SVGFEBlendElement>>>;
            "feColorMatrix": Merge<Partial<SVGFEColorMatrixElement>, Partial<SVGVirtualElementAttributes<SVGFEColorMatrixElement>>>;
            "feComponentTransfer": Merge<Partial<SVGFEComponentTransferElement>, Partial<SVGVirtualElementAttributes<SVGFEComponentTransferElement>>>;
            "feComposite": Merge<Partial<SVGFECompositeElement>, Partial<SVGVirtualElementAttributes<SVGFECompositeElement>>>;
            "feConvolveMatrix": Merge<Partial<SVGFEConvolveMatrixElement>, Partial<SVGVirtualElementAttributes<SVGFEConvolveMatrixElement>>>;
            "feDiffuseLighting": Merge<Partial<SVGFEDiffuseLightingElement>, Partial<SVGVirtualElementAttributes<SVGFEDiffuseLightingElement>>>;
            "feDisplacementMap": Merge<Partial<SVGFEDisplacementMapElement>, Partial<SVGVirtualElementAttributes<SVGFEDisplacementMapElement>>>;
            "feDistantLight": Merge<Partial<SVGFEDistantLightElement>, Partial<SVGVirtualElementAttributes<SVGFEDistantLightElement>>>;
            "feFlood": Merge<Partial<SVGFEFloodElement>, Partial<SVGVirtualElementAttributes<SVGFEFloodElement>>>;
            "feFuncA": Merge<Partial<SVGFEFuncAElement>, Partial<SVGVirtualElementAttributes<SVGFEFuncAElement>>>;
            "feFuncB": Merge<Partial<SVGFEFuncBElement>, Partial<SVGVirtualElementAttributes<SVGFEFuncBElement>>>;
            "feFuncG": Merge<Partial<SVGFEFuncGElement>, Partial<SVGVirtualElementAttributes<SVGFEFuncGElement>>>;
            "feFuncR": Merge<Partial<SVGFEFuncRElement>, Partial<SVGVirtualElementAttributes<SVGFEFuncRElement>>>;
            "feGaussianBlur": Merge<Partial<SVGFEGaussianBlurElement>, Partial<SVGVirtualElementAttributes<SVGFEGaussianBlurElement>>>;
            "feImage": Merge<Partial<SVGFEImageElement>, Partial<SVGVirtualElementAttributes<SVGFEImageElement>>>;
            "feMerge": Merge<Partial<SVGFEMergeElement>, Partial<SVGVirtualElementAttributes<SVGFEMergeElement>>>;
            "feMergeNode": Merge<Partial<SVGFEMergeNodeElement>, Partial<SVGVirtualElementAttributes<SVGFEMergeNodeElement>>>;
            "feMorphology": Merge<Partial<SVGFEMorphologyElement>, Partial<SVGVirtualElementAttributes<SVGFEMorphologyElement>>>;
            "feOffset": Merge<Partial<SVGFEOffsetElement>, Partial<SVGVirtualElementAttributes<SVGFEOffsetElement>>>;
            "fePointLight": Merge<Partial<SVGFEPointLightElement>, Partial<SVGVirtualElementAttributes<SVGFEPointLightElement>>>;
            "feSpecularLighting": Merge<Partial<SVGFESpecularLightingElement>, Partial<SVGVirtualElementAttributes<SVGFESpecularLightingElement>>>;
            "feSpotLight": Merge<Partial<SVGFESpotLightElement>, Partial<SVGVirtualElementAttributes<SVGFESpotLightElement>>>;
            "feTile": Merge<Partial<SVGFETileElement>, Partial<SVGVirtualElementAttributes<SVGFETileElement>>>;
            "feTurbulence": Merge<Partial<SVGFETurbulenceElement>, Partial<SVGVirtualElementAttributes<SVGFETurbulenceElement>>>;
            "filter": Merge<Partial<SVGFilterElement>, Partial<SVGVirtualElementAttributes<SVGFilterElement>>>;
            "foreignObject": Merge<Partial<SVGForeignObjectElement>, Partial<SVGVirtualElementAttributes<SVGForeignObjectElement>>>;
            "g": Merge<Partial<SVGGElement>, Partial<SVGVirtualElementAttributes<SVGGElement>>>;
            "image": Merge<Partial<SVGImageElement>, Partial<SVGVirtualElementAttributes<SVGImageElement>>>;
            "line": Merge<Partial<SVGLineElement>, Partial<SVGVirtualElementAttributes<SVGLineElement>>>;
            "linearGradient": Merge<Partial<SVGLinearGradientElement>, Partial<SVGVirtualElementAttributes<SVGLinearGradientElement>>>;
            "marker": Merge<Partial<SVGMarkerElement>, Partial<SVGVirtualElementAttributes<SVGMarkerElement>>>;
            "mask": Merge<Partial<SVGMaskElement>, Partial<SVGVirtualElementAttributes<SVGMaskElement>>>;
            "metadata": Merge<Partial<SVGMetadataElement>, Partial<SVGVirtualElementAttributes<SVGMetadataElement>>>;
            "path": Merge<Partial<SVGPathElement>, Partial<SVGVirtualElementAttributes<SVGPathElement>>>;
            "pattern": Merge<Partial<SVGPatternElement>, Partial<SVGVirtualElementAttributes<SVGPatternElement>>>;
            "polygon": Merge<Partial<SVGPolygonElement>, Partial<SVGVirtualElementAttributes<SVGPolygonElement>>>;
            "polyline": Merge<Partial<SVGPolylineElement>, Partial<SVGVirtualElementAttributes<SVGPolylineElement>>>;
            "radialGradient": Merge<Partial<SVGRadialGradientElement>, Partial<SVGVirtualElementAttributes<SVGRadialGradientElement>>>;
            "rect": Merge<Partial<SVGRectElement>, Partial<SVGVirtualElementAttributes<SVGRectElement>>>;
            "stop": Merge<Partial<SVGStopElement>, Partial<SVGVirtualElementAttributes<SVGStopElement>>>;
            "svg": Merge<Partial<SVGSVGElement>, Partial<SVGVirtualElementAttributes<SVGSVGElement>>>;
            "switch": Merge<Partial<SVGSwitchElement>, Partial<SVGVirtualElementAttributes<SVGSwitchElement>>>;
            "symbol": Merge<Partial<SVGSymbolElement>, Partial<SVGVirtualElementAttributes<SVGSymbolElement>>>;
            "text": Merge<Partial<SVGTextElement>, Partial<SVGVirtualElementAttributes<SVGTextElement>>>;
            "textPath": Merge<Partial<SVGTextPathElement>, Partial<SVGVirtualElementAttributes<SVGTextPathElement>>>;
            "tspan": Merge<Partial<SVGTSpanElement>, Partial<SVGVirtualElementAttributes<SVGTSpanElement>>>;
            "use": Merge<Partial<SVGUseElement>, Partial<SVGVirtualElementAttributes<SVGUseElement>>>;
            "view": Merge<Partial<SVGViewElement>, Partial<SVGVirtualElementAttributes<SVGViewElement>>>;
        }
    }
}