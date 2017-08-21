import React from 'react';
import { connect } from 'react-redux';
import Stall from '../components/Stall';

const style = {
  display: 'flex',
};

const stalls = ({ stalls, canteenID }) => (
  <div style={style}>
    {stalls.filter(stall => stall.canteenID === canteenID)
           .map(stall => (
             <Stall title={stall.name} key={stall.id}>
               {stall.description}
             </Stall>
           ))}
  </div>
);

const mapStateToProps = state => ({
  stalls: state.stalls,
});

export default connect(
    mapStateToProps,
  )(stalls);
