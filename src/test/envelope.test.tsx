import { act, cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { Envelope } from "@/components/wedding/Envelope";

vi.mock("@/components/wedding/shared", () => ({
  Heading: () => null,
  Ornament: () => null,
}));

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it("follows scrolling down, reverses upward, and resumes extraction", () => {
  let top = 0;
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(() => ({
    top, height: window.innerHeight * 3,
    bottom: top + window.innerHeight * 3, left: 0, right: 300, width: 300,
    x: 0, y: top, toJSON: () => ({}),
  }));
  vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    callback(0);
    return 0;
  });
  const { container } = render(<Envelope />);
  const letter = container.querySelector<HTMLElement>(".letter");
  if (!letter) throw new Error("Missing invitation letter");
  const scroll = (progress: number) => {
    top = -progress * window.innerHeight * 2;
    act(() => { window.dispatchEvent(new Event("scroll")); });
    return Number(letter.style.transform.match(/translateY\(([-\d.]+)%\)/)?.[1]);
  };
  expect(scroll(0)).toBe(100);
  const halfway = scroll(0.5);
  expect(halfway).toBeLessThan(100);
  expect(scroll(1)).toBe(-50);
  expect(scroll(0.5)).toBeCloseTo(halfway);
  expect(scroll(0)).toBe(100);
  expect(scroll(1)).toBe(-50);
});