import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App.js";
import Login from "../pages/Login/Login";

describe("Test routes", () => {
  beforeEach(() => {
    const currentState = window.history.state;
    window.history.replaceState(currentState, "", "/");
  });

  it("Should render login page", async () => {
    window.history.pushState({}, "Login Page", "/login");

    render(<App />);
    const loginPage = screen.getByTestId("login-id");

    expect(loginPage).toBeInTheDocument();
  });

  it("should get main page", async () => {
    render(<App />);
    const passwordInput = screen.getByTestId("password-id");
    const emailInput = screen.getByTestId("email-id");

    const loginButton = screen.getByTestId("login-button-id");

    fireEvent.change(passwordInput, {
      target: {
        value: "Lucas#12345",
      },
    });

    fireEvent.change(emailInput, {
      target: {
        value: "lucasghank@gmail.com",
      },
    });

    expect(emailInput).toHaveValue("lucasghank@gmail.com");
    expect(passwordInput).toHaveValue("Lucas#12345");

    fireEvent.click(loginButton);

    const mainPage = screen.getByTestId("main-id");

    expect(mainPage).toBeInTheDocument();
  });
  it("should get statement page", async () => {
    render(<App />);
    
    const statementButton = screen.getByTestId("statement-id");
    
    fireEvent.click(statementButton);

    const statementPage = screen.getByTestId("statement-id");

    expect(statementPage).toBeInTheDocument();
  });
});
