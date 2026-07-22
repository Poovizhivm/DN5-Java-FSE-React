import React from "react";
import ThemeContext from "./ThemeContext";
import Toolbar from "./Toolbar";

function App() {

  return (
    <ThemeContext.Provider value="dark">
      <div style={{ padding: "40px" }}>
        <h1>Theme Context Example</h1>

        <Toolbar />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;