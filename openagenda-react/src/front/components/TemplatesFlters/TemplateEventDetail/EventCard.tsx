import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Button,
  CardHeader,
  Divider,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkIcon from "@mui/icons-material/Link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccessibleIcon from "@mui/icons-material/Accessible";
import { IEvent } from "../../../../back/components/types/Types";

const accessibilityMapping = {
  pi: "Accessible aux handicapés psychiques",
  ii: "Accessible aux déficients intellectuels",
  hi: "Accessible aux handicapés auditifs",
  vi: "Accessible aux handicapés visuels",
  mi: "Accessible aux handicapés moteurs",
};

const EventCards = ({ eventsGroup, onClose }) => {
  return (
    <>
      {eventsGroup.events?.map((event: IEvent, eventIndex: number) => (
        <SingleEventCard
          key={eventIndex}
          event={event}
          onClose={onClose}
        />
      ))}
    </>
  );
};

const SingleEventCard = ({ event, onClose }) => {
  const [showAllTimings, setShowAllTimings] = useState(false);
  const [showAllRegistration, setShowAllRegistration] = useState(false);
  const theme = useTheme();

  const trueKeys = event.accessibility
    ? Object.keys(event.accessibility).filter(
        (key) => event.accessibility[key]
      )
    : [];

  return (
    <Card sx={{ margin: "2rem 0" }}>
      <Box display="flex" justifyContent="flex-end">
        <IconButton
          className="text-primary"
          aria-label="settings"
          onClick={onClose}
          sx={{ marginTop: "2px" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CardHeader
          title={
            <Typography
              sx={{
                fontSize: "26px",
                letterSpacing: "-1px",
                fontWeight: "normal",
              }}
            >
              {event.title && event.title.fr}
            </Typography>
          }
          subheader={
            <Typography variant="body1" sx={{ mt: 4 }}>
              {event.description && event.description.fr}
            </Typography>
          }
        />

        {event.image && event.image.base && event.image.filename ? (
          <CardMedia
            component="img"
            sx={{ width: "200px", margin: "0rem 1rem" }}
            image={`${event.image.base}${event.image.filename}`}
            alt="Event"
          />
        ) : null}
      </Box>
      <CardContent>
        <Typography variant="h6">
          {event.keywords && event.keywords.fr
            ? event.keywords.fr.join(", ")
            : ""}{" "}
        </Typography>
        <br />
        <Typography variant="body1">
          <ReactMarkdown>
            {event.longDescription && event.longDescription.fr}
          </ReactMarkdown>
        </Typography>
        <Divider
          className="bg-primary"
          sx={{
            margin: "1em 0",
            borderWidth: "2px",
          }}
        />

        <Box sx={{ mt: 2 }}>
          {event.timings
            ?.slice(0, showAllTimings ? undefined : 3)
            .map((timing, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                <EventIcon className="text-primary" sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {new Date(timing.begin).toLocaleDateString("fr-FR")} -{" "}
                  {new Date(timing.end).toLocaleDateString("fr-FR")}
                </Typography>
              </Box>
            ))}

          {event.timings && event.timings.length > 3 && (
            <Typography
              variant="body1"
              onClick={() => setShowAllTimings(!showAllTimings)}
              className="cursor-pointer"
              sx={{ mt: 1, color: theme.palette.primary.main }}
            >
              {showAllTimings ? "Voir moins" : "Voir plus"}
            </Typography>
          )}

          {event.location && event.location.address && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mt: 1,
              }}
            >
              <LocationOnIcon className="text-primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {event.location.address}
              </Typography>
            </Box>
          )}

          {event.conditions && event.conditions.fr && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                mt: 1,
              }}
            >
              <EuroSymbolIcon className="text-primary" sx={{ mr: 1 }} />
              <Typography variant="body1">{event.conditions.fr}</Typography>
            </Box>
          )}

          {event.age && (event.age.min || event.age.max) && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <PersonIcon className="text-primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {event.age.min} - {event.age.max}
              </Typography>
            </Box>
          )}

          {trueKeys.length > 0 && (
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <AccessibleIcon className="text-primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {trueKeys.map((key) => accessibilityMapping[key]).join(", ")}
              </Typography>
            </Box>
          )}

          <Divider
            className="bg-primary"
            sx={{
              margin: "1em 0",
              borderWidth: "2px",
            }}
          />

          {event.registration
            ?.slice(0, showAllRegistration ? undefined : 2)
            .map((registration, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  mt: 1,
                }}
              >
                {registration.type === "phone" && (
                  <PhoneIcon className="text-primary" sx={{ mr: 1 }} />
                )}
                {registration.type === "link" && (
                  <>
                    <LinkIcon className="text-primary" sx={{ mr:1 }} />
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => <span {...props} />,
                      }}
                    >
                      {registration.value}
                    </ReactMarkdown>
                  </>
                )}
                {registration.type === "email" && (
                  <>
                    <AlternateEmailIcon
                      className="text-primary"
                      sx={{ mr: 1 }}
                    />
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({ node, ...props }) => <span {...props} />,
                      }}
                    >
                      {registration.value}
                    </ReactMarkdown>
                  </>
                )}
                {registration.type !== "link" && registration.type !== "email" && (
                  <Typography variant="body1">{registration.value}</Typography>
                )}
              </Box>
            ))}

          {!showAllRegistration && event.registration?.length > 2 && (
            <Button
              className="text-primary"
              onClick={() => setShowAllRegistration(true)}
              font-Size="14px"
            >
              Voir plus d'infos
            </Button>
          )}

          {showAllRegistration && (
            <Button
              className="text-primary"
              onClick={() => setShowAllRegistration(false)}
              font-Size="14px"
            >
              Voir moins
            </Button>
          )}
        </Box>
      </CardContent>{" "}
    </Card>
  );
};

export default EventCards;
export { SingleEventCard };
