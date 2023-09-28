import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import Banner from "./Banner";

describe("Banner", () => {
  it("checking if h1 inside banner component", () => {
    render(<Banner />);
    expect(screen.getByText("Hello"));
  });
  //
//   it("checking if  span inside banner component", () => {
//     render(<Banner />);
//     expect(screen.getByTestId("span")).toBeInTheDocument()
//   });
//
});
