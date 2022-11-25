import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App.js";
import Login from "../pages/Login/Login";

describe("Test Main", () => {
  beforeEach(() => {
    const currentState = window.history.state;
    window.history.replaceState(currentState, "", "/");
  });

  it("Should be valid amount", async () => {
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

    const amountInput = screen.getByTestId("amount-id");
    const installmentsInput = screen.getByTestId("installments-id");
    const billingInput = screen.getByTestId("billing-id");
    const firstInstallmentInput = screen.getByTestId("first-installment-id");
    const submitButton = screen.getByTestId("submit-id");

    fireEvent.change(amountInput, {
      target: {
        value: 0,
      },
    });
    fireEvent.change(installmentsInput, {
      target: {
        value: 2,
      },
    });
    fireEvent.change(billingInput, {
      target: {
        value: 15,
      },
    });
    fireEvent.change(firstInstallmentInput, {
      target: {
        value: "2022-12-15",
      },
    });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Informações em formato incorreto.");
    expect(errorMessage).toBeInTheDocument();
  });
  it("Should be valid installments", async () => {
    render(<App />);
    const amountInput = screen.getByTestId("amount-id");
    const installmentsInput = screen.getByTestId("installments-id");
    const billingInput = screen.getByTestId("billing-id");
    const firstInstallmentInput = screen.getByTestId("first-installment-id");
    const submitButton = screen.getByTestId("submit-id");

    fireEvent.change(amountInput, {
      target: {
        value: 2000,
      },
    });
    fireEvent.change(installmentsInput, {
      target: {
        value: 0,
      },
    });
    fireEvent.change(billingInput, {
      target: {
        value: 15,
      },
    });
    fireEvent.change(firstInstallmentInput, {
      target: {
        value: "2022-12-15",
      },
    });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Informações em formato incorreto.");
    expect(errorMessage).toBeInTheDocument();
  });
  it("Should be valid billing", async () => {
    render(<App />);
    const amountInput = screen.getByTestId("amount-id");
    const installmentsInput = screen.getByTestId("installments-id");
    const billingInput = screen.getByTestId("billing-id");
    const firstInstallmentInput = screen.getByTestId("first-installment-id");
    const submitButton = screen.getByTestId("submit-id");

    fireEvent.change(amountInput, {
      target: {
        value: 2000,
      },
    });
    fireEvent.change(installmentsInput, {
      target: {
        value: 2,
      },
    });
    fireEvent.change(billingInput, {
      target: {
        value: 33,
      },
    });
    fireEvent.change(firstInstallmentInput, {
      target: {
        value: "2022-12-15",
      },
    });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Informações em formato incorreto.");
    expect(errorMessage).toBeInTheDocument();
  });
  it("Should be valid installment date", async () => {
    render(<App />);
    const amountInput = screen.getByTestId("amount-id");
    const installmentsInput = screen.getByTestId("installments-id");
    const billingInput = screen.getByTestId("billing-id");
    const firstInstallmentInput = screen.getByTestId("first-installment-id");
    const submitButton = screen.getByTestId("submit-id");

    fireEvent.change(amountInput, {
      target: {
        value: 2000,
      },
    });
    fireEvent.change(installmentsInput, {
      target: {
        value: 2,
      },
    });
    fireEvent.change(billingInput, {
      target: {
        value: 15,
      },
    });
    fireEvent.change(firstInstallmentInput, {
      target: {
        value: "1950-12-15",
      },
    });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText("Informações em formato incorreto.");
    expect(errorMessage).toBeInTheDocument();
  });
  it("Should submit when form is valid", async () => {
    render(<App />);
    const amountInput = screen.getByTestId("amount-id");
    const installmentsInput = screen.getByTestId("installments-id");
    const billingInput = screen.getByTestId("billing-id");
    const firstInstallmentInput = screen.getByTestId("first-installment-id");
    const submitButton = screen.getByTestId("submit-id");

    fireEvent.change(amountInput, { 
      target: {
        value: 2000,
      },
    });
    fireEvent.change(installmentsInput, {
      target: {
        value: 2,
      },
    });
    fireEvent.change(billingInput, {
      target: {
        value: 15,
      },
    });
    fireEvent.change(firstInstallmentInput, {
      target: {
        value: "2022-12-15",
      },
    });
    fireEvent.click(submitButton);
    
    const successMessage = screen.getByText("Registro efetuado com sucesso!");
    expect(successMessage).toBeInTheDocument();
  });  
});
