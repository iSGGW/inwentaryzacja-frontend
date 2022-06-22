import ReactDOM from "react-dom";
import App from "./App/App";
import { BrowserRouter as Router } from "react-router-dom";

if (window.location.href === `${window.location.origin}/`) {
  window.location.href = "/inz/build";
}

ReactDOM.render(
  <Router basename={"inz/build"}>
    <App />
  </Router>,
  document.getElementById("root")
);
