import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Form from "./pages/Form.js";
import Dice from "./pages/Dice/Dice.js";
import CreateProfile from "./pages/CreateProfile/CreateProfile.js";
import ProfilePage from "./pages/ProfilePage/ProfilePage.js";
import Header from "./components/Header.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form" element={<Form />} />
            <Route path="/dice" element={<Dice />} />
            <Route path="/create" element={<CreateProfile />} />
            <Route path="/profiles" element={<ProfilePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
