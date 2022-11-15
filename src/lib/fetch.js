import { auth } from "$lib/stores";

import { goto } from "$app/navigation";

export async function getFetch(url)
{
    const response = await fetch(url, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    if (data.message === "NOT_LOGGED_IN" && url.endsWith("/api/isloggedin") == false) {
        auth.set("NOT_LOGGED_IN");
        goto("/login");
        return;
    }

    return data;
}


export async function postFetch(url, formData)
{
    const response = await fetch(url, {
        method: "POST",
        credentials: "include",

        body: formData,
    });

    const data = await response.json();

    if (data.message === "NOT_LOGGED_IN") {
        auth.set("NOT_LOGGED_IN");
        goto("/login");
        return;
    }

    return data;
}

export async function patchFetch(url, formData)
{
    const response = await fetch(url, {
        method: "PATCH",
        credentials: "include",

        body: formData,
    });

    const data = await response.json();

    if (data.message === "NOT_LOGGED_IN") {
        auth.set("NOT_LOGGED_IN");
        goto("/login");
        return;
    }

    return data;
}