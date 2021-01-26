import FilterSelect from '../FilterSelect';
import Select from '../Select';
import Bool from '../Bool';
import TextMultiple from '../TextMultiple';
import TextArea from '../TextArea';
import Label from '../Label';
import Text from '../Text';
import Number from '../Number';
import DatePicker from '../DatePicker';
import RadioGroup from '../RadioGroup';
import Email from '../Email';
import Switch from '../Switch';

export const clearObjectValues = (obj) => {
  const objectEmptyValues = Object.keys(obj).map((key) => ({ [key]: '' }));
  return Object.assign({}, ...objectEmptyValues);
};

export const valuesPassedValidation = ({ validators, value }) => Object.keys(validators)
  .every((key) => value.every((valEntry) => {
    const fieldValue = valEntry[key];
    const fieldValidation = validators[key].valid;
    return fieldValidation(fieldValue);
  }));

export const valuePassedValidation = ({ validators, value }) => Object.keys(validators)
  .every((key) => {
    const { valid } = validators[key];
    const val = value[key];
    return valid(val);
  });

export const getInputComponent = (type) => {
  switch (type) {
    case 'bool':
      return Bool;
    case 'text':
      return Text;
    case 'textmultiple':
      return TextMultiple;
    case 'number':
      return Number;
    case 'textarea':
      return TextArea;
    case 'select':
      return Select;
    case 'filterselect':
      return FilterSelect;
    case 'label':
      return Label;
    case 'datepicker':
      return DatePicker;
    case 'radiogroup':
      return RadioGroup;
    case 'email':
      return Email;
    case 'switch':
      return Switch;

    default:
      return Text;
  }
};
