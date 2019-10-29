import { tsx } from "../../../src/web/vdom";
import { Foo2 } from "./component";
import { Foo } from "./index";

export const tpl = (customElement: Foo) => {
	return (
		<div alt="asd1">
			<button onClick={customElement.onButtonClick}>Rerender</button>
			<a href="foo">{"bar" + customElement.some}</a>

			<Foo2 foo="outerspace" foo2={true}>
				<template slot="counter">1234</template>
			</Foo2>

			<svg version="1.1" xlinkHref={"https://developer.mozilla.org/"}>
				<circle cx="100" cy="100" r="50" fill="black" novdom />
				<script type="text/javascript">
					{`
            var KEY = { w:87, a:65, s:83, d:68 };
            var moveSpeed = 5;
            var circle = document.getElementsByTagName("circle")[0];
            if (circle) { // undefined when shadow mode is "open"
              var x = circle.getAttribute('cx')*1;
              var y = circle.getAttribute('cy')*1;
              document.documentElement.addEventListener('keydown', function(evt) {

                switch (evt.keyCode){
                  case KEY.w:
                    circle.setAttribute('cy',y-=moveSpeed);
                    // Alternatively:
                    // circle.cy.baseVal.value = (y-=moveSpeed);
                  break;
                  case KEY.s:
                    circle.setAttribute('cy',y+=moveSpeed);
                  break;
                  case KEY.a:
                    circle.setAttribute('cx',x-=moveSpeed);
                  break;
                  case KEY.d:
                    circle.setAttribute('cx',x+=moveSpeed);
                  break;
                }

              }, false);
            }
          `}
				</script>
			</svg>
		</div>
	);
};
