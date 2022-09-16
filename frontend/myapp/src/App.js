import Home from "./Home";
import Registerandloginpage from "./Registerandloginpage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./Profile";
function App() {
  const arr = ["ab", "bc"];
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Registerandloginpage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
