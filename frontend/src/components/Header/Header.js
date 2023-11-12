import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useLogout();
  const { profile, dispatch } = useAuthContext();
  const [profiles, setProfiles] = useState([]);
  let navigate = useNavigate();

  const handleClick = () => {
    console.log(profile);
    console.log("Logged out.");
    logout();
  };

  useEffect(() => {
    async function getProfiles() {
      const result = await axios.get("/api/profile/");
      setProfiles(result.data);
    }
    if (profile) {
      getProfiles();
    }
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
              <span>{profile.profile.email}</span>
              <button onClick={handleClick}>Log out</button>
              {profiles.map(
                (pfile) =>
                  profile.profile.username === pfile.username && (
                    <img src={pfile.url}></img>
                  )
              )}
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
