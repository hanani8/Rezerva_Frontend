import { writable } from 'svelte/store';

import { readable } from 'svelte/store';

// Store for tracking authentication of user. Possible States: LOGGED_IN, NOT_LOGGED_IN

export const auth = writable();

// Today's Date

const today_date = new Date().toISOString().split("T")[0];

// Store to be used in chooseDate.svelte

export const date = writable(today_date);

// Store for all the reservations of particular date. To be used in reservations.svelte and chooseDate.svelte

export const reservations = writable([]);

// Store for all the past reservations of particular date. To be used in reservations.svelte and chooseDate.svelte

// export const pastReservations = writable([]);

// Store for all the upcoming reservations of particular date. To be used in reservations.svelte and chooseDate.svelte

// export const upcomingReservations = writable([]);

// Store for all the reservations of particular date. To be used in reservations.svelte and chooseDate.svelte

export const reservations_ = writable([]);

// Store for all the walkins of particular date. To be used in reservations.svelte and chooseDate.svelte

export const walkins = writable([]);

// Store for all the reservations in waitlist of particular date. To be used in reservations.svelte and chooseDate.svelte

export const waitlist = writable([]);

// Store for the number of reservations of particular date. To be used in dashboard.svelte and chooseDate.svelte

export const noOfReservations = writable(0);

// Store for the number of walk-ins of particular date. To be used in dashboard.svelte and chooseDate.svelte

export const noOfWalkIns = writable(0);

// Store for the number of waitlists of particular date. To be used in dashboard.svelte and chooseDate.svelte

export const noOfWaitlists = writable(0);

// Store for the filter in reservations.svelte.

export const filter = writable("4");


// // Boolean for DEV environment

// const DEV = import.meta.env.DEV;

// // Boolean for PROD enviroment

// const PROD = import.meta.env.PROD;

// let URL;

// if(PROD == true && DEV == false)
// {   
//     URL = "https://cheesecakehq.com";
// }
// else if(PROD == false && DEV == true)
// {
//     URL = "http://localhost:5000"
// }

// // Store for URL. To be used for making fetch requests.

// export const url = readable(URL);   

