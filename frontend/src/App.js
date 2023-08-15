import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.js";
import Form from "./pages/Form.js";
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
