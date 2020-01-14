import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Picture } from './UserPhoto.styled';

const GetUserInitials = (fullName) => {
  const match = (/^(\w).*\b(\w).*?|^(\w{2}).*?$/g).exec(`${fullName}`);
  if (match) {
    const [_, fist, second, single] = match;

    if (single) {
      return single;
    }
    return `${fist}${second}`;
  }

  return '';
};

const UserPhoto = (props) => {
  const {
    size,
    name,
    email,
    square,
    href,
  } = props;
  const [url, setUrl] = useState('');
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    setUrl(href);
  }, []);

  const onLoad = () => {
    setImageExists(true);
  };

  const onError = () => {
    setImageExists(false);
  };

  return (
    <Wrapper size={size} square={square} email={email}>
      <Picture
        alt="user-photo"
        imageExists={imageExists}
        onError={onError}
        onLoad={onLoad}
        src={url}
      />
      {imageExists === false && (
        <small>{GetUserInitials(name)}</small>
      )}
    </Wrapper>
  );
};

UserPhoto.propTypes = {
  size: PropTypes.string,
};
UserPhoto.defaultProps = {
  size: '2.4rem',
};

export default UserPhoto;