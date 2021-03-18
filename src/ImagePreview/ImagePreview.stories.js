import React from 'react';
import { ImagePreview } from './index';

const Story = {
  title: 'Graphics/Image Preview',
  component: ImagePreview,
  argTypes: {
    imgLink: {
      control: {
        type: 'radio',
        options: [
          // wide
          'http://images6.fanpop.com/image/photos/36000000/Frodo-Sam-image-frodo-and-sam-36091190-1920-796.jpg',
          // tall
          'https://www.funkopopmania.it/wp-content/uploads/2019/04/film-gandalf-il-signore-degli-anelli.jpg',
          // square
          'https://1.bp.blogspot.com/-p-NCtut9uAE/UX1tk4qtfAI/AAAAAAAAA5U/jbG41mAFxPE/s1600/Sam_and_Rosie_at_their_wedding+(1249x532).jpg',
          // invalid link
          'broken',
        ],
      },
    },
  },
};
export default Story;

const ImagePreviewTemplate = (args) => (<ImagePreview {...args} />);

export const Main = ImagePreviewTemplate.bind({});
Main.args = {
  imgLink: 'http://images6.fanpop.com/image/photos/36000000/Frodo-Sam-image-frodo-and-sam-36091190-1920-796.jpg',
  smallIconSize: '7rem',
};
