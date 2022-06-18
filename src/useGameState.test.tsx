import React from "react";
import { act, render, renderHook, screen } from "@testing-library/react";
import App from "./App";
import useGameState from "./useGameState";
import { mockRandom, mockRandomForEach, resetMockRandom } from "jest-mock-random";

describe("Test the useGameState Hook", function () {
  test("start position is -1", () => {
    const {
      result: {
        current: { marblePosition },
      },
    } = renderHook(() => useGameState());
    expect(marblePosition).toBe(-1);
  });

  test("dice's output is in range [1,6]", () => {
    mockRandom([
      0.1666, 0.3333, 0.5, 0.6666,
      0.83333, 0.99,
    ]);
    resetMockRandom()
  });

  test("game starts after a six", () => {
    mockRandom([0.2, 0.99]);
    const {
      result
    } = renderHook(() => useGameState());
    expect(result.current.dice).toBe(1);
    act(() => result.current.rollDice());
    expect(result.current.dice).toBe(2);
    expect(result.current.marblePosition).toBe(-1);
    act(() => result.current.rollDice());
    expect(result.current.marblePosition).toBe(0);
    resetMockRandom()
});
});
