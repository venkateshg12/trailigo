import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Home from "./pages/Home";
import WithHeaderLayOut from "./components/withHeaderLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicRoute";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<WithHeaderLayOut />}>
            <Route element={<PublicOnlyRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
            </Route>
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/create-trip" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;