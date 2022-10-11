import { writable } from 'svelte/store';

export const reservations = writable([]);
export const pastReservations = writable([]);
export const upcomingReservations = writable([]);
export const noOfReservations = writable([]);
export const noOfWalkIns = writable([]);

