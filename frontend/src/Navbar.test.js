import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "./Navbar";
import UserContext from "./UserContext";

describe("Navbar component", () => {
  test("renders navbar with login/register link when user is not logged in", () => {
    render(<Navbar />);

    expect(screen.getByText("PRIMAL")).toBeInTheDocument();
    expect(screen.getByText("Login/ Register")).toBeInTheDocument();
  });

  test("renders navbar with logged-in links and logout button when user is logged in", () => {
    const currentUser = { id: "123", username: "testuser" };
    const logoutMock = jest.fn();

    render(
      <UserContext.Provider value={{ currentUser }}>
        <Navbar logout={logoutMock} />
      </UserContext.Provider>
    );

    expect(screen.getByText("PRIMAL")).toBeInTheDocument();
    expect(screen.getByText("Exercises")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  test("calls logout function when logout button is clicked", () => {
    const currentUser = { id: "123", username: "testuser" };
    const logoutMock = jest.fn();

    render(
      <UserContext.Provider value={{ currentUser }}>
        <Navbar logout={logoutMock} />
      </UserContext.Provider>
    );

    const logoutButton = screen.getByText("Logout");
    userEvent.click(logoutButton);

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
