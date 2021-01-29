export const defaultFormObject = {
  data: {
    someText: {
      type: 'text',
      label: 'Some Text',
      tooltip: 'hejhej',
      value: 'text text',
    },
    someObjectSingle: {
      type: 'objectsingle',
      label: 'some object single',
      tooltip: 'hej',
      options: {
        objectTextMultiple: {
          type: 'textmultiple',
          label: 'Some Multiple Text',
          tooltip: 'hejhej',
          parseOutput: (r) => r.filter((entry) => entry !== ''),
          placeholder: 'Add something cool',
          value: ['first', 'second'],
        },
        objectEmail: {
          type: 'email',
          label: 'Email',
          value: 'my@email.com',
        },
        objectBoolean: {
          type: 'bool',
          label: 'Im true or false',
          tooltipPosition: 'left',
          tooltip: 'Select me',
          value: false,
          disabled: () => false,
        },
        /*  objectRadioGroup: {
          type: 'radiogroup',
          label: 'Some Radio Group',
          options: [
            { label: 'label1', value: 'value1' },
            { label: 'label2', value: 'value2' },
          ],
          value: 'value2',
        }, */
        /* objectTextArea: {
          type: 'textarea',
          label: 'Some Textarea',
          tooltip: 'hejhej',
          value: 'text area text',
        }, */
        /* objectDate: {
          type: 'datepicker',
          options: [],
          label: 'Some date',
          value: new Date(),
        }, */
        /*      objectString: { label: 'My string', type: 'string' }, */
        /*   objectNumber: { label: 'My number', type: 'number' }, */
        /*  objectFilterSelect: {
          label: 'My filter select',
          type: 'filterselect',
          placeholder: 'select',
          options: [
            { label: 'someLabel3', value: 'someValue3' },
            { label: 'someLabel4', value: 'someValue4' },
          ],
          props: {
            multiSelect: true,
            searchPlaceholder: 'Search in me plz',
          },
        }, */
      },

    },

  /*   someObjectMultiple: {
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
    }, email: {
      type: 'email',
      label: 'Email',
      tooltip: 'Select me',
      validator: {
        condition: (v) => v === 'asdf',
        errorMessage: 'I did not validate',
      },
      value: 'my@email.com',
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
      ],
      value: 'value2',
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
        { value: '1', label: 'one' },
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
    }, */
  },
  errors: [
    { property: 'someText', message: 'You need some text', message_translation_key: 'error1' },
    { property: 'someNumber', message: 'You need a number', message_translation_key: 'error2' },
    { property: 'someRadioGroup', message: 'Select something', message_translation_key: 'error3' },
    { property: 'someRadioGroup2', message: 'Select something', message_translation_key: 'error4' },
    { property: 'someDate', message: 'Pick a date', message_translation_key: 'key_doesnt_exist_will_fallback_on_message' },
    { property: 'someSelect', message: 'Select more things' },
  ],
};
