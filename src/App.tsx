import Home from "./pages/Home";
import Yes from "./pages/Yes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/yes" element={<Yes />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
