import React from "react";

const WidgetSelection = ({ handleShowAllEvents, handleShowWidget, showAllEvents, showWidget }) => {
  return (
    <div>
      <button
        type="button"
        onClick={handleShowAllEvents}
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: showAllEvents ? "#4CAF50" : "#008CBA",
          color: "white",
          cursor: "pointer",
          border: "none",
          borderRadius: "4px",
        }}
      >
            Pour afficher tous les événements
      </button>

      <button
        type="button"
        onClick={handleShowWidget}
        style={{
          margin: "10px",
          padding: "10px",
          backgroundColor: showWidget ? "#4CAF50" : "#008CBA",
          color: "white",
          cursor: "pointer",
          border: "none",
          borderRadius: "4px",
        }}
      >
            Pour afficher le widget
      </button>
    </div>
  );
};

export default WidgetSelection;
