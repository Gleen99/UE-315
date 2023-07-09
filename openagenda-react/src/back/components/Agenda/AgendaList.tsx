import React, { useEffect, useState } from "react";
import { getOptions, updateOptions, useAgendaEvents, useAgendas } from "../api";
import { LoadingIndicator } from "../LoadingIndicator";
import AgendaForm from "../../template/AgendaForm";

const AgendaList: React.FC = () => {
  const { data: agendas, isLoading: agendasLoading } = useAgendas();

  const [response, setResponse] = useState("");
  const [selectedAgendaId, setSelectedAgendaId] = useState<number | null>(null);
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "uid",
    "categories",
  ]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedPagination, setSelectedPagination] = useState("true");
  const [selectedLayout, setSelectedLayout] = useState("true");
  const [selectedUpcoming, setSelectedUpcoming] = useState("");
  const [selectedEventCount, setSelectedEventCount] = useState(5);
  const [selectedEventsPerColumn, setSelectedEventsPerColumn] = useState(6);
  const [selectedRowCount, setSelectedRowCount] = useState(3);
  const [link, setLink] = useState("");
  const [showAllEvents, setShowAllEvents] = useState(true);
  const [showWidget, setShowWidget] = useState(false);

  const handleFieldSelect = (field: string, checked: boolean) => {
    setSelectedFields((prevFields) =>
      checked
        ? !prevFields.includes(field)
          ? [...prevFields, field]
          : prevFields
        : prevFields.filter((item) => item !== field)
    );
  };

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const data = {
      response,
      selectedFields,
      selectedPagination,
      selectedUpcoming,
      selectedAgendaId,
      selectedLayout,
      selectedEventCount,
      selectedEventsPerColumn,
      selectedRowCount,
      link,
      selectedCategories,
    };

    await updateOptions(data);

    if (
      !selectedFields.includes("uid") ||
      !selectedFields.includes("categories")
    ) {
      alert(
        "Veuillez sélectionner les champs UID et Catégories dans Champs sélectionnés."
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(response);
      alert("Texte copié dans le presse-papiers");
    } catch (error) {}
  };

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const defaultOptions = await getOptions();
        setSelectedFields(defaultOptions.selectedFields || []);
        setSelectedPagination(defaultOptions.selectedPagination || "");
        setSelectedUpcoming(defaultOptions.selectedUpcoming || "");
        setSelectedAgendaId(defaultOptions.selectedAgendaId || null);
        setSelectedLayout(defaultOptions.selectedLayout || "");
        setSelectedEventsPerColumn(defaultOptions.selectedEventsPerColumn || 6);
        setSelectedRowCount(defaultOptions.selectedRowCount || 3);
        setSelectedEventCount(defaultOptions.selectedEventCount || 5);
        setLink(defaultOptions.link || "");
        setSelectedCategories(defaultOptions.selectedCategories || []);
      } catch (error) {
        console.error("Error fetching default options", error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    setSelectedCategories([]);
  }, [selectedAgendaId]);

  useEffect(() => {
    const uniqueFields = Array.from(new Set(selectedFields));
    const uniqueCategoryIds = Array.from(new Set(selectedCategories));

    const baseResponse = `[ul_openagenda id=${selectedAgendaId} fields=${uniqueFields} relative=${selectedUpcoming}`;
    const layoutDependentResponse =
      selectedLayout === "true"
        ? `categories=${uniqueCategoryIds} rowCount=${selectedRowCount} eventsPerColumn=${selectedEventsPerColumn}`
        : `categories=${uniqueCategoryIds} eventCount=${selectedEventCount}`;

    setResponse(
      showWidget
        ? `${baseResponse} layout=${selectedLayout} ${layoutDependentResponse} links=${link}]`
        : `${baseResponse} pagination=${selectedPagination}]`
    );
  }, [
    showWidget,
    selectedFields,
    selectedPagination,
    selectedUpcoming,
    selectedAgendaId,
    selectedEventsPerColumn,
    selectedRowCount,
    selectedEventCount,
    selectedLayout,
    link,
    selectedCategories,
  ]);

  const handleShowAllEvents = () => {
    setShowAllEvents(true);
    setShowWidget(false);
  };

  const handleShowWidget = () => {
    setShowWidget(true);
    setShowAllEvents(false);
  };

  return (
    <div>
      {agendasLoading ? (
        <LoadingIndicator />
      ) : (
        <AgendaForm
          handleShowAllEvents={handleShowAllEvents}
          handleShowWidget={handleShowWidget}
          showAllEvents={showAllEvents}
          showWidget={showWidget}
          response={response}
          handleCopy={handleCopy}
          agendas={agendas}
          selectedAgendaId={selectedAgendaId}
          setSelectedAgendaId={setSelectedAgendaId}
          selectedFields={selectedFields}
          handleFieldSelect={handleFieldSelect}
          selectedPagination={selectedPagination}
          setSelectedPagination={setSelectedPagination}
          selectedUpcoming={selectedUpcoming}
          setSelectedUpcoming={setSelectedUpcoming}
          selectedLayout={selectedLayout}
          selectedEventCount={selectedEventCount}
          selectedEventsPerColumn={selectedEventsPerColumn}
          selectedRowCount={selectedRowCount}
          link={link}
          setLink={setLink}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          handleLayoutSelect={setSelectedLayout}
          handleEventCountSelect={setSelectedEventCount}
          handleEventsPerColumnSelect={setSelectedEventsPerColumn}
          handleRowCountSelect={setSelectedRowCount}
        />
      )}
    </div>
  );
};

export default AgendaList;
