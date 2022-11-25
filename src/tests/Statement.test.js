import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App.js";

describe("Test Statement", () => {
  beforeEach(() => {
    const currentState = window.history.state;
    window.history.replaceState(currentState, "", "/");
  });

  it("Should get statement inputs", async () => {
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

    const statementId = screen.getByTestId("statement-id");
    fireEvent.click(statementId);

    const statementPage = screen.getByTestId("statement-id");

    expect(statementPage).toBeInTheDocument();

    const initialDataInput = screen.getByTestId('beginning-date-id');
    const endDataInput = screen.getByTestId('ending-date-id');

    fireEvent.change(initialDataInput, { target: {
        value: '2022-12-15'
    }});
    fireEvent.change(endDataInput, { target: {
        value: '2022-12-30'
    }});

    expect(initialDataInput).toHaveValue('2022-12-15');
    expect(endDataInput).toHaveValue('2022-12-30');
  }); 
});
