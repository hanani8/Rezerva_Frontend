<script>
    import add from "../assets/add.svg";

    import ChooseDate from "$lib/chooseDate.svelte";

    import {
        noOfReservations,
        noOfWalkIns,
        noOfWaitlists,
        filter,
    } from "$lib/stores";
    import Reservations from "../lib/reservations.svelte";

    export let data;

    $noOfReservations = data["dashboard"].data.reservations;

    $noOfWalkIns = data["dashboard"].data.walkIns;

    $noOfWaitlists = data["dashboard"].data.waitlists;
</script>

<!-- Made the container occupy the whole screen, and flex-shrinked it in the layout page -->

<div class="container h-full">
    <!-- Dropdown of "What data to see?" -->
    <!-- <select
        name="of"
        id="of"
        class="h-10 bg-white text-xl outline outline-2 w-full outline-black md:h-12 lg:h-14"
    >
        <option>Today</option>
        <option>Yesterday</option>
        <option>Tomorrow</option>
    </select> -->
    <!-- <ChooseDate /> -->
    <!-- Dashboard Stats -->
    <!-- <div class="mt-10 flex flex-col items-center gap-9"> -->
    <!-- Reservations -->
    <!-- <div
            class="h:6 flex w-3/4 flex-row justify-evenly outline outline-2 outline-black md:h-8 lg:h-10"
        >
            <span class="my-auto text-xl font-medium"> Reservations </span>
            <span class="my-auto text-3xl font-bold"> { $noOfReservations } </span>
        </div> -->

    <!-- Walk-Ins -->
    <!-- <div
            class="h:6 flex w-3/4 flex-row justify-evenly outline outline-2 outline-black md:h-8 lg:h-10"
        >
            <span class="my-auto text-xl font-medium"> Walk-Ins </span>
            <span class="my-auto text-3xl font-bold"> { $noOfWalkIns } </span>
        </div> -->

    <!-- Repeat Guests
        <div
            class="h:6 flex w-3/4 flex-row justify-evenly outline outline-2 outline-black md:h-8 lg:h-10"
        >
            <span class="my-auto text-xl font-medium"> Repeat Guests </span>
            <span class="my-auto text-3xl font-bold"> 5 </span>
        </div> -->

    <!-- <a href="/add">
            <img
                class="md:64 bottom-0 h-48 rounded-full outline outline-4 outline-black lg:h-96"
                src={add}
                alt="Add Icon"
            />
        </a> -->

    <!-- </div> -->
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
            dashboard_reservations = {"dashboard"}
            RESERVATIONS={data["reservations"].data["reservations"]}
        />

        <a href="/reservations" class="mb-2 w-1/2 self-center rounded-md bg-black px-2 py-2">
            <button
                class="text-lg text-white outline outline-white w-full"
            >
                Show More
            </button>
        </a>
    </div>
</div>
