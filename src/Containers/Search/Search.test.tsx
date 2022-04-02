import { render, screen } from "@testing-library/react";
import Search from "./Search";

test("Search", () => {
  render(<Search />);
  const linkElement = screen.getByText("Reset");
  expect(linkElement).toBeInTheDocument();
});
