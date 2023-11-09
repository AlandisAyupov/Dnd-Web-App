import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import styles from "./Login.modules.css";

export default function CreateProfile() {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logged in.");
    await login(email, password);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="login" onSubmit={handleSubmit}>
        <h3>Log In</h3>

        <label>Email address:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading}>Log in</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
