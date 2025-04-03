import { render, screen } from "@testing-library/react";

import Home from "@/components/ladingPage/home/Home";

it("renders home page", async () => {
  render(<Home />);
  const element = await screen.findByText("Fitness Journey"); // This will wait for the text to appear
  expect(element).toBeInTheDocument();
});
