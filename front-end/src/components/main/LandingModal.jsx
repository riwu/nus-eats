import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './LandingModal.css';

const LandingModal = ({ isOpen, setNotFirstTimeVisit }) => (
  <Modal show={isOpen} onHide={setNotFirstTimeVisit} className="LandingModal">
    <Modal.Header closeButton>
      <Modal.Title>Welcome to NUS Eats!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Sick of having lunch alone?</h4>
      <h4>Ever wish you could easily schedule meal appointments?</h4>
      <h4>Wait no more!</h4>
      <p>NUS Eats is a mobile friendly app that allows you to create meal meetings and broadcast them to your Facebook friends!</p>
      <p>Real-time information on canteens around NUS are also provided, including reviews, photos, distance and even crowdedness!</p>
    </Modal.Body>
    <Modal.Footer>
      <div className="footer">
        <div className="credits">
          Brought to you by {' '}
          {Object.entries({
            Riwu: 'https://github.com/riwu',
            Charlton: 'https://github.com/cadmusthefounder',
            Yihang: 'https://github.com/yihangho',
            Jovin: 'https://github.com/liewyyjovin',
          }).map(([name, url], index) => (
            <span key={name}>
              <a target="_blank" rel="noreferrer noopener" href={url}>{name}</a>
              {index === 3 ? '' : ', '}
            </span>
          ))}
        </div>
        <Button className="button" bsStyle="primary" onClick={setNotFirstTimeVisit}>Let's begin!</Button>
      </div>
    </Modal.Footer>
  </Modal>
);

export default LandingModal;
