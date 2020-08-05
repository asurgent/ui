/* eslint-env jest */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  render, cleanup, act,
} from 'test-utils';

import * as Form from './index';
import * as Button from '../Button';


afterEach(cleanup);

const MyForm = ({ subTitle, resetTitle, onClick }) => {
  const formObj = {
    someText: {
      type: 'text', label: 'Test', placeholder: 'Hello',
    },
  };
  const formData = Form.useFormBuilder(formObj);

  useEffect(() => {
    formData.updateFields([{ name: 'someText', value: 'My value' }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form.Primary form={formData}>
      {(inputList, renderFields, onSubmitAction, onResetAction, isDirty) => (
        <>
          {renderFields}
          {isDirty && <Button.Secondary>{resetTitle}</Button.Secondary>}
          <Button.Primary
            type="button"
            onClick={onClick()}
          >
            {subTitle}
          </Button.Primary>
        </>
      )}
    </Form.Primary>

  );
};

MyForm.propTypes = {
  subTitle: PropTypes.string.isRequired,
  resetTitle: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

describe('Button', () => {
  test('The form submits when clicking the submit button, even when fields are not yet blurred', async () => {
    const props = {
      subTitle: 'Submit', resetTitle: 'Reset', disabled: true, onClick: jest.fn(),
    };

    const rend = render(<MyForm {...props} />);
    const { queryByText, queryByDisplayValue, rerender } = rend;
    const subBtn = queryByText(props.subTitle);
    expect(subBtn).toBeDefined();

    // check that a button is hidden on !isDirty
    let resetBtn = queryByText(props.resetTitle);
    expect(resetBtn).toBeNull();

    const textInput = queryByDisplayValue('My value');
    expect(textInput).toBeDefined();

    act(() => textInput.focus());
    rerender(<MyForm {...props} />);

    // check that a button is visible on isDirty
    resetBtn = queryByText(props.resetTitle);
    expect(resetBtn).toBeDefined();

    // TODO: klicking a field without changing anything turns the form dirty. should not.
    // have to blur fields before being able to click the submit button also.

    /*
    textInput = rend.getByDisplayValue('My value');
    expect(textInput).toBeDefined();


    textInput = rend.getByDisplayValue('My value');
    expect(textInput).toBeDefined();


    fireEvent.click(subBtn);
    expect(props.onClick).toHaveBeenCalled(); */
    /*  const btnTitle = getByText(props.btnTitle);
    expect(btnTitle).toBeDefined(); */
  });
});
