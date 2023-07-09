import React from "react";
import { IEvent } from "../../../../back/components/types/Types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  useTheme,
} from "@mui/material";
import {
  EventDate,
  EventDescription,
  EventMedia,
  EventTitle,
  EventLocation,
} from "./EventFields";

interface IEventDisplayProps {
  event: IEvent;
  onClick: () => void;
}

export const EventDisplay: React.FC<IEventDisplayProps> = ({
  event,
  onClick,
}) => (
  <Card
    sx={{
      cursor: "pointer",
      flexGrow: 1,
    }}
    onClick={onClick}
  >
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <EventMedia event={event} />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <EventDate dateRange={event.dateRange} />
          <EventTitle title={event.title} />
          <EventDescription description={event.description} />
        </Box>
        <EventLocation location={event.location} />
      </CardContent>
    </Box>
  </Card>
);
