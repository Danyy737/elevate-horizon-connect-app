const EVENTS_API_URL = 'https://c4-mobile-api.tafeit.com/events';

export async function fetchEvents() {
  const response = await fetch(EVENTS_API_URL);

  if (!response.ok) {
    throw new Error('Unable to fetch events');
  }

  return response.json();
}