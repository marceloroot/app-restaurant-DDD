import { render, screen } from "@testing-library/react";
import Header from "@/app/_components/header";

it("should redender button", () => {
  render(<Header />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

console.log(screen);
