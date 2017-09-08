import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <div className="Footer">
    <Link to="/privacy_policy">Privacy Policy</Link>
    { ' ' }
    &middot;
    { ' ' }
    <Link to="/terms_of_service">Terms of Service</Link>
  </div>
);

export default Footer;
