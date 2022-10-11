import { readable } from 'svelte/store';

let URL = "http://localhost:5000";

export const url = readable(URL);