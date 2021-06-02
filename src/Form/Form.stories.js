/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
import React, { useEffect } from 'react';
import moment from 'moment';
import * as Form from './index';
import * as Button from '../Button';
import * as Block from '../Block';
import translation from './Formstories.translation';

const formObj = {
  label: {
    type: 'label', label: 'Test', value: 'Im just a label',
  },
  search: {
    type: 'text', label: 'Test', placeholder: 'Hello',
  },
  switch: {
    type: 'switch',
    label: 'Test',
    placeholder: 'Hello',
    wrapperStyle: { border: 'none' },
    style: { background: '' },
    description: 'If you select this option this process will be the general chain of actions taken when there is an alert on this Entity.',
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

const Story = {
  title: 'Data/Form',
  component: Form,
  argTypes: {},
};
export default Story;

const SimpleTemplate = (args) => {
  const formData = Form.useFormBuilder(formObj);
  return (
    <Form.Primary
      form={formData}
      onChangeTimer={(values) => console.log('Changed', values)}
      {...args}
    />
  );
};
export const Simple = SimpleTemplate.bind({});
Simple.args = {};

const DefaultTemplate = (args) => {
  const formData = Form.useFormBuilder({
    someText: {
      type: 'text',
      label: 'Some Text',
      tooltip: 'hejhej',
      value: 'text text',
      validator: {
        condition: (v) => v === 'asdf',
        errorMessage: 'I did not validate',
      },
    },
    someTextArea: {
      type: 'textarea',
      label: 'Some Text',
      tooltip: 'hejhej',
      value: 'text area text',
      validator: {
        condition: (v) => v === 'asdf',
        errorMessage: 'I did not validate',
      },
    },
    someTextMultiple: {
      type: 'textmultiple',
      label: 'Some Multiple Text',
      tooltip: 'hejhej',
      parseOutput: (r) => r.filter((entry) => entry !== ''),
      placeholder: 'Add something cool',
      value: ['first', 'second'],
    },
    someObjectMultiple: {
      type: 'objectmultiple',
      label: null,
      tooltip: 'hejhej',
      showContainerError: false,
      validator: {
        conditions: () => {
          const validation = {
            someName: { valid: (val) => val === 'hello', errorMessage: 'not "hello"' },
            someNumber: { valid: (val) => typeof val === 'number', errorMessage: 'not a number' },
          };
          return validation;
        },
      },
      options: {
        someName: { label: 'must be "hello" to add', type: 'string' },
        someOtherName: { label: 'translatedMultiLabel2', type: 'string', render: () => true },
        someNumber: { label: 'translatedMultiLabel3', type: 'number' },
        someSelect: {
          label: 'translatedMultiLabel3',
          type: 'select',
          placeholder: 'select',
          options: [
            { label: 'someLabel3', value: 'someValue3' },
            { label: 'someLabel4', value: 'someValue4' },
          ],
        },
      },
      value: [{
        someName: 'someName',
        someNumber: 23,
        someOtherName: 'someOtherName',
        someSelect: 'someValue3',
      }],
    },
    email: {
      type: 'email',
      label: 'Email',
      tooltip: 'Select me',
      validator: {
        condition: (v) => v === 'asdf',
        errorMessage: 'I did not validate',
      },
      value: 'my@email.com',
    },
    imABoolean: {
      type: 'bool',
      label: 'Im true or false',
      tooltipPosition: 'left',
      tooltip: 'Select me',
      value: false,
      disabled: () => false,
    },
    someNumber: {
      type: 'number',
      label: 'Some Number (max 100)',
      tooltip: 'hejhej',
      maxValue: 100,
      value: 50,
    },
    someRadioGroup: {
      type: 'radiogroup',
      label: 'Some Radio Group',
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' },
        { label: 'label4', value: 'value4' },
      ],
      value: 'value2',
      props: { vertical: true },
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
      value: 'value3',
    },
    someSelect: {
      type: 'select',
      label: 'Select with empty option',
      placeholder: 'select me',
      options: [
        { value: '1', label: 'First option' },
        { value: '2', label: 'Second option' },
        { value: '3', label: 'Third option' },
      ],
      props: {},
      tooltip: 'tooltip',
      value: '2', // no value -> shows placeholder
    },
    someSelect2: {
      type: 'select',
      label: 'Select with default value',
      options: [
        { value: '1', label: 'First option', disabled: true },
        { value: '2', label: 'Second option' },
        { value: '3', label: 'Third option' },
      ],
      tooltip: 'tooltip',
      // value: '3', // no value -> sets first option
    },
    someFilterSelectSingle: {
      type: 'filterselect',
      label: 'Some Filterselect (single)',
      tooltip: 'tooltip',
      props: {
        searchPlaceholder: 'Search in me plz',
      },
      placeholder: 'Select me',
      options: [
        { value: '1', label: 'one' },
        { value: '2', label: 'two' },
        '3',
        '4',
      ],
      value: '3',
    },
    someFilterSelectMulti: {
      type: 'filterselect',
      label: 'Some Filterselect (multi)',
      tooltip: 'tooltip',
      parseOutput: (r) => r.join(','),
      props: {
        multiSelect: true,
        searchPlaceholder: 'Search in me plz',
      },
      options: [
        { value: '1', label: 'one', disabled: true },
        { value: '2', label: 'two' },
        '3',
        '4',
      ],
      value: ['3', '4'],
    },
    someDate: {
      type: 'datepicker',
      options: [],
      render: (spec) => spec.someText && spec.someText.length < 10,
      tooltip: 'tooltip',
      label: 'Some date',
      value: '2020-12-24',
    },
  });

  useEffect(() => {
    if (args.renderErrors) {
      formData.errors([
        { property: 'someText', message: 'You need some text', message_translation_key: 'error1' },
        { property: 'someNumber', message: 'You need a number', message_translation_key: 'error2' },
        { property: 'someTextArea', message: 'You need a textarea', message_translation_key: 'error2' },
        { property: 'someRadioGroup', message: 'Select something', message_translation_key: 'error3' },
        { property: 'someRadioGroup2', message: 'Select something', message_translation_key: 'error4' },
        { property: 'someDate', message: 'Pick a date', message_translation_key: 'key_doesnt_exist_will_fallback_on_message' },
        { property: 'someSelect', message: 'Select more things' },
      ], translation);
    } else {
      formData.errors([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [args.renderErrors]);

  return (
    <div style={{ padding: '3rem' }}>
      <Form.Primary
        form={formData}
        msTimer={15}
        onSubmit={({ values, isDirty }) => {
          console.log('isDirty', isDirty);
          console.log('Submitted', values);
        }}
        onChange={({
          values, isDirty, dirtyItems, name, validates,
        }) => {
          console.log('Changed', name || 'form');
          console.log('Form values', values);
          console.log('Form dirty', isDirty);
          console.log('Dirty items', dirtyItems);
          console.log('Validating fields', validates);
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
              <Button.Primary disabled={!isDirty} onClick={onSubmitAction}>Submit</Button.Primary>
            </Block.SpaceBetween>
          </>
        )}
      </Form.Primary>
    </div>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  renderErrors: false,
};

const AdvancedTemplate = () => {
  const formData = Form.useFormBuilder(formObj);

  return (
    <Form.Primary
      form={formData}
      onSubmit={({ values }) => console.log('Submitted', values)}
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

export const Advanced = AdvancedTemplate.bind({});
Advanced.args = {};

const APITemplate = () => {
  const formData = Form.useFormBuilder(specs, ticketValues);

  return (
    <Form.Primary
      form={formData}
      onSubmit={({ values }) => console.log('Submitted', values)}
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

export const API = APITemplate.bind({});
API.args = {};

const UpdateTemplate = () => {
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
      onChangeTimer={({ values }) => console.log('Updated', values)}
    />
  );
};

export const Update = UpdateTemplate.bind({});
Update.args = {};

const DynamicMinMaxTemplate = () => {
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
          console.log('isDirty', isDirty);
          console.log('Submitted', values);
        }}
        onChange={({
          values, isDirty, dirtyItems, name,
        }) => {
          console.log('Changed', name || 'form');
          console.log('Form values', values);
          console.log('Form dirty', isDirty);
          console.log('Dirty items', dirtyItems);
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

export const DynamicMinMax = DynamicMinMaxTemplate.bind({});
DynamicMinMax.args = {};
