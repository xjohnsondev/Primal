import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders without crashing', () => {
  render(<Home />);
});
