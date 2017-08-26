import React from 'react';
import { Image, Tooltip, OverlayTrigger } from 'react-bootstrap';

const ProfilePicture = ({user}) => {
  if (user.id) {
    const tooltip = <Tooltip id="tooltip">{user.name}</Tooltip>;
    return (
      <OverlayTrigger placement="top" overlay={tooltip}>
        <Image circle src={`https://graph.facebook.com/${user.id}/picture`} alt={user.name} />
      </OverlayTrigger>
    );
  } else {
    return null;
  }
};

export default ProfilePicture;
