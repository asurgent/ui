export const defaultFormObject = {
  data: {
    /*  someText: {
      type: 'text',
      label: 'Some Text',
      tooltip: 'hejhej',
      value: 'text text',
    },
    imABoolean: {
      type: 'bool',
      label: 'Im true or false',
      tooltipPosition: 'left',
      tooltip: 'Select me',
      value: false,
      disabled: () => false,
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
        },
        objectBoolean: {
          type: 'bool',
          label: 'Im true or false',
          tooltipPosition: 'left',
          tooltip: 'Select me',
          // value: false,
          disabled: () => false,
        },
        objectDate: {
          type: 'datepicker',
          options: [],
          label: 'Some date',
        },
        objectFilterSelect: {
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
        },
      },
      value: {
        objectTextMultiple: ['first', 'second'],
        objectBoolean: false,
        objectDate: new Date(),
        objectFilterSelect: 'someValue3',
      },
    }, */
    someObjectMultiple: {
      type: 'objectmultiple',
      label: 'some object single',
      tooltip: 'hej',
      options: {
        objectText: {
          type: 'textmultiple',
          label: 'Text me',
          tooltipPosition: 'left',
          tooltip: 'Text me',
        },
      },
      value: [
        { objectText: ['first', 'second'] },
        { objectText: ['third'] },

      ],
    },
  },
  errors: [],
};

/*
  someObjectMultiple: {
      type: 'objectmultiple',
      label: 'some object single',
      tooltip: 'hej',
      options: {
        objectRadioGroup: {
          type: 'radiogroup',
          label: 'Radiogroup',
          tooltipPosition: 'left',
          tooltip: 'Klick me',
          options: [{ label: '1', value: '1' }, { label: '2', value: '2' }],
        },
        objectBool: {
          type: 'bool',
          label: 'Im true or false',
          tooltipPosition: 'left',
          tooltip: 'Klick me',
        },
        objectText: {
          type: 'text',
          label: 'Text me',
          tooltipPosition: 'left',
          tooltip: 'Text me',
        },
      },
      value: [
        { objectRadioGroup: '1', objectBool: true, objectText: 'ay' },
        { objectRadioGroup: '2', objectBool: true, objectText: 'bee' },
        { objectRadioGroup: '2', objectBool: false, objectText: 'see' },
      ],
    },
*/
