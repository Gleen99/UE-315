import React, { useState } from "react";
import {
  Card,
} from "@mui/material";

import EventCards from "./EventCard";


const EventDetails = ({ search, onClose }) => {
  return (
    <Card
      sx={{
        maxWidth: "md",
        padding: "1em",
        maxHeight: "500px",
        overflowY: "scroll",
      }}
    >
      {search.map((eventsGroup: any, groupIndex: number) => (
        <EventCards key={groupIndex} eventsGroup={eventsGroup} onClose={onClose} />
      ))}
    </Card>
  );
};

export default EventDetails;
