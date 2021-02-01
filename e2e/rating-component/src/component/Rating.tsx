import { tsx, Props } from "../../../../dist/index";
import './Rating.scss';

export interface RatingProps extends Props {
    rating: number;
    maxRating: number;
    onSelectionChange: (rating: number) => void;
}

function setStarsFilledClasses(index: number): void {
    // set highlighted classes on stars
    document.querySelectorAll('.star').forEach((star: HTMLDivElement) => {
        if (+star.dataset.index <= index) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

export function Rating({rating, onSelectionChange, maxRating}: RatingProps) {
    const iterations = Array.from({length: maxRating}).map((_, i) => i);

    function onMouseOverStar(index: number): void {
        setStarsFilledClasses(index);
    }

    function onMouseLeaveContainer(): void {
        setStarsFilledClasses(rating);
    }

    return <div class="stars-container" onMouseLeave={() => onMouseLeaveContainer()}>
        {
            iterations.map((i) => {
                return <div
                    data-index={i}
                    class={"star" + (i < rating ? ' filled' : '')}
                    onMouseOver={() => onMouseOverStar(i)}
                    onClick={() => onSelectionChange(i)}
                >
                    <svg class="star__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                        <path
                            class="star__svg__path"
                        />
                        <rect fill="none" width="32" height="32"/>
                    </svg>
                </div>
            })
        }
    </div>;
}
