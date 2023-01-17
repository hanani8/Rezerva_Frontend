import { writable } from 'svelte/store';

// Store for tracking authentication of user. Possible States: LOGGED_IN, NOT_LOGGED_IN

export const auth = writable();


// Today's Date

const today_date = new Date().toISOString().split("T")[0];

// Store to be used in chooseDate.svelte

export const date = writable(today_date);

// Store for all the reservations of particular date. To be used in reservations.svelte and chooseDate.svelte

export const reservations = writable([]);

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

export const filter = writable("1");

// Store the restaurantName

export const restaurantName = writable("");

// Store the restaurantLocation

// export const restaurantLocation = writable("");

let restaurant_location = writable("")

import { getFetch } from "$lib/fetch";
import { browser } from "$app/environment"
const url = import.meta.env.VITE_URL;

if (browser) {
    const restaurantID = localStorage.getItem("restaurant_id");

    const data = await getFetch(`${url}/api/restaurant/${restaurantID}`);

    if (data.message == "READ_RESTAURANT_SUCCEEDED") {
        // restaurantName = data.data["restaurant"]["restaurant_name"];
        restaurant_location = writable(data.data["restaurant"]["location"]);
    }
}

export const restaurantLocation = {
    subscribe: restaurant_location.subscribe
}
