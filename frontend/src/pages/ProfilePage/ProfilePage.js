import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profiles, setProfiles] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function getProfiles() {
      const result = await axios.get("/api/profiles");
      setProfiles(result.data);
    }
    getProfiles();
  }, []);

  return (
    <div className="App">
      <div className="flex flex-col space-y-100 items-center divide-y">
        {profiles.map((profile) => (
          <div key={`profile-${profile.id}`} className="px-5 py-14">
            <img
              className="rounded"
              width="500"
              height="500"
              src={profile.url}
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
