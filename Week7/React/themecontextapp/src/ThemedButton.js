import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

function ThemedButton() {

  const theme = useContext(ThemeContext);

  const style = {
    padding: "15px",
    border: "1px solid black",
    backgroundColor: theme === "dark" ? "black" : "white",
    color: theme === "dark" ? "white" : "black"
  };

  return (
    <button style={style}>
      Current Theme : {theme}
    </button>
  );
}

export default ThemedButton;