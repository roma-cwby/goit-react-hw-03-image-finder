export const Button = ({ text, click }) => {
  return (
    <button className="Button" type="button" onClick={click}>
      {text}
    </button>
  );
};
