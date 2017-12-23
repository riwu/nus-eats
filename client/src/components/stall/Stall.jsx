import React from 'react';
import { Link } from 'react-router-dom';
import './Stall.css';
import Rating from './Rating';

class Stall extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.stall.averageRating !== nextProps.stall.averageRating;
  }

  render() {
    return (
      <Link className="Stall" to={`/canteen/${this.props.canteenId}/stall/${this.props.stall.id}`}>
        <div
          style={{ backgroundImage: `url('${this.props.stall.imageUrl}')` }}
          className="image-container"
        />

        <div className="overlay" />

        <div className="content-container">
          <div>{this.props.stall.name}</div>
          <Rating value={this.props.stall.averageRating} readonly />
        </div>
      </Link>
    );
  }
}

export default Stall;
