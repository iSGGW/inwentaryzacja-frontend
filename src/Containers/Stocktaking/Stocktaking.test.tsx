import React from "react";
import { render, screen } from "@testing-library/react";
import Stocktaking from "./Stocktaking";

test("Stocktaking", () => {
  render(<Stocktaking />);
  const linkElement = screen.getByText("Scan QR code");
  expect(linkElement).toBeInTheDocument();
});
