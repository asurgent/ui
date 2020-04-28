/* eslint-env jest */

import React from 'react';
import { render, cleanup, fireEvent } from 'test-utils';
import * as Button from './index';

afterEach(cleanup);

describe('Button', () => {
  test('Renders button with content', () => {
    const props = { btnTitle: 'Click me' };

    const { getByText } = render(
      <Button.Primary>
        {props.btnTitle}
      </Button.Primary>,
    );

    const btnTitle = getByText(props.btnTitle);
    expect(btnTitle).toBeDefined();
  });

  test('OnClick works when not disabled', () => {
    const props = { btnTitle: 'Btn', onClick: jest.fn() };

    const { getByText } = render(
      <Button.Primary {...props}>
        {props.btnTitle}
      </Button.Primary>,
    );

    fireEvent.click(getByText(props.btnTitle));
    expect(props.onClick).toHaveBeenCalled();
  });

  test('OnClick does nothing when disabled', () => {
    const props = { btnTitle: 'Btn', disabled: true, onClick: jest.fn() };

    const { getByText } = render(
      <Button.Primary {...props}>
        {props.btnTitle}
      </Button.Primary>,
    );

    fireEvent.click(getByText(props.btnTitle));
    expect(props.onClick).not.toHaveBeenCalled();
  });

  test('Toggles spinner on prop-change', () => {
    const props = { btnTitle: 'Btn', loading: false };

    const { queryByTestId, rerender } = render(
      <Button.Primary {...props}>
        {props.btnTitle}
      </Button.Primary>,
    );

    let spinner = queryByTestId(/ring-spinner/);
    expect(spinner).toBeNull();

    const newProps = { ...props, loading: true };

    rerender(
      <Button.Primary {...newProps}>
        {newProps.btnTitle}
      </Button.Primary>,
    );

    spinner = queryByTestId(/ring-spinner/);
    expect(spinner).not.toBeNull();
  });
});
