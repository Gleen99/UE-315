import React from "react";
import { TextField, Button } from "@mui/material";

function LinkSelection({ link, setLink }) {
  return (
    <div>
      <h2 style={{ color: "#2271b1", marginBottom: "20px" }}>
        Ajouter l'URL de la page de tous les évènements:{" "}
      </h2>

      <form>
        <TextField
          value={link}
          onChange={(e) => setLink(e.target.value)}
          variant="outlined"
          style={{ width: "70%" }}
        />
      </form>
    </div>
  );
}

export default LinkSelection;
