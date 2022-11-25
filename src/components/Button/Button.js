import './Button.css';

function Button({ onClickFunction, children, id, addClassName, dataTestId }) {
  return (
    <button
      type='button'
      className={`standard-button ${addClassName}`}
      onClick={onClickFunction}
      id={id}
      data-testid={dataTestId}
    >
      { children }
    </button>
  );
}

export default Button;
