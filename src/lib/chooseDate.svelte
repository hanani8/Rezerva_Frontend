<script>
    const url = import.meta.env.VITE_URL;

    export let limit;

    export let offset;

    import { getFetch } from "$lib/fetch";

    import {
        date,
        reservations,
        reservations_,
        walkins,
        waitlist,
        noOfReservations,
        noOfWalkIns,
        noOfWaitlists,
    } from "$lib/stores";

    async function dateUpdate(e) {
        $date = e.target.value;

        fetchReservations($date);

        fetchDashboardData($date);
    }

    async function fetchReservations(arg) {
        const data = await getFetch(
            `${url}/api/reservations/${arg}/?limit=${limit}&offset=${offset}`
        );

        if (data) {
            $reservations = data.data["reservations"];

            let dividedReservations = divideReservations($reservations);

            $reservations_ = dividedReservations.reservations_;

            $walkins = dividedReservations.walkins;

            $waitlist = dividedReservations.waitlist;
        }
    }

    async function fetchDashboardData(arg) {
        const data = await getFetch(`${url}/api/dashboard/${arg}`);

        if (data) {
            $noOfReservations = data.data.reservations;

            $noOfWalkIns = data.data.walkIns;

            $noOfWaitlists = data.data.waitlists;
        }
    }

    function divideReservations(reservations) {
        let reservations_ = [];

        let walkins = [];

        let waitlist = [];

        for (let i = 0; i < reservations.length; i++) {
            let type = reservations[i].type;

            let status = reservations[i].status;

            if (status === 1) {
                waitlist.push(reservations[i]);
            } else {
                if (type === 1) {
                    reservations_.push(reservations[i]);
                } else if (type === 2) {
                    walkins.push(reservations[i]);
                }
            }
        }

        return { reservations_, walkins, waitlist };
    }
</script>

<input
    type="date"
    class="h-10 w-full bg-white text-xl outline outline-2 outline-black md:h-12 lg:h-14"
    value={$date}
    on:change={dateUpdate}
/>
