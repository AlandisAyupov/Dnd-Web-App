import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./ProfilePage.modules.css";

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function getProfiles() {
      const result = await axios.get("/api/profile");
      setProfiles(result.data);
    }
    getProfiles();
  }, []);

  return (
    <div className="App">
      <div className="profile">
        {profiles.map((profile) => (
          <div key={`profile-${profile.id}`} className="px-5 py-14">
            <div className="div1">
              <img
                style={{
                  borderRadius: "50%",
                  background: "red",
                  display: "block",
                }}
                className="rounded"
                width="100"
                height="100"
                src={profile.url}
              ></img>
              <p>{profile.username}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
