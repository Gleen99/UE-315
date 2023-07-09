import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  useTheme,
} from "@mui/material";
import { IEvent } from "../../../../back/components/types/Types";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const EventMedia = ({ event }: { event: IEvent }) =>
  event.image && (
    <CardMedia
      component="img"
      image={`${event.image.base}${event.image.filename}`}
      alt="Event"
    />
  );

export const EventDate = ({ dateRange }: { dateRange?: any }) => (
  <Box>
    <Typography variant="body1" display="block" gutterBottom>
      {dateRange?.fr}
    </Typography>
  </Box>
);

export const EventTitle = ({ title }: { title?: any }) => (
  <Typography variant="h5" title={title.fr} >
    {title?.fr.split(" ").length > 10
      ? `${title?.fr.split(" ").slice(0, 10).join(" ")} ...`
      : title?.fr}
  </Typography>
);

export const EventDescription = ({ description }: { description?: any }) => (
  <Typography>
    {description?.fr.split(" ").length > 10
      ? `${description?.fr.split(" ").slice(0, 10).join(" ")} ...`
      : description?.fr}
  </Typography>
);

export const EventLocation = ({ location }: { location?: any }) => {
  const theme = useTheme();
  return (
    location && (
      <Box sx={{ mt: 2, marginBottom: 2 }}>
        <Box display="flex" alignItems="center">
        <LocationOnIcon className="text-primary" />
          <Typography
            variant="body1"
            display="block"
            gutterBottom
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: 0, 
            }}
          >
            {location.name.split(" ").length > 4
              ? `${location.name.split(" ").slice(0, 4).join(" ")} ...`
              : location.name}
          </Typography>
        </Box>
      </Box>
    )
  );
};
