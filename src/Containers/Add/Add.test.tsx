import { render, screen } from "@testing-library/react";
import Add from "./Add";

test("renders learn react link", () => {
  render(<Add />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
