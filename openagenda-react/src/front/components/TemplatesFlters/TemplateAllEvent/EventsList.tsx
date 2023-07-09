import React, { useState, useEffect, createRef } from 'react';
import { IEvent } from '../../../../back/components/types/Types';
import { useAgendaEvents } from '../../../../back/components/api';
import { Box, Grid, Dialog, Typography, Divider } from '@mui/material';
import { EventDisplay } from '../TemplateEventDisplay/EventDisplay';
import { LoadingIndicator } from '../../../../back/components/LoadingIndicator';
import { EventsPagination } from '../../Pagination/EventsPagination';
import EventDetails from '../TemplateEventDetail/EventDetail';

declare const OpenAgendaData;
export const EventsList = ({ search }: { search: IEvent[] }) => {
  const [isPaginated, setIsPaginated] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const eventDisplayRef = createRef<HTMLDivElement>();
  const eventsPerPage = 12;
  const { data: events } = useAgendaEvents('', '', '', '', selectedEvent?.uid, '', '', 0, 0, 0, '');

  useEffect(() => {
    const isPaginationEnabled = OpenAgendaData.pagination !== 'false';
    setIsPaginated(isPaginationEnabled);
  }, []);

  useEffect(() => {
    if (eventDisplayRef.current) {
      window.scrollTo({
        top: eventDisplayRef.current.offsetTop - 150,
        behavior: 'smooth'
      });
    }
  }, [currentPage]);

  const handleAgendaSelection = (event: IEvent) => {
    setSelectedEvent(event);
    setDrawerOpen(true);
  };

  const totalEvents = search.reduce((sum, eventsGroup) => sum + (eventsGroup.events?.length || 0), 0);
  const totalPages = isPaginated ? Math.ceil(totalEvents / eventsPerPage) : 1;
  const startIndex = (currentPage - 1) * eventsPerPage;
  const endIndex = currentPage * eventsPerPage;

  const eventsForCurrentPage: any[]= isPaginated
    ? search.flatMap((group) => group.events || []).slice(startIndex, endIndex)
    : search.flatMap((group) => group.events || []);

  return (
    <Box ref={eventDisplayRef}>
      {totalEvents > 0 && (
        <Typography
          sx={{ margin: '1em 0' }}
          color='grey'
          p='2'
        >
          {!isPaginated ? `Affichage de tous les événements (${totalEvents} au total)` :
            `Affichage des événements ${startIndex + 1} à ${Math.min(endIndex, totalEvents)} sur ${totalEvents} au total`}
        </Typography>
      )}
      <Divider sx={{ margin: '1em 0' }} />

      <Grid container spacing={1} sx={{ display: 'flex', alignItems: 'stretch' }}>
        {eventsForCurrentPage.map((event: IEvent, index: number) => (
          <Grid item xs={12} sm={2} md={3} minWidth={200} key={index} sx={{ display: 'flex' }}>
            <EventDisplay
              event={event}
              onClick={() => handleAgendaSelection(event)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={drawerOpen} onClose={() => setDrawerOpen(false)} fullWidth sx={{ maxWidth: 'xs' }}>
        {events ? <EventDetails search={events} onClose={() => setDrawerOpen(false)} />
          : <LoadingIndicator />}
      </Dialog>

      {isPaginated && totalPages > 1 &&
        <EventsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      }
    </Box>
  );
};
