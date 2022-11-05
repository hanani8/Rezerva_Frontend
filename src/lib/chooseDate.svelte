<script>
    const url = import.meta.env.VITE_URL;

    import { getFetch } from "$lib/fetch";

    import {
        date,
        reservations,
        upcomingReservations,
        pastReservations,
        noOfReservations,
        noOfWalkIns,
    } from "$lib/stores";

    async function dateUpdate(e) {
        $date = e.target.value;

        fetchReservations($date);

        fetchDashboardData($date);
    }

    async function fetchReservations(arg) {
        const data = await getFetch(`${url}/api/reservations/${arg}`);

        if (data) {
            $reservations = data.data["reservations"];

            let dividedReservations = divideReservations($reservations);

            $pastReservations = dividedReservations.pastReservations;

            $upcomingReservations = dividedReservations.upcomingReservations;
        }
    }

    async function fetchDashboardData(arg) {
        const data = await getFetch(`${url}/api/dashboard/${arg}`);

        if (data) {
            $noOfReservations = data.data.reservations;

            $noOfWalkIns = data.data.walkIns;
        }
    }

    function divideReservations(reservations) {
        let now = new Date();

        let pastReservations = [];

        let upcomingReservations = [];

        for (let i = 0; i < reservations.length; i++) {
            let reservation_time = new Date(reservations[i].reservation_time);

            if (reservation_time >= now) {
                upcomingReservations.push(reservations[i]);
            } else {
                pastReservations.push(reservations[i]);
            }
        }

        return { pastReservations, upcomingReservations };
    }
</script>

<input
    type="date"
    class="h-10 w-full bg-white text-xl outline outline-2 outline-black md:h-12 lg:h-14"
    value={$date}
    on:change={dateUpdate}
/>
