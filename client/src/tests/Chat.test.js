// React
import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Chat from './Chat';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Chat />, div);
});
