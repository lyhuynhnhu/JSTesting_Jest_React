import React from 'react';
import { act } from 'react-dom/test-utils';
import { unmountComponentAtNode } from 'react-dom';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import Contact from './Contact';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Contact Form', () => {
  it('should render component correctly', () => {
    const component = renderer.create(<Contact />).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should render component correctlly with MemoryRouter', () => {
    const component = renderer.create(
      <MemoryRouter><Contact/></MemoryRouter>
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('should be display error when touch field without enter value', async () => {
    const { getByLabelText, getByTestId } = render(<Contact />);
    const name = getByLabelText("Your name:");

    await act(async () => {
      fireEvent.blur(name)
    });

    await (() => {
      expect(getByTestId("error")).toHaveTextContent(/^This field is required !$/);
    });
  });

  it('should return correct info after submit form', async () => {
    const { getByLabelText, getByTestId } = render(<Contact />);
    const name = getByLabelText("Your name:");
    const select = getByLabelText("Select:");
    const message = getByLabelText("Message:");
    const form = getByTestId("contact-form");

    const expectInfo = {
      name: 'Nhu',
      select: 'driver',
      message: 'My message here',
    };

    await act(async() => {
      fireEvent.change(name, {target: {value: expectInfo.name}})
      fireEvent.change(select, {target: {value: expectInfo.select}})
      fireEvent.change(message, {target: {value: expectInfo.message}})
      fireEvent.submit(form)
    });
    
    await (() => {
      expect(name).toHaveTextContent(expectInfo.name);
      expect(select).toHaveTextContent(expectInfo.select);
      expect(message).toHaveTextContent(expectInfo.message);
    });
  });
});

