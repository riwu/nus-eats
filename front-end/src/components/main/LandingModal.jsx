import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class LandingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }
  closeModal() {
    this.setState({ show: false });
  }
  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.closeModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to NUSeats!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Sick of having lunch alone?</h4>
          <h4>Ever wish you could easily schedule meal appointments?</h4>
          <h4>Wait no more!</h4>
          <br />
          <div>NUSeats is a mobile friendly app that allows you to create meal meetings and broadcast them to your Facebook friends!</div>
          <br />
          <div>Real-time information on canteens around NUS are also provided, including reviews, photos, distance and even crowdedness!</div>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={() => this.closeModal()}>Let's begin!</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default LandingModal;
