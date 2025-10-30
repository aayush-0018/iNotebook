import { React, useState } from "react";
import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  const updateAlert = (msgSend, typeSend) => {
    setAlert({ msg: msgSend, type: typeSend });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert} />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home updateAlert={updateAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route
              exact
              path="/login"
              element={<Login updateAlert={updateAlert} />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup updateAlert={updateAlert} />}
            />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
