import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const Header = () => {
  const { logout } = useLogout();
  const { profile } = useAuthContext();
  const { dispatch } = useAuthContext();

  const handleClick = () => {
    console.log(profile);
    console.log("Logged out.");
    logout();
  };

  useEffect(() => {
    console.log("Bruh!");
    const fetchProfiles = async () => {
      console.log("Bruh2!");
      const response = await fetch(`/api/profile/:${profile.username}`, {
        method: "POST",
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "GET_PROFILE", payload: json });
      }
    };
  }, []);

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
              {profile.url && <img src={profile.url} />}
            </div>
          )}
          {!profile && (
            <div>
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/signup">Signup</Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
