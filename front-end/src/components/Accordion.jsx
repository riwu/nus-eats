import React from 'react';
import { Accordion } from 'react-bootstrap';

const accordion = ({ children }) => (
  <Accordion>
    {children}
  </Accordion>
);

export default accordion;
