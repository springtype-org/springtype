import { ITypedCSSStyleDeclaration } from "./typed-css-style-declaration";

interface IBaseTypedStyleSheet {
	[selector: string]: Partial<ITypedCSSStyleDeclaration>;
}

interface ITypedMediaQueryStyleSheet extends IBaseTypedStyleSheet {
	[mediaQueryOrSelector: string]:
		| {
				[selector: string]: Partial<ITypedCSSStyleDeclaration>;
		  }
		| Partial<ITypedCSSStyleDeclaration>;
}

export interface ITypedStyleSheet extends ITypedMediaQueryStyleSheet {}
