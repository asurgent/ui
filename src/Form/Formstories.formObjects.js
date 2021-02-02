export const defaultFormObject = {
  data: {
    someText: {
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
    },
    someObjectMultiple: {
      type: 'objectmultiple',
      label: 'some object single',
      tooltip: 'hej',
      options: {
        subText: {
          type: 'text',
          label: 'Some Text',
          tooltip: 'hejhej',
          value: 'text text',
        },
        subSelect: {
          type: 'filterselect',
          label: 'Text me',
          tooltipPosition: 'left',
          tooltip: 'Text me',
          placeholder: 'select',
          options: [{ value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
          ],
          props: {
            multiSelect: true,
            searchPlaceholder: 'Search in me plz',
          },
        },
      },
      value: [
        { subText: 'Hi', subSelect: ['2', '3'] },
        { subText: 'bye', subSelect: ['1'] },
      ],
    },
  },
  errors: [],
};
