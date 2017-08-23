import React from 'react';
import Rating from 'react-rating';
import GreyStar from '../images/star-grey.png';
import YellowStar from '../images/star-yellow.png';

const ratingComponent = ({ readonly, rating }) => (
  <Rating
    initialRate={rating}
    readonly={readonly}
    empty={<img alt="rating" src={GreyStar} />}
    full={<img alt="rating" src={YellowStar} />}
  />
);

export default ratingComponent;
