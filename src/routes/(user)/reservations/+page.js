const url = import.meta.env.VITE_URL;

import { get } from "svelte/store";

import { date } from "$lib/stores";
import { authStore } from '../../../lib/stores/authStore';
import { redirect } from "@sveltejs/kit";
import { getFetch } from "$lib/fetch";


export async function load({ fetch }) {

    let authenticated = false;

    const unsubscribe = authStore.subscribe(user => {
        authenticated = user.authenticated;
    })

    if (!authenticated) {
        unsubscribe();
        throw redirect(301, "/login");
    }

    let dateValue = get(date);

    const data = await getFetch(`${url}/api/reservations/${dateValue}/?limit=0&offset=0`)

    unsubscribe();

    return data;

}