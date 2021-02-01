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
          // value: ['first', 'second'],
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
          // value: new Date(),
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
          // value: 'someValue3',
        },
      },
      value: {
        objectTextMultiple: ['first', 'second'],
        objectBoolean: false,
        objectDate: new Date(),
        objectFilterSelect: 'someValue3',
      },
    },

  },
  errors: [],
};
