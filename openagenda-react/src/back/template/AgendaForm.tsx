import React from "react";
import WidgetSelection from "./widgetSelection";
import CopyShortcode from "./CopyShortcode";
import AgendaSelection from "./AgendaSelection";
import FieldsSelection from "./FieldsSelection";
import { AgendaSelectionCategories } from "./AgendaSelectionCategories";
import LayoutSelection from "./LayoutSelection";
import AgendaUpcoming from "./AgendaUpcoming";
import LinkSelection from "./LinkSelection";
import PaginationSelection from "./PaginationSelection";

const styles: { [key: string]: React.CSSProperties } = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  title: { color: "#2271b1", marginBottom: "20px" },
  center: { color: "#2271b1", textAlign: "center" },
  code: {
    display: "block",
    padding: "10px",
    backgroundColor: "#fff",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    whiteSpace: "pre-wrap",
  },
  hr: { margin: "20px 0", borderColor: "#ccc" },
};

const AgendaForm = (props) => {
  const {
    handleShowAllEvents,
    handleShowWidget,
    showAllEvents,
    showWidget,
    response,
    handleCopy,
    agendas,
    selectedAgendaId,
    setSelectedAgendaId,
    selectedFields,
    handleFieldSelect,
    selectedPagination,
    setSelectedPagination,
    selectedUpcoming,
    setSelectedUpcoming,
    selectedLayout,
    selectedEventCount,
    link,
    setLink,
    selectedCategories,
    setSelectedCategories,
    handleLayoutSelect,
    handleEventCountSelect,
    selectedEventsPerColumn,
    handleEventsPerColumnSelect,
    selectedRowCount,
    handleRowCountSelect,
  } = props;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        Veuillez choisir le générateur de shortcode à ajouter:{" "}
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <WidgetSelection
          {...{
            handleShowAllEvents,
            handleShowWidget,
            showAllEvents,
            showWidget,
          }}
        />
      </div>
      {showAllEvents && (
        <AllEventsSection
          {...{
            response,
            handleCopy,
            agendas,
            selectedAgendaId,
            setSelectedAgendaId,
            selectedFields,
            handleFieldSelect,
            selectedPagination,
            setSelectedPagination,
            selectedUpcoming,
            setSelectedUpcoming,
          }}
        />
      )}
      {showWidget && (
        <WidgetSection
          {...{
            response,
            handleCopy,
            selectedAgendaId,
            setSelectedCategories,
            selectedCategories,
            link,
            setLink,
            selectedLayout,
            handleLayoutSelect,
            handleEventCountSelect,
            selectedEventsPerColumn,
            handleEventsPerColumnSelect,
            selectedRowCount,
            handleRowCountSelect,
            selectedEventCount,
          }}
        />
      )}
    </div>
  );
};

const AllEventsSection = (props) => {
  const {
    response,
    handleCopy,
    agendas,
    selectedAgendaId,
    setSelectedAgendaId,
    selectedFields,
    handleFieldSelect,
    selectedPagination,
    setSelectedPagination,
    selectedUpcoming,
    setSelectedUpcoming,
  } = props;
  return (
    <>
      <h1 style={styles.center}>
        Générateur de shortcode pour tous les évènements
      </h1>
      <ResponseBlock response={response} handleCopy={handleCopy} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 0 25%" }}>
          {" "}
          <AgendaSelection
            {...{
              agendas,
              selectedAgendaId,
              onAgendaSelect: setSelectedAgendaId,
            }}
          />
        </div>
        <div style={{ flex: "1 0 25%" }}>
          {" "}
          <FieldsSelection
            {...{ selectedFields, onFieldSelect: handleFieldSelect }}
          />
        </div>
        <div style={{ flex: "1 0 25%" }}>
          {" "}
          <PaginationSelection
            {...{
              selectedPagination,
              onPaginationSelect: setSelectedPagination,
            }}
          />
          <AgendaUpcoming
            {...{ selectedUpcoming, onUpcomingSelect: setSelectedUpcoming }}
          />
        </div>
      </div>
    </>
  );
};

const WidgetSection = (props) => {
  const {
    response,
    handleCopy,
    selectedAgendaId,
    setSelectedCategories,
    selectedCategories,
    link,
    setLink,
    selectedLayout,
    handleLayoutSelect,
    handleEventCountSelect,
    selectedEventsPerColumn,
    handleEventsPerColumnSelect,
    selectedRowCount,
    handleRowCountSelect,
    selectedEventCount,
  } = props;
  return (
    <>
      <h1 style={styles.center}>Générateur de shortcode pour le widget</h1>
      <ResponseBlock response={response} handleCopy={handleCopy} />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <div style={{ flex: "1 0 25%" }}>
          {" "}
          {selectedAgendaId && (
            <AgendaSelectionCategories
              {...{
                selectedAgendaId,
                onCategorySelect: setSelectedCategories,
                selectedCategories,
              }}
            />
          )}
        </div>
        <div style={{ flex: "1 0 25%" }}>
          {" "}
          <LinkSelection {...{ link, setLink }} />
        </div>
        <div style={{ flex: "1 0 25%" }}>
          {" "}
          <LayoutSelection
            {...{
              selectedLayout,
              onLayoutSelect: handleLayoutSelect,
              onEventCountSelect: handleEventCountSelect,
              selectedEventsPerColumn,
              onEventsPerColumnSelect: handleEventsPerColumnSelect,
              selectedRowCount,
              onRowCountSelect: handleRowCountSelect,
              selectedEventCount,
            }}
          />
        </div>
      </div>
    </>
  );
};

const ResponseBlock = ({ response, handleCopy }) =>
  response && (
    <div style={{ flex: "1 0 100%" }}>
      <p style={{ fontWeight: "bold" }}>Shortcode:</p>
      <code style={styles.code}>{response}</code>
      {response && <CopyShortcode handleCopy={handleCopy} />}
      <hr style={styles.hr} />
    </div>
  );

export default AgendaForm;
