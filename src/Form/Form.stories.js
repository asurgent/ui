import React, { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import moment from 'moment';
import * as Form from './index';
import * as Button from '../Button';
import * as Block from '../Block';

export default { title: 'UI Components|Form' };

const formObj = {
  search: {
    type: 'text', label: 'Test', placeholder: 'Hello',
  },
  datepicker: {
    type: 'datepicker', label: 'datdeLabel', name: 'datepicker', maxDate: moment().add(2, 'days'), minDate: moment().subtract(2, 'days').format(),
  },
  sortDirection: {
    type: 'select', label: 'sort', options: [{ value: 1, label: 'one' }, { value: 2, label: 'two' }],
  },
};

const specs = [{
  name: 'ticketStatus',
  description: 'The status to update the ticket to',
  type: 'text',
  name_translation_key: 'property-validation-auto-action-976c9ae5-0575-4e72-8471-498df585f7b9-ticketStatus',
  description_translation_key: 'property-validation-auto-action-976c9ae5-0575-4e72-8471-498df585f7b9-ticketStatus-description',
}, {
  name: 'ticketNote',
  description: 'Note to add to the ticket',
  type: 'textarea',
  name_translation_key: 'property-validation-auto-action-976c9ae5-0575-4e72-8471-498df585f7b9-ticketNote',
  description_translation_key: 'property-validation-auto-action-976c9ae5-0575-4e72-8471-498df585f7b9-ticketNote-description',
}];

const ticketValues = {
  ticketNote: 'Hedllo there',
  ticketStatus: 'Pending',
};

export const simpleForm = () => {
  const formData = Form.useFormBuilder(formObj);

  return (
    <Form.Primary
      form={formData}
      onChangeTimer={(values) => action()('Changed', values)}
    />
  );
};

export const defaultForm = () => {
  const formData = Form.useFormBuilder({
    someText: {
      type: 'text',
      label: 'Some Text',
      value: 'Hi',
    },
    someSelect: {
      type: 'select',
      label: 'Some Select',
      options: [{ value: '1', label: 'First option', default: true }, { value: '2', label: 'Second option' }, { value: '3', label: 'Third option' }],
    },
    someDate: {
      type: 'datepicker',
      options: [],
    },
  });

  useEffect(() => {
    formData.updateFields([
      { name: 'someText', value: 'Good bye' },
      { name: 'someSelect', value: '3' },
      { name: 'someDate', value: moment().format('YYYY-MM-DD') },
    ]);
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  return (
    <Form.Primary
      form={formData}
      onSubmit={(values, isDirty) => {
        action()('isDirty', isDirty);
        action()('Submitted', values);
      }}
    >
      {(inputList, renderFields, onSubmitAction) => (
        <>
          {renderFields}
          <Block.SpaceBetween>
            <Button.Hollow>Cancel</Button.Hollow>
            <Button.Primary onClick={onSubmitAction}>a</Button.Primary>
          </Block.SpaceBetween>
        </>
      )}
    </Form.Primary>
  );
};

export const secondaryThemeForm = () => {
  const formData = Form.useFormBuilder(formObj);

  return (
    <Block.Info hideLeftBorder withPadding>
      <Form.Primary
        form={formData}
        onSubmit={(values) => action()('Submitted', values)}
      >
        {(inputList, renderFields, onSubmitAction) => (
          <>
            {renderFields}
            <Block.SpaceBetween renderTransparent>
              <Button.Hollow>Cancel</Button.Hollow>
              <Button.Primary onClick={onSubmitAction}>a</Button.Primary>
            </Block.SpaceBetween>
          </>
        )}
      </Form.Primary>
    </Block.Info>
  );
};

export const advancedRender = () => {
  const formData = Form.useFormBuilder(formObj);

  return (
    <Form.Primary
      form={formData}
      onSubmit={(values) => action()('Submitted', values)}
    >
      {(inputList, renderFields, onSubmitAction) => (
        <>
          {
              Object
                .keys(inputList)
                .map((key) => (
                  <div key={key}>
                    <p>
                      {`Im a paragagrah for: ${key}`}
                    </p>
                    {inputList[key]}
                  </div>
                ))
            }
          <Block.SpaceBetween>
            <Button.Hollow>Cancel</Button.Hollow>
            <Button.Primary onClick={onSubmitAction}>a</Button.Primary>
          </Block.SpaceBetween>
        </>
      )}
    </Form.Primary>
  );
};

export const apiForm = () => {
  const formData = Form.useFormBuilder(specs, ticketValues);

  return (
    <Form.Primary
      form={formData}
      onSubmit={(values) => action()('Submitted', values)}
    >
      {(inputList, renderFields, onSubmitAction) => (
        <>
          {renderFields}
          <Block.SpaceBetween>
            <Button.Hollow>Cancel</Button.Hollow>
            <Button.Primary onClick={onSubmitAction}>Save</Button.Primary>
          </Block.SpaceBetween>
        </>
      )}
    </Form.Primary>
  );
};

export const updateForm = () => {
  const formData = Form.useFormBuilder(formObj);

  useEffect(() => {
    formData.updateField('sortDirection', {
      noLabel: true,
      value: 2,
    });
  }, [formData]);

  return (
    <Form.Primary
      form={formData}
      onChangeTimer={(values) => action()('Updated', values)}
    />
  );
};
