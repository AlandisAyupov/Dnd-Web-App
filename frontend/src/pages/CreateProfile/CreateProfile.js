import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import styles from "./CreateProfile.modules.css";

export default function CreateProfile() {
  const [file, setFile] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const { signup, error, isLoading } = useSignup();

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    await signup(file, username, email, password);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="main">
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <h3>Create Profile</h3>
        <div className="seperate">
          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="seperate">
          <label>Set Password:</label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="seperate">
          <label>Email:</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <input
          onChange={fileSelected}
          type="file"
          accept="image/*"
          className="file-input"
        ></input>
        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
