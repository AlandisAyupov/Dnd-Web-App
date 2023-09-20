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
        <Link to="/dice">
          <h1>Roll</h1>
        </Link>
        <Link to="/create">
          <h1>Create Profile</h1>
        </Link>
        <Link to="/profiles">
          <h1>Users</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
