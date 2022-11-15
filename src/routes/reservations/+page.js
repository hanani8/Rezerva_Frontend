const url = import.meta.env.VITE_URL;

import { redirect } from '@sveltejs/kit';

import { get } from "svelte/store";

import { date, auth } from "$lib/stores";

export async function load({fetch}) {

    let dateValue = get(date);

    const response = await fetch(`${url}/api/reservations/${dateValue}/?limit=0&offset=0`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if(data.message === "NOT_LOGGED_IN")
    {
        auth.set("NOT_LOGGED_IN");
        throw redirect(301, '/login');
    }

    return data;

}