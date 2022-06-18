import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("User Story #1", () => {
  test("1. The board will have 100 cells.", () => {
    const {container} =render(<App />);
    // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
    const cells = container.querySelectorAll('.boardTile')
    expect(cells).toBeDefined()
    expect(cells).toHaveLength(100)
  });

});

test("renders learn react link", () => {
  render(<App />);
});
