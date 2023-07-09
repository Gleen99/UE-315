import React from "react";
import { Agenda } from "../components/types/Types";

const AgendaSelection = ({ selectedAgendaId, agendas, onAgendaSelect }) => {
  return (
    <>
      <h2 style={{ color: "#2271b1", marginBottom: "20px" }}>
        Veuillez choisir l'agenda <br /> que vous souhaitez afficher:{" "}
      </h2>
      <ul>
        {agendas?.map((agenda: Agenda) => (
          <li key={agenda.id}>
            <label>
              <input
                type="radio"
                checked={selectedAgendaId === agenda.id}
                onChange={(event) =>
                  onAgendaSelect(agenda.id, event.target.checked)
                }
              />
              {agenda.title}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AgendaSelection;
