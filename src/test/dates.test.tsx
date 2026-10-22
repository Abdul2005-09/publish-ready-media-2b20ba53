import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Dates } from "@/components/wedding/Dates";

vi.mock("@/components/wedding/shared", () => ({
  Corner: () => null,
  Ornament: () => null,
  Heading: ({ children }: { children: React.ReactNode }) => <h2>{children}</h2>,
  Reveal: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe("date reveal completion", () => {
  it("reports completion only after both wedding dates are revealed", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const completed = vi.fn();
    render(<Dates onRevealed={completed} />);
    fireEvent.click(screen.getByRole("button", { name: "Reveal Reception date" }));
    expect(completed).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Reveal Muhurtham date" }));
    expect(completed).toHaveBeenCalledTimes(1);
  });

  it("reports completion when the visitor reveals both dates together", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
    const completed = vi.fn();
    render(<Dates onRevealed={completed} />);
    fireEvent.click(screen.getByRole("button", { name: "Reveal Dates" }));
    expect(completed).toHaveBeenCalledTimes(1);
  });
});