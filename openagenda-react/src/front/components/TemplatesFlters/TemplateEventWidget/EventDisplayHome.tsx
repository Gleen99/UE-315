import React from "react";
import { IEvent } from "../../../../back/components/types/Types";
import {  Grid, Avatar } from "@mui/material";
import { Info } from "@mui-treasury/components/info";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";
import { EventDate, EventDescription, EventLocation, EventMedia, EventTitle, Root } from "./EventFields";


export const EventDisplayHome = ({ event, onClick }: { event: IEvent, onClick: () => void }) => {
    const avatarStyles = useDynamicAvatarStyles({ width: "25%", height: "73%" });

    return (
        <Root>
            <Grid container spacing={1} style={{ display: "flex" }}>
                <Grid item xs={12} sm container style={{ cursor: "pointer" }} onClick={onClick}>
                    {event.image && (
                        <Avatar variant="rounded" style={{ cursor: "pointer", backgroundColor: "transparent", marginRight: "5px", marginTop: "15px" }} classes={avatarStyles}>
                            <EventMedia event={event} />
                        </Avatar>
                    )}
                    <Info>
                        <EventTitle title={event.title} />
                        <EventDescription description={event.description} />
                        <EventDate dateRange={event.dateRange} />
                    </Info>
                </Grid>
                <Grid item xs={12}>
                    <EventLocation location={event.location} />
                </Grid>
            </Grid>
        </Root>
    );
};
