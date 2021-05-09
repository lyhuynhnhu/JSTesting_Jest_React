import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';
import Welcome from './Welcome';

describe('Welcome Component', () => {
    let container = null;

    beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    // data = {name: 'admin'};
    });

    afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
    });

    it('renders with or without a name', () => {
    act(() => {
        render(<Welcome />, container);
    });
    expect(container.textContent).toEqual('Hey, stranger'); // ====
    act(() => {
        render(<Welcome name="Jenny" />, container);
    });
    expect(container.textContent).toBe('Hello, Jenny!');
    act(() => {
        render(<Welcome name="Margaret" />, container);
    });
    expect(container.textContent).toBe('Hello, Margaret!');
    });
});