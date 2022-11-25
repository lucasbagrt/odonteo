import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Message from "../../components/Message/Message";
import ConfigApi from "../../configApi";
import isAuthenticated from "../../utils/auth";
import fetchApi from "../../utils/fetch";
import { handleChange } from "../../utils/handleChange";
import parseInstallmentDetails from "../../utils/parseInstallmentDetails";
import showMessage from "../../utils/showMessage";
import "./Main.css";

function Main() {
  const [incomeInformation, setIncomeInformation] = useState({
    paymentAmount: "",
    numberOfInstallments: "",
    billingDay: "",
    firstInstallmentDate: "",
  });

  const {
    paymentAmount,
    numberOfInstallments,
    billingDay,
    firstInstallmentDate,
  } = incomeInformation;

  const [message, setMessage] = useState({ show: false, text: "", status: "" });

  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  function isInformationValid() {
    const validAmount = Number(paymentAmount) > 0;
    const validInstallmentNum =
      Number(numberOfInstallments) > 0 &&
      Number.isInteger(Number(numberOfInstallments));

    let validBillingDay =
      Number(billingDay) > 0 &&
      Number(billingDay) < 32 &&
      Number.isInteger(Number(billingDay));

    const validInstallmentDate =
      firstInstallmentDate &&
      Number(firstInstallmentDate.split("-")[0]) >= 1960; 

    if (numberOfInstallments === "1") {
      validBillingDay = true;
    }

    return (
      validAmount &&
      validInstallmentNum &&
      validInstallmentDate &&
      validBillingDay
    );
  }

  async function register() {
    let text = "Informações em formato incorreto.";
    let status = "error";

    if (isInformationValid()) {
      const installmentDetails = parseInstallmentDetails(
        paymentAmount,
        numberOfInstallments,
        billingDay,
        firstInstallmentDate
      );

      const body = {
        income: {
          ...installmentDetails,
          userId: user.id,
        },
      };

      const options = {
        method: "POST",
        body: JSON.stringify(body),
      };

      if (ConfigApi.IS_API_MOCK) {
        text = "Registro efetuado com sucesso!";
      }
      else {        
        text = await fetchApi(
          "https://odonteo-backend.herokuapp.com/income",
          options,
          true
        ).then(({ message }) => message);
      }

      if (text === "Registro efetuado com sucesso!") {
        status = "success";
      }
    }

    showMessage(setMessage, text, status);
  }

  return (
    <main data-testid="main-id">
      {message.show && (
        <Message addClass={message.status}>{message.text}</Message>
      )}
      <form>
        <label htmlFor="amount">
          Quantia a receber:
          <input
            id="amount"
            data-testid="amount-id"
            className="form-input"
            name="paymentAmount"
            type="number"
            placeholder="ex. 3500.50"
            onChange={(e) => handleChange(e, setIncomeInformation)}
          />
        </label>
        <label htmlFor="installments">
          Número de parcelas:
          <input
            id="installments"
            data-testid="installments-id"
            className="form-input"
            name="numberOfInstallments"
            type="number"
            placeholder="ex. 2"
            onChange={(e) => handleChange(e, setIncomeInformation)}
          />
        </label>
        <label htmlFor="billing-day">
          Dia do mês para cobrança:
          <input
            id="billing-day"
            data-testid="billing-id"
            className="form-input"
            name="billingDay"
            type="number"
            placeholder="ex. 15"
            disabled={incomeInformation.numberOfInstallments === "1"}
            onChange={(e) => handleChange(e, setIncomeInformation)}
          />
        </label>
        <label htmlFor="first-installment-date">
          Data da primeira parcela:
          <input
            id="first-installment-date"
            data-testid="first-installment-id"
            className="form-input date"
            name="firstInstallmentDate"
            type="date"
            placeholder="dd-mm-yyyy"
            onChange={(e) => handleChange(e, setIncomeInformation)}
          />
        </label>
        <Button
          id="register-button"
          onClickFunction={register}
          addClassName="form-button"
          dataTestId="submit-id"
        >
          Registrar cobrança
        </Button>
      </form>
      <Button
        id="go-to-statement-button"
        onClickFunction={() => navigate("/statement")}
        dataTestId="statement-id"
      >
        Ver extrato
      </Button>
    </main>
  );
}

export default Main;
