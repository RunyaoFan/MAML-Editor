import React from "react";
import EditorWindow from "./EditorWindow";
import "./App.css";
import Login from "./Login";
import View from "./View";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/editor" element={<EditorWindow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/view" element={<View />} />
          </Routes>
    </div>
    </Router>
  );
}

export default App;
