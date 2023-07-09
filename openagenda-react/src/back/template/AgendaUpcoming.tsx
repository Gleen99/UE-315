import React from "react";

const AgendaUpcoming = ({ selectedUpcoming, onUpcomingSelect }) => {
  const handleUpcomingChange = (e) => {
    onUpcomingSelect(e.target.value);
  };

  return (
    <div>
      <h2 style={{ color: "#2271b1", marginBottom: "20px" }}>
        Choisissez si vous souhaitez inclure
        <br />
        les événements passés:
      </h2>
      <ul>
        <li>
          <label>
            <input
              type="radio"
              value="passed_upcoming_current"
              checked={selectedUpcoming === "passed_upcoming_current"}
              onChange={handleUpcomingChange}
            />
            Inclure les événements passés
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              value="upcoming_current"
              checked={selectedUpcoming === "upcoming_current"}
              onChange={handleUpcomingChange}
            />
            Je ne souhaite pas inclure les événements passés{" "}
          </label>
        </li>
      </ul>
    </div>
  );
};

export default AgendaUpcoming;
