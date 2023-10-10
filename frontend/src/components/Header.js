import { Link, Navigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Header = () => {
  const { logout } = useLogout();
  const { profile } = useAuthContext();

  const handleClick = () => {
    logout();
  };

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
        <Link to="/page">
          <h1>Users</h1>
        </Link>
        <nav>
          {profile && (
            <div>
              <span>{profile.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!profile && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/create">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
