import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { mdiImageBrokenVariant } from '@mdi/js';
import MdiIcon from '@mdi/react';
import * as C from './ImagePreview.styled';
import * as Modal from '../Modal';

const ImagePreview = ({ imgLink, smallIconSize }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [imgValid, setImgValid] = useState(true);

  const handleError = () => {
    setImgValid(false);
  };

  return (
    <>
      <C.ScreenshotSmall
        smallIconSize={smallIconSize}
        onClick={() => setIsEnlarged(!isEnlarged)}
      >
        {imgValid
          ? (<img onError={handleError} src={imgLink} alt="small_img" />)
          : (<MdiIcon path={mdiImageBrokenVariant} />)}
      </C.ScreenshotSmall>

      {imgValid && (
        <Modal.Primary
          isOpen={isEnlarged}
          transparent
          withActionbar={false}
          onClose={() => setIsEnlarged(!isEnlarged)}
          withoutHeader
          style={{ width: 'auto', margin: '0', padding: '0' }}
        >
          <C.ScreenshotLarge onClick={() => setIsEnlarged(!isEnlarged)}>
            <img onError={handleError} src={imgLink} alt="enlarged_img" />
          </C.ScreenshotLarge>
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
