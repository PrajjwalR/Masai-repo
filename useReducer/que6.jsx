import React, { useReducer } from "react";

const initialState = {
  theme: "light",
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        theme: state.theme === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const appStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: state.theme === "light" ? "#f5f5f5" : "#333",
    color: state.theme === "light" ? "#333" : "#f5f5f5",
    transition: "all 0.3s ease",
  };

  return (
    <div style={appStyle}>
      <h1>Current Theme: {state.theme}</h1>
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle Theme
      </button>
    </div>
  );
}

export default App;
