import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Container,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import {
  useAgendaEvents,
  useAgendaEventsCat,
} from "../../../back/components/api";
import { IEvent } from "../../../back/components/types/Types";
import { EventsList } from "../TemplatesFlters/TemplateAllEvent/EventsList";
import { LoadingIndicator } from "../../../back/components/LoadingIndicator";

export const Events = () => {
  const [query, setQuery] = useState("");
  const [oaq, setOaq] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [categorie, setCategorie] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [tempTimeframe, setTempTimeframe] = useState("");
  const [date, setDate] = useState("");
  const [tempCategorie, setTempCategorie] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isDate, setIsDate] = useState(false);
  const [isPeriod, setIsPeriod] = useState(false);
  const [isTheme, setIsTheme] = useState(false);

  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeframeInputRef = useRef<HTMLSelectElement>(null);
  const themeInputRef = useRef<HTMLSelectElement>(null);

  const { data: events, isLoading: eventsLoading } = useAgendaEvents(
    query, oaq, timeframe, categorie, "", "", "", 0, 0, 0, undefined
  );
  const { data: eventsCat, isLoading: eventsCatLoading } = useAgendaEventsCat("", "", "", "", "", "", "", "", "", undefined);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      setQuery(inputValue);
      setIsSearch(true);
    }
    if (date !== "") {
      setOaq(date);
      setIsDate(true);
    }
    if (tempTimeframe !== "") {
      setTimeframe(tempTimeframe);
      setIsPeriod(true);
    }
    if (tempCategorie !== "") {
      setCategorie(tempCategorie);
      setIsTheme(true);
    }
  };

  const handleClear = () => {
    setQuery("");
    setOaq("");
    setDate("");
    setTimeframe("");
    setCategorie("");
    setInputValue("");
    setIsSearch(false);
    setIsDate(false);
    setIsPeriod(false);
    setIsTheme(false);
    setTempTimeframe("");
    setTempCategorie("");
    setCategorie("");
    if (dateInputRef.current) {
      dateInputRef.current.value = "";
    }
    if (timeframeInputRef.current) {
      timeframeInputRef.current.value = "";
    }
    if (themeInputRef.current) {
      themeInputRef.current.value = "";
    }
  };

  if (eventsLoading && eventsCatLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleSearch}>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="MOTS CLÉS"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
            <TextField
            sx={{ mt: 2 }}
              type="date"
              label="DATE"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
            />
          </Box>
        </form>
      </Grid>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleSearch}>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="period-label">PÉRIODE</InputLabel>
              <Select
                labelId="period-label"
                value={tempTimeframe}
                onChange={(e) => setTempTimeframe(e.target.value)}
                inputRef={timeframeInputRef}
                label="PÉRIODE"
              >
                <MenuItem value="">Sélectionner une période</MenuItem>
                <MenuItem value="this_week">Cette semaine</MenuItem>
                <MenuItem value="this_weekend">Ce weekend</MenuItem>
                <MenuItem value="this_month">Ce mois</MenuItem>
                <MenuItem value="next_month">Le mois prochain</MenuItem>
              </Select>
            </FormControl>
            <FormControl  sx={{ mt: 2 }} fullWidth>
                <InputLabel id="category-label">Thème</InputLabel>
                {eventsCat && (
                  <Select
                    labelId="category-label"
                    value={tempCategorie}
                    onChange={(e) => setTempCategorie(e.target.value)}
                    inputRef={themeInputRef}
                    label="Thème"
                  >
                    <MenuItem value="">Sélectionner une catégorie</MenuItem>
                    {eventsCat.map((event: IEvent, eventIndex: number) =>
                      event.aggregations.categories.categories?.values.map(
                        (category, categoryIndex) => (
                          <MenuItem key={categoryIndex} value={category.id}>
                            {category.label}
                          </MenuItem>
                        )
                      )
                    )}
                  </Select>
                )}
              </FormControl>
            </Box>
          </form>
        </Grid>
        <Grid item xs={12} sm={12} md={12} sx={{ marginBottom: 2 }}>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button variant="contained" type="submit" onClick={handleSearch} sx={{ mx: 1 }} className="bg-primary" font-size="0.875rem">Filtrer</Button>
            <Button variant="outlined" className="text-primary" onClick={handleClear} sx={{ mx: 1 }} font-size="0.875rem">Effacer</Button>
          </Box>
        </Grid>
        {events && events.every((eventObj) => eventObj.events.length === 0) ? (
          <Grid item xs={12}>
            <Typography variant="body1">Aucun événement n'a été trouvé pour les critères de recherche fournis.</Typography>
          </Grid>
        ) : (
          <Grid item xs={12}>
            {events && <EventsList search={events} />}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Events;
