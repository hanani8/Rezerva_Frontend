<script>

import { date } from "../stores/date";

import { url } from "../stores/url.js";


import { reservations, upcomingReservations, pastReservations, noOfReservations, noOfWalkIns } from "../stores/reservations.js";


async function dateUpdate(e) {
    $date = e.target.value;

    fetchReservations($date);

    fetchDashboardData($date);


}

async function fetchReservations(arg) {
    const res = await fetch(
        `${$url}/api/reservations/${arg}`,
        {
            method: "GET",
            credentials: "include",
        }
    );

    const response = await res.json();

    $reservations = response.data['reservations'];

    let dividedReservations = divideReservations($reservations);

    $pastReservations = dividedReservations.pastReservations;

    $upcomingReservations = dividedReservations.upcomingReservations;
}

async function fetchDashboardData(arg)
{
    const res = await fetch(
                `${$url}/api/dashboard/${arg}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const response = await res.json();

            $noOfReservations = response.data.reservations;

            $noOfWalkIns = response.data.walkIns;
}

function divideReservations(reservations) {
        let now = new Date();

        let pastReservations = [];

        let upcomingReservations = [];

        for(let i = 0; i < reservations.length; i++) {
            let reservation_time = new Date(reservations[i].reservation_time);

            if(reservation_time >= now) 
            {
                upcomingReservations.push(reservations[i]);
            } else 
            {
                pastReservations.push(reservations[i]);
            }

        }

        return {pastReservations, upcomingReservations};
    }


</script>

<input type="date" class="h-10 bg-white text-xl outline outline-2 w-full outline-black md:h-12 lg:h-14" value = {$date} on:change="{dateUpdate}">
