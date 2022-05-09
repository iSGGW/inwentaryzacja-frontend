import "./Auth.css";
import sggwLogo from "./img/sggwLogo.svg";

function Auth() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={sggwLogo} className="auth-logo" />
        <h1>Logowanie</h1>
        <form>
          <label>
            <p>Nazwa użytkownika:</p>
            <input type="text" />
          </label>
          <label>
            <p>Hasło:</p>
            <input type="password" />
          </label>
          <div>
            <button id="btn-submit" type="submit">
              Potwierdź
            </button>
          </div>
        </form>
      </header>
    </div>
  );
}

export default Auth;
