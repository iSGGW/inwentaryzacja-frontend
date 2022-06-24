import ReactDOM from "react-dom";
import App from "./App/App";
import { HashRouter } from "react-router-dom";

if (window.location.href === `${window.location.origin}/`) {
  window.location.href = "/inz/build";
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>,
  document.getElementById("root")
);
