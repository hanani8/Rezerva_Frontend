export const ssr = false;
import "../app.css";

const url = import.meta.env.VITE_URL;

export async function load({ fetch }) {

    const response = await fetch(
        `${url}/api/restaurant`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const data = await response.json();

    return data;

}
