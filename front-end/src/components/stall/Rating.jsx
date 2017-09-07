import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import Rating from 'react-rating';
import './Rating.css';

const emptyStar = <Glyphicon className="rating-star star-empty" glyph="star" />;
const fullStar = <Glyphicon className="rating-star star-full" glyph="star" />;

const RatingComponent = ({ readonly, value, changeRating }) => (
  <Rating
    initialRate={value}
    readonly={readonly}
    empty={emptyStar}
    full={fullStar}
    onChange={changeRating}
  />
);

export default RatingComponent;
