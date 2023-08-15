import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Characters</h1>
        </Link>
        <Link to="/form">
          <h1>Form</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
