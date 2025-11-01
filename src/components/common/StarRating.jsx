import React, { useState } from 'react';

const StarRating = ({ rating, setRating }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex items-center justify-center space-x-1">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={ratingValue}
                        className={`text-4xl transition-colors ${ratingValue <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}`}
                        onClick={() => setRating(ratingValue)}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        &#9733;
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;