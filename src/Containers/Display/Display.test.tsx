import React from "react";
import { render, screen } from "@testing-library/react";
import Display from "./Display";

test("renders learn react link", () => {
    render(<Display />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
