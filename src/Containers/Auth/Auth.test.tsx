import React from "react";
import { render, screen } from "@testing-library/react";
import Auth from "./Auth";

test("renders learn react lin", () => {
  render(<Auth />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
