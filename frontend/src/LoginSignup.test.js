import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import LoginSignup from "./LoginSignup";


describe("LoginSignup Component", () => {
  test("renders login form without crashing", () => {
    render(<MemoryRouter><LoginSignup /></MemoryRouter>);
    const loginForm = screen.getByTestId("login-display");
    expect(loginForm).toBeInTheDocument();
  });

  test("renders registration form when switch text is clicked", () => {
    render(<MemoryRouter><LoginSignup /></MemoryRouter>);
    const switchText = screen.getByText("New to PRIMAL? Register here");
    fireEvent.click(switchText);
    const registrationForm = screen.getByText("Already have an account? Login here");
    expect(registrationForm).toBeInTheDocument();
  });

  test('submits login form with correct data', async () => {
    const mockLogin = jest.fn();
    render(
      <MemoryRouter>
        <LoginSignup login={mockLogin} />
      </MemoryRouter>
    );
    const usernameInput = screen.getByTestId("Username").querySelector('input');
    const passwordInput = screen.getByTestId("Password").querySelector('input');

    // Input valid username and password
    fireEvent.change(usernameInput, { target: { value: 'jestuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByTestId("button"));

    // Ensure that the login function is called with the correct data
    expect(mockLogin).toHaveBeenCalledWith({ username: 'jestuser', password: 'password123' });
  
  });
});
