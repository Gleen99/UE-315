import React from "react";

const CopyShortcode = ({ handleCopy }) => {
  return (
    <div>
      <button
        style={{
          padding: "10px",
          backgroundColor: "#2271b1",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
        }}
        type="button"
        onClick={handleCopy}
      >
        Copier le shortcode
      </button>
    </div>
  );
};

export default CopyShortcode;
