import React from 'react';
import { render } from '@testing-library/react';
import ExerciseCats from './ExerciseCats';

test('renders without crashing', () => {
    render(<ExerciseCats />);
  });