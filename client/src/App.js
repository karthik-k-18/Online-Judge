import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
// import Signin from "./pages/Signin/Signin";
import Problems from "./pages/Problems/Problems";
import ProblemDetail from "./pages/ProblemDetail/ProblemDetail";
// import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/signin" element={<Signin />} /> */}
        <Route path="/problems" element={<Problems />} />
        <Route path="/problems/:slug" element={<ProblemDetail />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;