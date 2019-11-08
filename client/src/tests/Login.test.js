// React
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

// Components
import { Login } from '../UserManagement/Login';
import { Button } from '@material-ui/core';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
});

test('Login button is enabled when login and password text fields are filled', () => {
  const testRenderer = renderer.create(<Login />);
  const testInstance = testRenderer.root;

  // TODO: Maybe use snapshot testing...?
  // let tree = testInstance.toJSON();
  // expect(tree).toMatchSnapshot();

  // confirm login button is disabled
  expect(testInstance.findByType(Button).props.disabled).toBe(true);

  // manually enter text into username text field

  // manually enter text into pass text field

  // check to see if login button has been enabled
});
