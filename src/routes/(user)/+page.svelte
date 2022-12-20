<script>
    import {
        noOfReservations,
        noOfWalkIns,
        noOfWaitlists,
        filter,
    } from "$lib/stores";

    import Reservations from "$lib/reservations.svelte";

    export let data;

    $noOfReservations = data["dashboard"].data.reservations;

    $noOfWalkIns = data["dashboard"].data.walkIns;

    $noOfWaitlists = data["dashboard"].data.waitlists;
</script>

<!-- Made the container occupy the whole screen, and flex-shrinked it in the layout page -->

<div class="container h-full">
    <div class="flex w-full flex-col gap-8">
        <div class="mt-8 flex w-full flex-row justify-center">
            <a class="h-8 w-4/6" href="/add">
                <button class="h-full w-full rounded-md bg-neutral-800">
                    <span class="text-sm font-normal text-white">
                        Start Booking
                    </span>
                </button>
            </a>
        </div>
        <hr class="w-5/6 self-center" />
        <div class="flex w-full flex-row justify-center gap-3">
            <div
                on:click={() => {
                    $filter = "1";
                }}
                class="space-evenly flex h-24 w-24 flex-col items-center justify-center border bg-neutral-800"
            >
                <span class="text-5xl text-white">{$noOfReservations}</span>
                <br />
                <span class="text-sm text-white">Reservations</span>
            </div>
            <div
                on:click={() => {
                    $filter = "2";
                }}
                class="space-evenly flex h-24 w-24 flex-col items-center justify-center border bg-neutral-800"
            >
                <span class="text-5xl text-white">{$noOfWalkIns}</span>
                <br />
                <span class="text-sm text-white">Walk-Ins</span>
            </div>
            <div
                on:click={() => {
                    $filter = "3";
                }}
                class="space-evenly flex h-24 w-24 flex-col items-center justify-center border bg-neutral-800"
            >
                <span class="text-5xl text-white">{$noOfWaitlists}</span>
                <br />
                <span class="text-sm text-white">Waitlist</span>
            </div>
            <div
                class="space-evenly flex h-24 w-24 flex-col items-center justify-center border bg-neutral-800"
            >
                <span class="text-5xl text-white">13</span>
                <br />
                <span class="text-sm text-white">Empty Seats</span>
            </div>
        </div>

        <Reservations
            dashboard_reservations={"dashboard"}
            RESERVATIONS={data["reservations"].data["reservations"]}
        />

        <a
            href="/reservations"
            class="mb-2 w-1/2 self-center rounded-md bg-black px-2 py-2"
        >
            <button class="w-full text-lg text-white outline outline-white">
                Show More
            </button>
        </a>
    </div>
</div>
