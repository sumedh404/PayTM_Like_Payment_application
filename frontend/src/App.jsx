

import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Signup} from "./Pages/Signup";
import {Signin} from "./Pages/Signin";
import {SendMoney} from "./Pages/SendMoney";
import {Dashboard} from "./Pages/Dashboard";

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup/>} />
    <Route path="/signin" element={<Signin/>} />
    <Route path="/send" element={<SendMoney/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
