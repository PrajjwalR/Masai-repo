import React, { useReducer } from "react";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: ""
      }
    },
    state: "",
    coordinates: {
      latitude: "",
      longitude: ""
    }
  },
  courses_offered: [""],
  error: null,
  submitted: false,
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
        error: null,
      };

    case "UPDATE_ADDRESS":
      return {
        ...state,
        address: {
          ...state.address,
          [action.payload.key]: action.payload.value,
        },
        error: null,
      };

    case "UPDATE_CITY":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            [action.payload.key]: action.payload.value,
          },
        },
        error: null,
      };

    case "UPDATE_LOCALITY":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              [action.payload.key]: action.payload.value,
            },
          },
        },
        error: null,
      };

    case "UPDATE_COORDINATES":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            ...state.address.coordinates,
            [action.payload.key]: action.payload.value,
          },
        },
        error: null,
      };

    case "UPDATE_COURSES":
      return {
        ...state,
        courses_offered: [...action.payload],
        error: null,
      };

    case "SUBMIT":
      return {
        ...state,
        submitted: true,
        error: null,
      };

    case "reset":
      return initialState;

    default:
      return {
        ...state,
        error: "invalid action type",
      };
  }
}

export default function CollegeForm() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleInputChange = (e, type, parent = null, subParent = null) => {
    const { name, value } = e.target;
    const payload = { key: name, value };

    if (type === "root") {
      dispatch({ type: "UPDATE_FIELD", payload });
    } else if (type === "address") {
      dispatch({ type: "UPDATE_ADDRESS", payload });
    } else if (type === "city") {
      dispatch({ type: "UPDATE_CITY", payload });
    } else if (type === "locality") {
      dispatch({ type: "UPDATE_LOCALITY", payload });
    } else if (type === "coordinates") {
      dispatch({ type: "UPDATE_COORDINATES", payload });
    }
  };

  const handleCoursesChange = (e) => {
    const courses = e.target.value.split(",").map((course) => course.trim());
    dispatch({ type: "UPDATE_COURSES", payload: courses });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT" });
  };

  const handleReset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div style={{ padding: "20px", maxWidth: 600, margin: "auto" }}>
      <h2>College Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="College Name"
          value={state.name}
          onChange={(e) => handleInputChange(e, "root")}
        />
        <br />
        <input
          name="establishment_year"
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) => handleInputChange(e, "root")}
        />
        <br />
        <input
          name="building"
          placeholder="Building"
          value={state.address.building}
          onChange={(e) => handleInputChange(e, "address")}
        />
        <br />
        <input
          name="street"
          placeholder="Street"
          value={state.address.street}
          onChange={(e) => handleInputChange(e, "address")}
        />
        <br />
        <input
          name="name"
          placeholder="City"
          value={state.address.city.name}
          onChange={(e) => handleInputChange(e, "city")}
        />
        <br />
        <input
          name="pinCode"
          placeholder="Pincode"
          value={state.address.city.locality.pinCode}
          onChange={(e) => handleInputChange(e, "locality")}
        />
        <br />
        <input
          name="landmark"
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) => handleInputChange(e, "locality")}
        />
        <br />
        <input
          name="state"
          placeholder="State"
          value={state.address.state}
          onChange={(e) => handleInputChange(e, "address")}
        />
        <br />
        <input
          name="latitude"
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) => handleInputChange(e, "coordinates")}
        />
        <br />
        <input
          name="longitude"
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) => handleInputChange(e, "coordinates")}
        />
        <br />
        <input
          name="courses"
          placeholder="Courses (comma separated)"
          value={state.courses_offered.join(", ")}
          onChange={handleCoursesChange}
        />
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset} style={{ marginLeft: 10 }}>
          Reset
        </button>
      </form>

      {state.error && <div style={{ color: "red" }}>{state.error}</div>}

      {state.submitted && !state.error && (
        <div style={{ marginTop: "20px" }}>
          <h3>College Details:</h3>
          <div>College Name: {state.name}</div>
          <div>Establishment Year: {state.establishment_year}</div>
          <div>Building: {state.address.building}</div>
          <div>Street: {state.address.street}</div>
          <div>City: {state.address.city.name}</div>
          <div>Pincode: {state.address.city.locality.pinCode}</div>
          <div>Landmark: {state.address.city.locality.landmark}</div>
          <div>State: {state.address.state}</div>
          <div>Latitude: {state.address.coordinates.latitude}</div>
          <div>Longitude: {state.address.coordinates.longitude}</div>
          <div>
            Courses Offered:{" "}
            {state.courses_offered.map((c, idx) => (
              <span key={idx}>{c}{idx < state.courses_offered.length - 1 ? ", " : ""}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
