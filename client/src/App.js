import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Signup from "./pages/Register/Signup";
import Signin from "./pages/Register/Signin";
import Problems from "./pages/Problems/Problems";
import ProblemDetail from "./pages/ProblemDetail/ProblemDetail";
// import NotFound from "./pages/NotFound/NotFound";

const App = () => {
  const [auth, setAuth] = React.useState(false);
  return (
    <>
      <Navbar auth={auth} setAuth={setAuth}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin setAuth={setAuth}/>} />
        <Route path="/problems/all" element={<Problems auth={auth} />} />
        <Route path="/problems/:slug" element={<ProblemDetail auth={auth} />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;