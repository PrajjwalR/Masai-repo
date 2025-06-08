import React, { useReducer } from "react";

const initialState = {
  email: "",
  password: "",
  submitted: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "submit":
      return { ...state, submitted: true };
    case "reset":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
}

function FormWithReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "submit" });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label><br />
          <input
            id="email"
            type="email"
            value={state.email}
            onChange={(e) =>
              dispatch({ type: "email", payload: e.target.value })
            }
            required
          />
        </div>

        <div style={{ marginTop: 10 }}>
          <label htmlFor="password">Password:</label><br />
          <input
            id="password"
            type="password"
            value={state.password}
            onChange={(e) =>
              dispatch({ type: "password", payload: e.target.value })
            }
            required
          />
        </div>

        <div style={{ marginTop: 15 }}>
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={handleReset}
            style={{ marginLeft: 10 }}
          >
            Reset
          </button>
        </div>
      </form>

      <div style={{ marginTop: 20 }}>
        {!state.submitted ? (
          <div>No details found</div>
        ) : (
          <div>
            <div>User Email: {state.email}</div>
            <div>User Password: {state.password}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormWithReducer;
