const url = import.meta.env.VITE_URL;

import { redirect } from '@sveltejs/kit';

import { auth } from "$lib/stores";

export async function load({fetch, params}) {

    const id = params.slug;

    const response = await fetch(`${url}/api/reservation/${id}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if(data.message === "NOT_LOGGED_IN")
    {
        auth.set("NOT_LOGGED_IN");
        throw redirect(301, '/login');
    }

    data.id = id;

    return data;

}