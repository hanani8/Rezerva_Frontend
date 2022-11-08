import { redirect } from '@sveltejs/kit';

const url = import.meta.env.VITE_URL;

import { get } from "svelte/store";

import { date, auth } from "$lib/stores";

export async function load({ fetch }) {

    let dateValue = get(date);

    const response = await fetch(
        `${url}/api/dashboard/${dateValue}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const response_1 = await fetch(`${url}/api/reservations/${dateValue}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    const data_1 = response_1.json();

    if(data.message === "NOT_LOGGED_IN" || data_1.message === "NOT_LOGGED_IN")
    {
        auth.set("NOT_LOGGED_IN");
        throw redirect(301, '/login');
    }

    return {"dashboard": data, "reservations": data_1};

}
