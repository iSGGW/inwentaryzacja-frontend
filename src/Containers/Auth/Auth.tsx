import React from "react";
import "./Auth.css";

function Auth() {
  return <div className="App">
    
    <header  className="App-header">
    <h1>Zaloguj się</h1>
    <form>
        <label>
          <p>Nazwa użytkownika</p>
          <input type="text"/>
        </label>
        <label>
          <p>Hasło</p>
          <input type="password"/>
        </label>
        <div>
          <button type="submit">Potwierdź</button>
        </div>
        <div>
          <button>Utwórz konto</button>
        </div>
    </form>

    </header>
  </div>;
}

export default Auth;
