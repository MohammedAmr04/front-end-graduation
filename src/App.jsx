import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import AppRoute from "./routes/AppRoute";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import useTrackActivity from "./hooks/useTrackActivity";

function App() {
  useTrackActivity();
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      <AppRoute />
    </>
  );
}

export default App;
