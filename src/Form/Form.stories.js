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
  label: {
    type: 'label', label: 'Test', value: 'Im just a label',
  },
  search: {
    type: 'text', label: 'Test', placeholder: 'Hello',
  },
  datepicker: {
    type: 'datepicker',
    label: 'im a label',
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
    someTextMultiple: {
      type: 'textmultiple',
      label: 'Some Multiple Text',
      tooltip: 'hejhej',
      parseOutput: (r) => r.filter((entry) => entry !== ''),
    },
    imABoolean: {
      type: 'bool',
      label: 'Im true or false',
      tooltipPosition: 'left',
      tooltip: 'Select me',
      value: false,
    },
    email: {
      type: 'email',
      label: 'Email',
      tooltip: 'Select me',
      validator: {
        condition: () => false,
        errorMessage: 'I did not validate',
      },
      value: '',
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
      render: (s) => s.someRadioGroup && s.someRadioGroup === 'value2',
      tooltip: 'tooltip',
    },
    someSelect: {
      type: 'select',
      label: 'Select with empty option',
      options: [
        { value: '1', label: 'First option' },
        { value: '2', label: 'Second option' },
        { value: '3', label: 'Third option' },
      ],
      tooltip: 'tooltip',
      placeholder: 'select',
    },
    someSelect2: {
      type: 'select',
      label: 'Select with default value',
      options: [
        { value: '1', label: 'First option' },
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
      placeholder: 'Select me',
    },
    someFilterSelectMulti: {
      type: 'filterselect',
      label: 'Some Filterselect (multi)',
      options: [],
      tooltip: 'tooltip',
      parseOutput: (r) => r.join(','),
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
      { name: 'someTextMultiple', value: ['Good', 'bye'] },
      { name: 'someNumber', value: 10 },
      { name: 'someRadioGroup', value: 'value1' },
      { name: 'someRadioGroup2', value: 'value4' },
      { name: 'someSelect', options: [{ value: '4', label: 'four' }, { value: '5', label: 'five' }], value: '' },
      { name: 'someSelect2', options: [{ value: '6', label: 'six' }, { value: '7', label: 'seven' }] },
      {
        name: 'someFilterSelectSingle',
        options: [
          { value: '1', label: 'one' },
          { value: '2', label: 'two' },
          '3',
          '4',
        ],
      },
      {
        name: 'someFilterSelectMulti',
        value: ['1 First option First option First option First option', '0 Zero option', '2 Second option'],
        options: [
          '2 Second option',
          '3 Third option',
          '4 Fourth option',
          '5 Fifth option',
          '6 Sixth option',
          '7 Seventh option',
          '8 Eigth option',
          '9 Ninth option',
          '10 Tenth option',
        ],
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
    <div style={{ padding: '3rem' }}>
      <Form.Primary
        form={formData}
        msTimer={15}
        onSubmit={({ values, isDirty }) => {
          action()('isDirty', isDirty);
          action()('Submitted', values);
        }}
        onChange={({
          values, isDirty, dirtyItems, name, validates,
        }) => {
          action()('Changed', name || 'form');
          action()('Form values', values);
          action()('Form dirty', isDirty);
          action()('Dirty items', dirtyItems);
          action()('Validating fields', validates);
        }}
      >
        {({
          render,
          onSubmitAction,
          onResetAction,
          isDirty,
        }) => (
          <>
            {render}
            <Block.SpaceBetween>
              <Button.Hollow onClick={() => {
                formData.updateField('someSelect', {
                  options: [{ value: '8', label: '8' }, { value: '9', label: '9' }],
                });
              }}
              >
                Update someSelect-options
              </Button.Hollow>
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
        onSubmit={({ values }) => action()('Submitted', values)}
      >
        {({ render, onSubmitAction }) => (
          <>
            {render}
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
      onSubmit={({ values }) => action()('Submitted', values)}
    >
      {({ fields, onSubmitAction }) => (
        <>
          {
              Object
                .keys(fields)
                .map((key) => (
                  <div key={key}>
                    <p>
                      {`Im a paragagrah for: ${key}`}
                    </p>
                    {fields[key]}
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
      onSubmit={({ values }) => action()('Submitted', values)}
    >
      {({ render, onSubmitAction }) => (
        <>
          {render}
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
      onChangeTimer={({ values }) => action()('Updated', values)}
    />
  );
};

export const dynamicMinMaxAttributes = () => {
  const formData = Form.useFormBuilder({
    threshold_comparison: {
      type: 'select',
      label: 'threshold comparison',
      options: [
        { value: '<', label: '<' },
        { value: '>', label: '>' },
        { value: '>=', label: '>=' },
        { value: '<=', label: '<=' },
        { value: '=', label: '=' },
      ],
    },
    threshold: {
      type: 'number',
      label: 'threshold',
      maxValue: 100,
    },
    critical_threshold: {
      type: 'number',
      label: 'critical',
      maxValue: (values) => {
        const { threshold, threshold_comparison: comp } = values;
        switch (comp) {
          case '<':
            return threshold - 1;
          case '<=':
            return threshold;
          case '=':
            return threshold;
          default:
            return null;
        }
      },
      minValue: (values) => {
        const { threshold, threshold_comparison: comp } = values;
        switch (comp) {
          case '>':
            return threshold + 1;
          case '>=':
            return threshold;
          case '=':
            return threshold;
          default:
            return 0;
        }
      },
    },

  });

  useEffect(() => {
    formData.updateFields([
      { name: 'threshold_comparison', value: '<' },
      { name: 'critical_threshold', value: 100 }, // Will be overridden to 10 on render
      { name: 'threshold', value: 10 },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ minHeight: '120vh' }}>
      <Form.Primary
        form={formData}
        msTimer={15}
        onSubmit={({ values, isDirty }) => {
          action()('isDirty', isDirty);
          action()('Submitted', values);
        }}
        onChange={({
          values, isDirty, dirtyItems, name,
        }) => {
          action()('Changed', name || 'form');
          action()('Form values', values);
          action()('Form dirty', isDirty);
          action()('Dirty items', dirtyItems);
        }}
      >
        {({
          render, onSubmitAction, onResetAction, isDirty,
        }) => (
          <>
            {render}
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
