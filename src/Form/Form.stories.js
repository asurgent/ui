import React, { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs, boolean,
} from '@storybook/addon-knobs';
import moment from 'moment';
import * as Form from './index';
import * as Button from '../Button';
import * as Block from '../Block';
import translation from './Formstories.translation';

export default {
  title: 'UI Components|Form',
  decorators: [withKnobs],
};

const formObj = {
  search: {
    type: 'text', label: 'Test', placeholder: 'Hello',
  },
  datepicker: {
    type: 'datepicker',
    label: 'datdeLabel',
    name: 'datepicker',
    maxDate: moment().add(2, 'days').startOf('day').toISOString(),
    minDate: moment().subtract(2, 'days').startOf('day').toISOString(),
  },
  sortDirection: {
    type: 'select', label: 'sort', options: [{ value: '1', label: 'one' }, { value: '2', label: 'two' }],
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
  ticketNote: 'Hello there',
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
      tooltip: 'hejhej',
    },
    someNumber: {
      type: 'number',
      label: 'Some Number (max 100)',
      tooltip: 'hejhej',
      maxValue: 100,
    },
    someRadioGroup: {
      type: 'radiogroup',
      label: 'Some Radio Group',
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
      ],
    },
    someRadioGroup2: {
      type: 'radiogroup',
      label: 'Some Radio Group',
      options: [
        { label: 'label3', value: 'value3' },
        { label: 'label4', value: 'value4' },
      ],
      tooltip: 'tooltip',
    },
    someSelect: {
      type: 'select',
      label: 'Some Select',
      options: [
        { value: '1', label: 'First option', default: true },
        { value: '2', label: 'Second option' },
        { value: '3', label: 'Third option' },
      ],
      tooltip: 'tooltip',
    },
    someFilterSelectSingle: {
      type: 'filterselect',
      label: 'Some Filterselect (single)',
      options: [],
      tooltip: 'tooltip',
      props: {
        searchPlaceholder: 'Search in me plz',
      },
    },
    someFilterSelectMulti: {
      type: 'filterselect',
      label: 'Some Filterselect (multi)',
      options: [],
      tooltip: 'tooltip',
      props: {
        multiSelect: true,
        searchPlaceholder: 'Search in me plz',
      },
    },
    someDate: {
      type: 'datepicker',
      options: [],
      render: (spec) => spec.someText && spec.someText.length < 10,
      tooltip: 'tooltip',
      label: 'Some date',
    },
  });
  const renderErrors = boolean('render errors', false);

  useEffect(() => {
    formData.updateFields([
      { name: 'someText', value: 'Good bye' },
      { name: 'someNumber', value: 10 },
      { name: 'someRadioGroup', value: 'value1' },
      { name: 'someRadioGroup2', value: 'value4' },
      { name: 'someSelect', value: '3' },
      {
        name: 'someFilterSelectSingle',
        options: [
          { value: '1', label: 'First option', selected: true },
          { value: '2', label: 'Second option' },
          { value: '3', label: 'Third option' },
        ],
        value: '1',
      },
      {
        name: 'someFilterSelectMulti',
        options: [
          // selected -> for the filter dropdown
          { value: 'First option', label: 'First option', selected: true },
          { value: 'Second option', label: 'Second option' },
          { value: 'Third option', label: 'Third option' },
          { value: 'Fourth option', label: 'Fourth option' },
          { value: 'Fifth option', label: 'Fifth option' },
          { value: 'Sixth option', label: 'Sixth option' },
          { value: 'Seventh option', label: 'Seventh option', selected: true },
          { value: 'Eigth option', label: 'Eigth option' },
          { value: 'Ninth option', label: 'Ninth option' },
          { value: 'Tenth option', label: 'Tenth option' },
        ],
        // actual value (shows on tags for example)
        value: ['First option', 'Seventh option'],
      },
      { name: 'someDate', value: moment().startOf('day').toISOString() },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (renderErrors) {
      formData.errors([
        { property: 'someText', message: 'You need some text', message_translation_key: 'error1' },
        { property: 'someNumber', message: 'You need a number', message_translation_key: 'error2' },
        { property: 'someRadioGroup', message: 'Select something', message_translation_key: 'error3' },
        { property: 'someRadioGroup2', message: 'Select something', message_translation_key: 'error4' },
        { property: 'someDate', message: 'Pick a date', message_translation_key: 'key_doesnt_exist_will_fallback_on_message' },
        { property: 'someSelect', message: 'Select more things' },
      ], translation);
    } else {
      formData.errors([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [renderErrors]);

  return (
    <div style={{ minHeight: '120vh' }}>
      <Form.Primary
        form={formData}
        msTimer={15}
        onSubmit={(values, isDirty) => {
          const multiChoiceSplit = values.someFilterSelectMulti.split(',');
          const multiValue = multiChoiceSplit.length === 1 && multiChoiceSplit[0] === '' ? [] : multiChoiceSplit;

          Object.assign(values, { someFilterSelectMulti: multiValue });
          action()('isDirty', isDirty);
          action()('Submitted', values);
        }}
        onChange={(values, isDirty, dirtyItems, name) => {
          action()('Changed', name || 'form');
          action()('Form values', values);
          action()('Form dirty', isDirty);
          action()('Dirty items', dirtyItems);
        }}
      >
        {(inputList, renderFields, onSubmitAction, onResetAction, isDirty) => (
          <>
            {renderFields}
            <Block.SpaceBetween>
              <Button.Hollow>Cancel</Button.Hollow>
              <Button.Secondary disabled={!isDirty} onClick={onResetAction}>
                Reset
              </Button.Secondary>
              <Button.Primary onClick={onSubmitAction}>Submit</Button.Primary>
            </Block.SpaceBetween>
          </>
        )}
      </Form.Primary>
    </div>
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
              <Button.Primary onClick={onSubmitAction}>Submit</Button.Primary>
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
            <Button.Primary onClick={onSubmitAction}>Submit</Button.Primary>
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
      value: '2',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Primary
      form={formData}
      onChangeTimer={(values) => action()('Updated', values)}
    />
  );
};
