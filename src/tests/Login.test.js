import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App.js";
import Login from "../pages/Login/Login";

describe("Test Login", () => {
  beforeEach(() => {
    const currentState = window.history.state;
    window.history.replaceState(currentState, "", "/");
  });

  it("Should throw exception when email is invalid", async () => {
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
        value: "lucasghank",
      },
    });
    fireEvent.click(loginButton);
    const errorMessage = screen.getByText(
      "Email ou senha em formato incorreto."
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it("Should throw exception when password is invalid", async () => {
    render(<App />);
    const passwordInput = screen.getByTestId("password-id");
    const emailInput = screen.getByTestId("email-id");

    const loginButton = screen.getByTestId("login-button-id");

    fireEvent.change(passwordInput, {
      target: {
        value: "123",
      },
    });

    fireEvent.change(emailInput, {
      target: {
        value: "lucasghank@hotmail.com",
      },
    });
    fireEvent.click(loginButton);
    const errorMessage = screen.getByText(
      "Email ou senha em formato incorreto."
    );
    expect(errorMessage).toBeInTheDocument();
  });
  it("Should submit when password and email is valid", async () => {
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
        value: "lucasghank@hotmail.com",
      },
    });
    fireEvent.click(loginButton);
    
    expect(loginButton).not.toBeInTheDocument()
  });
});
