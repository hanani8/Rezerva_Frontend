<script>
    // Card Component

    import Card from "$lib/card.svelte";

    // Date Component

    import ChooseDate from "$lib/chooseDate.svelte";

    // Filter Component

    import Filter from "./filter.svelte";

    // Property to check if the component is from dashboard or in the reservations page

    export let dashboard_reservations;

    // Stores

    import {
        reservations,
        reservations_,
        walkins,
        waitlist,
        filter,
    } from "$lib/stores";

    // Data from Load function

    export let RESERVATIONS;

    $reservations = RESERVATIONS;

    let dividedReservations = divideReservations($reservations);
    $reservations_ = dividedReservations.reservations_;
    $walkins = dividedReservations.walkins;
    $waitlist = dividedReservations.waitlist;

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

<div>
    <!-- Dropdown of "What data to see?" -->
    {#if dashboard_reservations === "dashboard"}
        <ChooseDate limit={5} offset={0} />
    {:else if dashboard_reservations === "reservations"}
        <ChooseDate limit={0} offset={0} />
    {/if}

    {#if dashboard_reservations === "reservations"}
        <Filter />
    {/if}

    <div class="mx-3 my-3 flex flex-col gap-3 overflow-auto">
        {#if $filter === "4"}
            {#each $reservations as reservation}
                <Card {reservation} />
            {/each}
        {:else if $filter === "1"}
            {#each $reservations_ as reservation}
                <Card {reservation} />
            {/each}
        {:else if $filter === "2"}
            {#each $walkins as reservation}
                <Card {reservation} />
            {/each}
        {:else if $filter === "3"}
            {#each $waitlist as reservation}
                <Card {reservation} />
            {/each}
        {/if}
    </div>
</div>
