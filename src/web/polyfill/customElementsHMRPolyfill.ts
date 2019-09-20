export const customElementsHMRPolyfill = (() => {
	const originalDefineFn = CustomElementRegistry.prototype.define;

	CustomElementRegistry.prototype.define = function(
		name: string,
		constructor: Function,
		options?: ElementDefinitionOptions
	) {
		try {
			originalDefineFn.apply(this, [name, constructor, options]);
		} catch (e) {
			// initial custom element registration error, no HMR event
			if (!customElements.get(name)) {
				throw e;
			} else {
				// HMR event: reload the page
				document.location.reload();
			}
		}
	};
})();
