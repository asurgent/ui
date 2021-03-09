import React, { useEffect } from 'react';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import * as Modal from './index';
import { Block, Button } from '../index';
import * as Form from '../Form';
import * as Table from '../Table';

export default { title: 'UI Components|Modal', decorators: [withKnobs] };

export const primaryModal = () => {
  const formData = Form.useFormBuilder({
    label: {
      type: 'filterselect',
      props: { multiSelect: true },
      label: 'Test',
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' }],
    },
  });
  const tableHook = Table.useTableHook();

  useEffect(() => {
    tableHook.registerRowFetchCallback((payload, onSuccess) => {
      action('fetch')(payload);
      onSuccess({ });
    });
    tableHook.registerFilterFetchCallback((payload, onSuccess) => {
      onSuccess({
        guys: [
          { value: 'Mike(1133)', count: 32 },
          { value: 'Keen(123)', count: 4 },
          { value: 'Ellinor(4465)', count: 26 },
          { value: 'Anton(984)', count: 14 },
        ],
      });
    });
    tableHook.parentReady();
    // eslint-disable-next-line
  }, []);
  return (
    <Modal.Primary
      isOpen={boolean('is open', true)}
      fullscreen={boolean('fullscreen', true)}
      withActionbar={boolean('withActionbar', false)}
      title="Modal Title"
      onClose={action('Close action')}
      withoutHeader={boolean('withoutHeader', false)}
      transparent={boolean('Transparent', false)}
    >
      <p>Hello</p>
      <Form.Primary form={formData} />
      <Table.Filter
        tableHook={tableHook}
        filterKeys={[
          {
            label: 'guys',
            facetKey: 'guys',
            multiSelect: false,
            defaultSelect: { value: 'Mike(1133)', count: 32 },
            onChange: (a) => {
              action('OnChange')(a);
            },
          },
        ]}
        parseFilterLabelOutput={(filters) => filters}
        parseFilterItemRequestOutput={(filters) => filters}
        parseFilterKeyRequestOutput={(filters) => filters}
      />
      <Block.Right>
        <Button.Primary>
          Next
        </Button.Primary>
      </Block.Right>

    </Modal.Primary>
  );
};
