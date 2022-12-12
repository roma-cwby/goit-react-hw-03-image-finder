export const Button = ({ text, click }) => {
  return (
    <button type="button" onClick={click}>
      {text}
    </button>
  );
};
