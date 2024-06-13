import { BrowserRouter } from "react-router-dom";
import Router from "./services/routes";
// import "./App.css";

// const queryClient = new QueryClient();

function App() {
  return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  );
}

export default App;
