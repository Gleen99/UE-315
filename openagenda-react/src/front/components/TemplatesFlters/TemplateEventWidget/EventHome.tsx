import React, { useEffect, useState } from "react";
import { useAgendaEventsCat } from "../../../../back/components/api";
import { Box, Grid, Button } from "@mui/material";
import { EventHomeList } from "./EventHomeList";
import { Events } from "../../Filters/Events";
import { IEvent } from "../../../../back/components/types/Types";
import { LoadingIndicator } from "../../../../back/components/LoadingIndicator";

declare const OpenAgendaData;

interface AppProps {
  search: IEvent[];
}

export const EventHome = (search: AppProps) => {
  const [isPaginated, setIsPaginated] = useState<boolean | null>(true);
  const [isLayout, setIsLayout] = useState<boolean | null>(true);
  const [eventspercolumn, setEventsPerColumn] = useState<number>(0);
  const [rowcount, setRowCount] = useState<number>(0);
  const [eventcount, setEventCount] = useState<number>();

  const { data: events, isLoading: eventsLoading } = useAgendaEventsCat(
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    eventspercolumn * rowcount,
    0,
    0
  );

  useEffect(() => {
    if (OpenAgendaData) {
      setEventsPerColumn(parseInt(OpenAgendaData.eventspercolumn) || 0);
      setRowCount(parseInt(OpenAgendaData.rowcount) || 0);
      setEventCount(parseInt(OpenAgendaData.eventcount) || 0);

      setIsPaginated(OpenAgendaData.pagination !== "false");
      setIsLayout(OpenAgendaData.layout !== "false");
    }
  }, []);

  if (eventsLoading) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Box>
        {rowcount !== 0 || eventspercolumn !== 0 || eventcount !== 0 ? (
          <>
            {events && <EventHomeList search={events} />}
            <Grid item container direction="row" justifyContent="center">
              <Button
                variant="contained"
                className="bg-primary"
                onClick={() => (window.location.href = OpenAgendaData.links)}
                sx={{ mt: 2, fontSize: "0.875rem" }}
              >
                Voir tous les événements
              </Button>
            </Grid>
          </>
        ) : (
          <Events />
        )}
      </Box>
    </>
  );
};
