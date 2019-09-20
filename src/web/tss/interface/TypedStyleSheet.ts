import { TypedCSSStyleDeclaration } from "./TypedCSSStyleDeclaration";

interface TypedStyleSheet {
	[selector: string]: Partial<TypedCSSStyleDeclaration>;
}

interface TypedMediaQueryStyleSheet extends TypedStyleSheet {
	[mediaQueryOrSelector: string]:
		| {
				[selector: string]: Partial<TypedCSSStyleDeclaration>;
		  }
		| Partial<TypedCSSStyleDeclaration>;
}

export interface ITypedStyleSheet extends TypedMediaQueryStyleSheet {}
