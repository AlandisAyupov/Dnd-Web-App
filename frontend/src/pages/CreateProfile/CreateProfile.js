import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";

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
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <h3>Create Profile</h3>
        <label>Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <label>Set Password:</label>
        <input
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <label>Email:</label>
        <input
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
