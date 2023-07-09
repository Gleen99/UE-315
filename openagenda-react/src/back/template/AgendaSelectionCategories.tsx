import React from "react";
import { Box } from "@mui/material";
import { useAgendaEvents } from "../components/api";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { IEvent } from "../components/types/Types";

interface Props {
  selectedAgendaId: number | null;
  onCategorySelect: React.Dispatch<React.SetStateAction<number[]>>;
  selectedCategories: number[];
}

const buttonStyle = {
  padding: "10px",
  backgroundColor: "#2271b1",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "4px",
  marginBottom: "10px",
};

export const AgendaSelectionCategories = ({
  selectedAgendaId,
  onCategorySelect,
  selectedCategories,
}: Props) => {
  const { data: events, isLoading: eventsLoading } = useAgendaEvents(
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    0,
    0,
    selectedAgendaId
  );

  const allCategoryIds = events
    ?.flatMap(
      (event) =>
        event.aggregations?.categories?.categories?.values.map(
          (category) => category.id
        ) ?? []
    )
    ?? [];

  const areAllCategoriesSelected = () =>
    selectedCategories.length === allCategoryIds.length;

  const toggleAllCategories = () => {
    if (areAllCategoriesSelected()) {
      onCategorySelect([]);
    } else {
      onCategorySelect(allCategoryIds);
    }
  };

  const handleCategorySelect = (categoryId: number, checked: boolean) => {
    onCategorySelect((prevCategories) => {
      if (checked) {
        return [...prevCategories, categoryId];
      } else {
        return prevCategories.filter((id) => id !== categoryId);
      }
    });
  };

  if (eventsLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <h2 style={{ color: "#2271b1", marginBottom: "20px" }}>
        Liste des catégories disponibles sur l'agenda sélectionné :
      </h2>
      <button style={buttonStyle} onClick={toggleAllCategories}>
        {areAllCategoriesSelected() ? "Tout désélectionner" : "Tout sélectionner"}
      </button>
      <div>
        {events?.map((event: IEvent) =>
          event.aggregations?.categories?.categories?.values?.map(
            (category, categoryIndex) => (
              <div key={categoryIndex}>
                <input
                  type="checkbox"
                  name={category.id.toString()}
                  checked={selectedCategories.includes(category.id)}
                  onChange={(event) =>
                    handleCategorySelect(category.id, event.target.checked)
                  }
                />
                <label>{`${category.label} (${category.eventCount})`}</label>
              </div>
            )
          )
        ) ?? <h5>Il n'y a pas de catégories.</h5>}
      </div>
    </Box>
  );
};
