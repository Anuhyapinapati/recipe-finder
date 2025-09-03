import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App Component", () => {
  it("renders the search input", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(
      /enter an ingredient/i  // <-- updated regex
    );
    expect(input).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<App />);
    expect(
      screen.getByText(/recipe finder/i)
    ).toBeInTheDocument();
  });
});
