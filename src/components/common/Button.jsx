const Button = ({ text, onClick, className = '' }) => {
  return (
    <button 
      className={`btn btn-primary ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
