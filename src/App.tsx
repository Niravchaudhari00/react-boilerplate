import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Routes from "./routes/routes";
import { RootState } from "./store/store";

function App() {
  const location = window.location;

  const { isToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isToken && location.pathname === "/login") {
      console.log("back history is not working ");
    }
  }, [location, isToken]);

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
