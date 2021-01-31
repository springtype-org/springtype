import { st, Ref, render, renderOnReady } from "../../../dist/index";
import { Rating } from "./component/Rating";

import "./index.scss";


const ratingContainerRef: Ref = {};
let rating = 3;

function onSelectionChange(index: number): void {
    rating = index;

    ratingContainerRef.current.innerHTML = '';

    st.renderer.render(renderRatingComponent(), ratingContainerRef.current);
}

function renderRatingComponent() {
    return <Rating rating={rating} maxRating={5} onSelectionChange={onSelectionChange}/>;
}

renderOnReady(<fragment>

    <div ref={ratingContainerRef}>{renderRatingComponent()}</div>

</fragment>);
