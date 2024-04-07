import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpandedCard from "./ExpandedCard";

// Mocking the UserContext
jest.mock("./UserContext", () => ({
  __esModule: true,
  default: {
    currentUser: {
      id: "user123", // Mock user ID
    },
  },
}));

describe("ExpandedCard component", () => {
  test("renders expanded card with correct data", () => {
    // Mock data for the expanded card
    const mockData = {
      id: "exercise123", // Mock exercise ID
      name: "Exercise Name",
      gif: "exercise.gif",
      instructions: ["Instruction 1", "Instruction 2"],
      target: "Target Muscle",
      secondary: ["Secondary Muscle 1", "Secondary Muscle 2"],
    };

    // Mock user favorites
    const mockUserFavorites = [{ id: "exercise123" }]; // Mocking that this exercise is favorited by the user

    // Render the ExpandedCard component
    render(
      <ExpandedCard
        data={mockData}
        userFavorites={mockUserFavorites}
        setUserFavorites={() => {}} // Mock setUserFavorites function
      />
    );

    // Check if the exercise name is rendered
    expect(screen.getByText("Exercise Name")).toBeInTheDocument();

    // Check if the instructions are rendered
    expect(screen.getByText("Instructions:")).toBeInTheDocument();
    expect(screen.getByText("Instruction 1")).toBeInTheDocument();
    expect(screen.getByText("Instruction 2")).toBeInTheDocument();

    // Check if the target muscle is rendered
    expect(screen.getByText("Target Muscle:")).toBeInTheDocument();
    expect(screen.getByText("Target Muscle")).toBeInTheDocument();

    // Check if the secondary muscles are rendered
    expect(screen.getByText("Secondary Muscles:")).toBeInTheDocument();
    expect(screen.getByText("Secondary Muscle 1")).toBeInTheDocument();
    expect(screen.getByText("Secondary Muscle 2")).toBeInTheDocument();

    // Check if the favorite icon is rendered based on user favorites
    expect(screen.getByTestId("fav-icon")).toBeInTheDocument();
  });
});
