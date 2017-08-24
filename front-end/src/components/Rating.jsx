import React from 'react';
import Rating from 'react-rating';
import GreyStar from '../images/star-grey.png';
import YellowStar from '../images/star-yellow.png';

const ratingComponent = ({ useAvgRating, rating, changeRating, stallID }) => (
  <Rating
    initialRate={rating}
    readonly={useAvgRating}
    empty={<img alt="rating" src={GreyStar} />}
    full={<img alt="rating" src={YellowStar} />}
    onChange={rate => changeRating(stallID, rate)}
  />
);

export default ratingComponent;
