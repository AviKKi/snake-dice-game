import { act, renderHook } from "@testing-library/react";
import useGameState from "./useGameState";
import { mockRandom, resetMockRandom } from "jest-mock-random";

describe("User Story #1:", function () {
  test("2. The game will have a 6 sided dice numbered from 1 to 6 and will always give a random number on rolling it.", () => {
    mockRandom([0.23, 0.4, 0.5, 0.7, 0.85, 0]);
    const { result } = renderHook(() => useGameState());
    // checking values only range from 1-6 by mocking random function in range [0,1)
    [1, 2, 3, 4, 5, 6, 1].forEach((dice) => {
      expect(result.current.dice).toBe(dice);
      act(() => result.current.rollDice());
    });
    resetMockRandom();
  });

  test("3. The player initially starts from outside the board. Move the player to position 1 when the dice value is 6 only.", () => {
    mockRandom([0.23, 0.4, 0.5, 0.7, 0.85, 0.99]);
    const { result } = renderHook(() => useGameState());
    Array(5)
      .fill(0)
      .forEach(() => {
        expect(result.current.marblePosition).toBe(-1);
        act(() => result.current.rollDice());
      });
    expect(result.current.marblePosition).toBe(0);
  });

  test("4. For a dice throw, a player should move from the initial position by the number on dice throw.", () => {
    mockRandom([0.99]);
    const { result } = renderHook(() => useGameState());

    act(() => result.current.rollDice());
    resetMockRandom();
    let prevPosition = 0;
    act(() => result.current.rollDice());
    expect(prevPosition + result.current.dice).toBe(
      result.current.marblePosition
    );
  });
});

describe("Test the useGameState Hook", function () {
  test("start position is -1", () => {
    const {
      result: {
        current: { marblePosition },
      },
    } = renderHook(() => useGameState());
    expect(marblePosition).toBe(-1);
  });


});
