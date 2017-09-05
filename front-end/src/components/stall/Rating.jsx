import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import Rating from 'react-rating';
import './Rating.css';

const emptyStar = <Glyphicon className="rating-star star-empty" glyph="star" />;
const fullStar  = <Glyphicon className="rating-star star-full" glyph="star" />;

const ratingComponent = ({ useAvgRating, rating, changeRating, stallId }) => (
  <Rating
    initialRate={rating}
    readonly={useAvgRating}
    empty={emptyStar}
    full={fullStar}
    onChange={rate => changeRating(stallId, rate)}
  />
);

export default ratingComponent;
