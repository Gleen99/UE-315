import useSWR from "swr";
import { Agenda,  IEvent } from "./types/Types";
import { useState } from "react";

declare const WPURLS;
declare let OpenAgendaData;

declare global {
  interface Window {
    wpApiSettings: any;
  }
}

const searchUrl = (url: string) =>
  fetch(`${WPURLS.siteurl}/?rest_route=${url}`).then((r) => r.json());

const postData = (url, data = {}) =>
  fetch(`${WPURLS.siteurl}/?rest_route=${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((r) => r.json());

const useDataFetcher = (url, transformer, fetcher = searchUrl) => {
  const { data, error } = useSWR(url, fetcher, { errorRetryCount: 1 });
  return {
    data: data ? transformer(data) : undefined,
    isLoading: !data && !error,
    error,
  };
};

export const useAgendas = () =>
  useDataFetcher(`/openagenda/agendas`, (data) => data?.agendas as Agenda[]);

const useEvents = (data, endpoint, selectedAgendaId?) => {
  let url;

  if (typeof OpenAgendaData === "undefined" || !OpenAgendaData.id) {
    url = `/openagenda/id/${selectedAgendaId}/events/${endpoint}`;
  } else {
    url = `/openagenda/id/${OpenAgendaData.id}/events/${endpoint}`;
  }

  const { data: responseData, error } = useSWR(
    url,
    (url) => postData(url, data),
    { errorRetryCount: 1 }
  );


  return {
    data: responseData ? (Object.values(responseData) as IEvent[]) : undefined,
    isLoading: !responseData && !error,
    error,
  };
};

export const useAgendaEvents = (
  keyword,
  oaq,
  timeframe,
  categories,
  setSelectedEventUid,
  setIsPaginated,
  setIsLayout,
  setEventsPerColumn,
  rowCount,
  setEventCount,
  selectedAgendaId,
 
) => {
  let fields;
  let relative;

  if (typeof OpenAgendaData !== "undefined" && OpenAgendaData.fields) {
    fields = OpenAgendaData.fields;
  } else {
    fields = "categories";
  }
  
  if (typeof OpenAgendaData !== "undefined" && OpenAgendaData.relative) {
    relative = OpenAgendaData.relative;
  } else {
    null
  }  
  const data = {
    keyword,
    oaq,
    timeframe,
    categories,
    uid: setSelectedEventUid,
    pagination: setIsPaginated,
    layout: setIsLayout,
    rowCount: rowCount,
    eventsPerColumn: setEventsPerColumn,
    eventCount: setEventCount,
    fields,
   relative,
  };

  const endpoint = `includeFields=${encodeURIComponent(fields)}
  &keyword=${encodeURIComponent(keyword)}&oaq=${encodeURIComponent(
    oaq
  )}&timeframe=${encodeURIComponent(timeframe)}&uid=${encodeURIComponent(
    setSelectedEventUid
  )}&categories=${encodeURIComponent(
    categories
  )}&pagination=${encodeURIComponent(
    setIsPaginated
  )}&layout=${encodeURIComponent(setIsLayout)}&rowCount=${encodeURIComponent(
    rowCount
  )}&eventsPerColumn=${encodeURIComponent(
    setEventsPerColumn
  )}&eventCount=${encodeURIComponent(setEventCount)}
  &relative=${encodeURIComponent(relative)}
  `;

  return useEvents(data, endpoint, selectedAgendaId);
};
export const useAgendaEventsCat = (
  keyword,
  oaq,
  timeframe,
  setSelectedEventUid,
  setIsPaginated,
  setIsLayout,
  setEventsPerColumn,
  rowCount,
  setEventCount,
  selectedAgendaId,
) => {
  let fields;
  let categories

  if (typeof OpenAgendaData !== "undefined" && OpenAgendaData.fields) {
    fields = OpenAgendaData.fields;
  } else {
    fields = "categories";
  }
  if (typeof OpenAgendaData !== "undefined" && OpenAgendaData.categories) {
    categories = OpenAgendaData.categories;
  } else {
categories = [null] }
  const data = {
    keyword,
    oaq,
    timeframe,
    categories,
    uid: setSelectedEventUid,
    pagination: setIsPaginated,
    layout: setIsLayout,
    rowCount: rowCount,
    eventsPerColumn: setEventsPerColumn,
    eventCount: setEventCount,
    fields,
  };

  const endpoint = `includeFields=${encodeURIComponent(fields)}&keyword=${encodeURIComponent(keyword)}&oaq=${encodeURIComponent(
    oaq
  )}&timeframe=${encodeURIComponent(timeframe)}&uid=${encodeURIComponent(
    setSelectedEventUid
  )}&categories=${encodeURIComponent(
    categories
  )}&pagination=${encodeURIComponent(
    setIsPaginated
  )}&layout=${encodeURIComponent(setIsLayout)}&rowCount=${encodeURIComponent(
    rowCount
  )}&eventsPerColumn=${encodeURIComponent(
    setEventsPerColumn
  )}&eventCount=${encodeURIComponent(setEventCount)}
  `;

  return useEvents(data, endpoint, selectedAgendaId);
};

 
//updateOptions
export const updateOptions = async (data) => {
  const nonce = window.wpApiSettings.nonce;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WP-Nonce": nonce,
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(
      `/?rest_route=/openagenda/v1/updateoptions`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponse = await response.json();
    return apiResponse;
  } catch (error) {
    return error;
  }
};

// getOptions
export const getOptions = async () => {
  try {
    const response = await fetch(`/?rest_route=/openagenda/v1/getoptions`);
    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};
