import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TargetExercises from './TargetExercises';
import PrimalApi from './api';

// Mock the API function
jest.mock('./api', () => ({
    getTargetExercises: jest.fn(),
  }));
  
  describe('TargetExercises component', () => {
    test('renders target exercises component', async () => {
     
      // Render the component
      render(
        <MemoryRouter>
          <TargetExercises />
        </MemoryRouter>
      );
  
      // Check if exercise cards are rendered based on the mock data
      expect(screen.getByTestId('tar-display')).toBeInTheDocument();
      expect(screen.getByTestId('tar-list')).toBeInTheDocument();
      
    });
  });
  