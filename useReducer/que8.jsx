import React, { useReducer } from "react";

const initialState = { isVisible: false };

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { isVisible: !state.isVisible };
    default:
      return state;
  }
}

function ToggleVisibility() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <button onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}>
        Toggle Message
      </button>

      {state.isVisible && <p style={{ marginTop: 20 }}>Hello, World!</p>}
    </div>
  );
}

export default ToggleVisibility;
