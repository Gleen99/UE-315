import React, { useEffect, useState } from "react";
import { IEvent } from "../../../../back/components/types/Types";
import { useAgendaEvents } from "../../../../back/components/api";
import { Box, Grid, Dialog, Card } from "@mui/material";
import { EventDisplay } from "../TemplateEventDisplay/EventDisplay";
import { LoadingIndicator } from "../../../../back/components/LoadingIndicator";
import { EventDisplayHome } from "./EventDisplayHome";
import { Events } from "../../Filters/Events";
import EventDetails from "../TemplateEventDetail/EventDetail";

declare const OpenAgendaData;

export const EventHomeList = ({ search }: { search: IEvent[] }) => {
  const [isPaginated, setIsPaginated] = useState<boolean | null>(null);
  const [isLayoutGrid, setIsLayoutGrid] = useState<boolean | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [eventsPerColumn, setEventsPerColumn] = useState<number>(0);
  const [rowCount, setRowCount] = useState<number>(0);
  const [eventCount, setEventCount] = useState<number>();

  const handleAgendaSelection = (event: IEvent) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    if (OpenAgendaData) {
      setEventsPerColumn(parseInt(OpenAgendaData.eventspercolumn) || 0);
      setRowCount(parseInt(OpenAgendaData.rowcount) || 0);
      setEventCount(parseInt(OpenAgendaData.eventcount) || 0);
      setIsPaginated(OpenAgendaData.pagination !== "false");
      setIsLayoutGrid(OpenAgendaData.layout !== "false");
    }
  }, [OpenAgendaData]);

  const { data: events } = useAgendaEvents(
    "",
    "",
    "",
    "",
    selectedEvent?.uid,
    "",
    "",
    0,
    0,
    0,
    ""
  );

  const eventsForDisplay: any[] = search.flatMap((group) => group.events || []);

  return (
    <Box>
      {isLayoutGrid ? (
        rowCount && eventsPerColumn ? (
          <Grid
            container
            spacing={1}
            sx={{ display: "flex", alignItems: "stretch" }}
          >
            {Array.from({ length: rowCount }, (_, colIndex) =>
              eventsForDisplay
                .slice(
                  (colIndex * eventsPerColumn) / rowCount,
                  ((colIndex + 1) * eventsPerColumn) / rowCount
                )
                .map((event, eventIndex) => (
                  <Grid
                    item
                    key={`${eventIndex}-${colIndex}`}
                    xs={12}
                    sm={2 / rowCount}
                    md={3 / rowCount}
                    lg={12 / rowCount}
                    sx={{ display: "flex" }}
                    minWidth={200}
                  >
                    <EventDisplay
                      event={event}
                      onClick={() => handleAgendaSelection(event)}
                    />
                  </Grid>
                ))
            )}
          </Grid>
        ) : (
          <Events />
        )
      ) : (
        eventsForDisplay.slice(0, eventCount).map((event, index) => (
          <Card
            key={index}
            sx={{
              p: 1,
              margin: "auto",
              maxWidth: 430,
              flexGrow: 1,
              mt: 2,
              borderRadius: 0,
              boxShadow: 0,
            }}
          >
            <EventDisplayHome
              event={event}
              onClick={() => handleAgendaSelection(event)}
            />
          </Card>
        ))
      )}

      <Dialog
        open={drawerOpen}
        onClose={handleDrawerClose}
        fullWidth
        sx={{ maxWidth: "xs", mt: 2 }}
      >
        {events ? (
          <EventDetails search={events} onClose={handleDrawerClose} />
        ) : (
          <div onClick={handleDrawerClose}>
            <LoadingIndicator />
          </div>
        )}
      </Dialog>
    </Box>
  );
};
