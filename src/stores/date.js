import { writable } from 'svelte/store';

let today_date = new Date().toISOString().split("T")[0];

export const date = writable(today_date);