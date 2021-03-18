import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { mdiImageBrokenVariant } from '@mdi/js';
import MdiIcon from '@mdi/react';
import * as C from './ImagePreview.styled';
import * as Modal from '../Modal';

const ImagePreview = ({ imgLink, smallIconSize }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [imgValid, setImgValid] = useState(true);

  const handleError = () => setImgValid(false);
  const handleClick = () => setIsEnlarged(!isEnlarged);

  return (
    <>
      <C.SmallImage
        smallIconSize={smallIconSize}
        onClick={handleClick}
      >
        {imgValid
          ? (<img onError={handleError} src={imgLink} alt="small_img" />)
          : (<MdiIcon path={mdiImageBrokenVariant} />)}
      </C.SmallImage>

      {imgValid && (
        <Modal.Primary
          isOpen={isEnlarged}
          transparent
          withActionbar={false}
          onClose={handleClick}
          withoutHeader
          style={{ width: 'auto', margin: '0', padding: '0' }}
        >
          <C.LargeImage onClick={() => setIsEnlarged(!isEnlarged)}>
            <img onError={handleError} src={imgLink} alt="enlarged_img" />
          </C.LargeImage>
        </Modal.Primary>
      )}
    </>
  );
};

ImagePreview.propTypes = {
  imgLink: PropTypes.string,
  smallIconSize: PropTypes.string,
};
ImagePreview.defaultProps = {
  imgLink: null,
  smallIconSize: '7rem',
};

export default ImagePreview;
