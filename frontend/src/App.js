import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Form from "./pages/Form.js";
import Dice from "./pages/Dice/Dice.js";
import CreateProfile from "./pages/CreateProfile/CreateProfile.js";
import ProfilePage from "./pages/ProfilePage/ProfilePage.js";
import Header from "./components/Header.js";
import Login from "./pages/Login/Login.js";
import { useAuthContext } from "./hooks/useAuthContext.js";

function App() {
  const { profile } = useAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={profile ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!profile ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/create"
              element={!profile ? <CreateProfile /> : <Navigate to="/" />}
            />
            <Route path="/form" element={<Form />} />
            <Route path="/dice" element={<Dice />} />
            <Route path="/page" element={<ProfilePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
