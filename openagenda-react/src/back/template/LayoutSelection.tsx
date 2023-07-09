import React from "react";

const LayoutSelection = ({
  selectedLayout,
  onLayoutSelect,
  selectedEventCount,
  onEventCountSelect,
  selectedEventsPerColumn,
  onEventsPerColumnSelect,
  selectedRowCount,
  onRowCountSelect,
}) => {
  const layoutOptions = {
    colonne: "true",
    liste: "false",
  };

  const handleLayoutChange = (e) => {
    const layout = e.target.value;
    onLayoutSelect(layout);
  };

  const handleEventCountChange = (e) => {
    const count = parseInt(e.target.value);
    onEventCountSelect(count);
  };

  const handleEventsPerColumnChange = (e) => {
    const count = parseInt(e.target.value);
    onEventsPerColumnSelect(count);
  };

  const handleEventsRowCountChange = (e) => {
    const count = parseInt(e.target.value);
    onRowCountSelect(count);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#2271b1", marginBottom: "20px" }}>
        {" "}
        Choisissez si vous souhaitez
        <br />
        afficher en colonne ou en liste:
      </h2>
      <ul>
        {Object.entries(layoutOptions).map(([key, value]) => (
          <li value={value} key={value}>
            <label style={{ display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                value={value}
                checked={selectedLayout === value}
                onChange={handleLayoutChange}
                style={{ marginRight: "5px" }}
              />
              {key}
            </label>
          </li>
        ))}
      </ul>
      {selectedLayout === "false" && (
        <div style={{ margin: "10px 0" }}>
          <label>Nombre d'événements à afficher: </label>
          <input
            type="number"
            value={selectedEventCount}
            onChange={handleEventCountChange}
            style={{ marginLeft: "10px" }}
          />
        </div>
      )}
      {selectedLayout === "true" && (
        <div>
          <div style={{ margin: "10px 0" }}>
            <label>Nombre de colonnes: </label>
            <input
              type="number"
              value={selectedRowCount}
              onChange={handleEventsRowCountChange}
              style={{ marginLeft: "10px" }}
            />
          </div>
          <div style={{ margin: "10px 0" }}>
            <label>Nombre d'événements à afficher: </label>
            <input
              type="number"
              value={selectedEventsPerColumn}
              onChange={handleEventsPerColumnChange}
              style={{ marginLeft: "10px" }}
            />
          </div>

          <div>
            <i>
              <strong>
                Le nombre d'événements à afficher doit être un multiple du
                nombre de colonnes.
              </strong>
            </i>
          </div>
        </div>
      )}
    </div>
  );
};

export default LayoutSelection;
