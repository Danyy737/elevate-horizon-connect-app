import { events } from './events';

export async function fetchEvents() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events);
    }, 1000);
  });
}