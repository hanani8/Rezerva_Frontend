import { redirect } from '@sveltejs/kit';

const url = import.meta.env.VITE_URL;

import { get } from "svelte/store";

import { date } from "$lib/stores";
import { authStore } from '../../lib/stores/authStore';
import { getFetch } from "$lib/fetch";

export async function load() {

    let authenticated = false;

    const unsubscribe = authStore.subscribe(user => {
        authenticated = user.authenticated;
    })

    if (!authenticated) {
        unsubscribe();
        throw redirect(301, '/login');
    }

    let dateValue = get(date);

    const results = await Promise.all([
        getFetch(`${url}/api/dashboard/${dateValue}`),

        getFetch(`${url}/api/reservations/${dateValue}/?limit=5&offset=0`)
    ])

    return { "dashboard": results[0], "reservations": results[1] };

}
