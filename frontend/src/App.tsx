import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import WithHeaderLayOut from "./components/withHeaderLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<WithHeaderLayOut />}>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/create-trip" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;