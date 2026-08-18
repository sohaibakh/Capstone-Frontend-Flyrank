import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CompareSearchPanel from "./CompareSearchPanel";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));

const defaultProps = {
  query: "MacBook Pro M3",
  countries: ["US", "GB", "PK"],
  sort: "country-platform",
  minTrust: "0",
  risk: "all",
  condition: "all",
  suggestions: ["iPhone 15 Pro"],
};

describe("CompareSearchPanel", () => {
  it("renders accessible search and filter controls", () => {
    render(<CompareSearchPanel {...defaultProps} />);

    expect(screen.getByLabelText(/product search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/minimum trust/i)).toBeInTheDocument();
    expect(screen.getByRole("group", { name: /filter by country/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /united states/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("updates country selection state and submits the audit URL", () => {
    render(<CompareSearchPanel {...defaultProps} />);

    fireEvent.click(screen.getByRole("button", { name: /canada/i }));
    expect(screen.getByRole("button", { name: /canada/i })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /iphone 15 pro/i }));
    fireEvent.click(screen.getByRole("button", { name: /run audit/i }));

    expect(push).toHaveBeenCalledWith(expect.stringContaining("/compare?"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("q=iPhone+15+Pro"));
    expect(push).toHaveBeenCalledWith(expect.stringContaining("countries=US%2CGB%2CPK%2CCA"));
  });
});
