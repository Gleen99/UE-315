import React from "react";
import { IEvent } from "../../../../back/components/types/Types";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { CardMedia, Typography, Box, Grid, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Root = styled("div")({ paddingLeft: 0 });
export const EventMedia = ({ event }: { event: IEvent }) => event.image && (
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
    <Typography variant="h5" title={title.fr}>
        {title?.fr.split(" ").length > 3 ? `${title?.fr.split(" ").slice(0, 2).join(" ")} ...` : title?.fr}
    </Typography>
);

export const EventDescription = ({ description }: { description?: any }) => (
    <Typography>
        {description?.fr.split(" ").length > 4 ? `${description?.fr.split(" ").slice(0, 4).join(" ")} ...` : description?.fr}
    </Typography>
);

export const EventLocation = ({ location }: { location?: any }) =>
    location && (
        <Box sx={{ mt: 2, marginBottom: 2 }}>
            <Box display="flex" alignItems="center">
                <LocationOnIcon className="text-primary" />
                <Typography variant="body1" display="block" gutterBottom>
                    {location.name}
                </Typography>
            </Box>
        </Box>
    );
