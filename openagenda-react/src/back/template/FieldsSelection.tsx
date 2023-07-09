import React from "react";

const FieldsSelection = ({ selectedFields, onFieldSelect }) => {
  const fieldNames = {
    title: "Titre de l'évènement à venir",
    description: "Brève description de l'évènement",
    longDescription: "Description complète et détaillée de l'évènement",
    dateRange: "Dates de début et de fin de l'évènement",
    location: "Adresse ou lieu de l'évènement",
    categories: "Catégories associées à l'évènement (ex. musique, arts, sport)",
    image: "Image ou photo représentant l'évènement",
    price: "Coût pour participer à l'évènement",
    uid: "Identifiant unique de l'évènement",
    conditions: "Conditions particulières pour participer à l'évènement",
    timings: "Heures de début et de fin de l'évènement chaque jour",
    age: "Âge minimal requis pour participer à l'évènement",
    registration: "Détails sur le processus d'inscription à l'évènement",
    keywords: "Mots-clés qui représentent le mieux l'évènement",
    accessibility:
      "Un événement ayant une installation prévue pour les personnes malvoyantes",
  };

  const handleFieldSelection = (field, checked) => {
    if ((field === "uid" || field === "categories") && !checked) {
      return;
    }
    onFieldSelect(field, checked);
  };

  const allFieldsSelected = Object.keys(fieldNames).every((field) =>
    selectedFields.includes(field)
  );

  const handleSelectOrDeselectAll = () => {
    const fieldsToToggle = Object.keys(fieldNames).filter(
      (field) => field !== "uid" && field !== "categories"
    );

    if (allFieldsSelected) {
      fieldsToToggle.forEach((field) => {
        onFieldSelect(field, false);
      });
    } else {
      fieldsToToggle.forEach((field) => {
        onFieldSelect(field, true);
      });
    }
  };

  return (
    <div>
      <h2 style={{ color: "#2271b1", marginBottom: "20px" }}>
        Veuillez choisir les champs <br />
        que vous souhaitez afficher:
      </h2>
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
        onClick={handleSelectOrDeselectAll}
      >
        {allFieldsSelected ? "Tout Désélectionner" : "Tout Sélectionner"}
      </button>
      <ul>
        {Object.keys(fieldNames).map((field) => (
          <li key={field}>
            <label
              style={
                field === "uid" || field === "categories"
                  ? { color: "grey" }
                  : undefined
              }
            >
              <input
                type="checkbox"
                checked={selectedFields.includes(field)}
                onChange={(event) =>
                  handleFieldSelection(field, event.target.checked)
                }
                disabled={field === "uid" || field === "categories"}
              />
              {field === "uid" || field === "categories" ? "* " : null}
              {fieldNames[field]}
            </label>
          </li>
        ))}
      </ul>{" "}
    </div>
  );
};

export default FieldsSelection;
