import React from 'react';
import * as Modal from './index';

const Story = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};
export default Story;

const Template = (args) => <Modal.Primary {...args}><div>asdf</div></Modal.Primary>;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  fullscreen: true,
  withActionbar: false,
  title: "Modal Title",
  onClose: () => console.log('close action'),
  withoutHeader: false,
  transparent: false
}
