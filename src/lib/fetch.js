import { auth } from "$lib/stores";

import { goto } from "$app/navigation";

import { authStore } from "./stores/authStore";

export async function getFetch(url, auth_url = "/login") {

    try {
        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
        });

        // If PHPSESSID expires
        if (response.status === 401) {
            authStore.logout();
            goto(auth_url);
            return
        }

        const data = await response.json();

        return data;

    } catch (e) {
        console.error(e);
    }

}


export async function postFetch(url, formData, auth_url = "/login") {
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",

        body: formData,
    });

    // If PHPSESSID expires

    if (response.status === 401) {
        authStore.logout();
        goto(auth_url);
        return;
    }

    const data = await response.json();

    if (data.message === "NOT_LOGGED_IN") {
        auth.set("NOT_LOGGED_IN");
        goto("/login");
        return;
    }

    return data;
}

export async function patchFetch(url, formData, auth_url = "/login") {
    const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",

        body: formData,
    });

    // If PHPSESSID expires

    if (response.status === 401) {
        authStore.logout();
        goto(auth_url);
        return
    }

    const data = await response.json();

    if (data.message === "NOT_LOGGED_IN") {
        auth.set("NOT_LOGGED_IN");
        goto("/login");
        return;
    }

    return data;
}