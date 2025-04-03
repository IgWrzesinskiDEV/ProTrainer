import { render, screen } from "@testing-library/react";

import Auth from "@/components/UI/auth/Auth";

it("renders auth form", async () => {
  render(<Auth isLogin />);
  const element = screen.getByRole("heading", { name: "Welcome Back" });
  expect(element).toBeInTheDocument();
});
