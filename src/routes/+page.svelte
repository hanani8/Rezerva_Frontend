<script>
    import { onMount } from "svelte";
    import add from "../assets/add.svg";

    import ChooseDate from "../lib/chooseDate.svelte";

    import { noOfReservations, noOfWalkIns } from "../stores/reservations.js";

    import { date } from "../stores/date.js";


    onMount(async () => {
            const res = await fetch(
                `http://localhost:5000/api/dashboard/${$date}`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            const response = await res.json();

            $noOfReservations = response.data.reservations;

            $noOfWalkIns = response.data.walkIns;

        });

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
    <ChooseDate />
    <!-- Dashboard Stats -->
    <div class="mt-10 flex flex-col items-center gap-9">
        <!-- Reservations -->
        <div
            class="h:6 flex w-3/4 flex-row justify-evenly outline outline-2 outline-black md:h-8 lg:h-10"
        >
            <span class="my-auto text-xl font-medium"> Reservations </span>
            <span class="my-auto text-3xl font-bold"> { $noOfReservations } </span>
        </div>

        <!-- Walk-Ins -->
        <div
            class="h:6 flex w-3/4 flex-row justify-evenly outline outline-2 outline-black md:h-8 lg:h-10"
        >
            <span class="my-auto text-xl font-medium"> Walk-Ins </span>
            <span class="my-auto text-3xl font-bold"> { $noOfWalkIns } </span>
        </div>

        <!-- Repeat Guests
        <div
            class="h:6 flex w-3/4 flex-row justify-evenly outline outline-2 outline-black md:h-8 lg:h-10"
        >
            <span class="my-auto text-xl font-medium"> Repeat Guests </span>
            <span class="my-auto text-3xl font-bold"> 5 </span>
        </div> -->

        <a href="/add">
            <img
                class="md:64 bottom-0 h-48 rounded-full outline outline-4 outline-black lg:h-96"
                src={add}
                alt="Add Icon"
            />
        </a>
    </div>
</div>
