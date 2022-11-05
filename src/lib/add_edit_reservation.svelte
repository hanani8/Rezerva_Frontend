<script>
    const url = import.meta.env.VITE_URL;

    import { getFetch, postFetch } from "$lib/fetch";

    // To check if called from /add or /edit/[slug]
    export let add_edit;

    // Reservation ID to edit. 0 in case of /add
    export let id = 0;

    import { goto } from "$app/navigation";

    import { onMount } from "svelte";

    const TODAY_DATE = new Date().toISOString().split("T")[0];

    // Variable to hold reservation data in case of add_edit === "edit"
    let reservation = {
        guest_name: "",
        no_of_guests: "",
        instructions: "",
        time: "",
        date: "",
        phone: "",
        status: "",
        type: "",
    };

    let status = 0;

    // Load Reservation Data to reservation variable in case add_edit === "edit"
    if (add_edit === "edit") {
        onMount(async () => {
            const data = await getFetch(`${url}/api/reservation/${id}`, "GET");

            if (data) {
                reservation = data.data.reservation;

                let date_time = reservation["reservation_time"].split(" ");
                reservation.date = date_time[0];
                let time = date_time[1].split("+");
                reservation.time = time[0];
                status = reservation["status"];
            }
        });
    }

    async function submit(e) {
        const inputData = {
            guest_name: document.getElementById("guest_name").value,
            no_of_guests: document.getElementById("no_of_guests").value,
            phone: document.getElementById("phone").value,
            instructions: document.getElementById("instructions").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            status: status,
            type: document.getElementById("type").value,
        };

        const formData = new FormData();

        for (let key in inputData) {
            formData.append(key, inputData[key]);
        }

        let URL;
        let method;

        if (add_edit === "add") {
            URL = `${url}/api/reservation`;
        } else if (add_edit === "edit") {
            URL = `${url}/api/reservation/${id}/edit`;
        }

        const data = await postFetch(URL, formData);

        if (data) {
            if (add_edit === "add") {
                goto("/");
            } else {
                goto("/reservations");
            }
        }
    }
</script>

<!-- A Common Component For Adding and Editing Reservation -->

<form
    on:submit|preventDefault={submit}
    class="container flex h-full flex-col items-center gap-7 py-8"
>
    <!-- Date -->
    <div class="flex w-3/4 flex-col">
        <label for="date" class="text-xl font-semibold">Date</label>
        <input
            type="date"
            min={TODAY_DATE}
            id="date"
            name="date"
            value={reservation["date"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        />
    </div>

    <!-- Time -->
    <div class="flex w-3/4 flex-col">
        <label for="time" class="text-xl font-semibold">Time</label>
        <input
            type="time"
            id="time"
            name="time"
            value={reservation["time"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        />
    </div>

    <!-- Type - {Reservation / Walk-in} -->

    <div class="flex w-3/4 flex-col">
        <label for="time" class="text-xl font-semibold">Type</label>
        <select
            id="type"
            name="type"
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        >
            {#if reservation["type"] === 1}
                <option value="1" selected="selected">Reservation</option>
                <option value="2">Walk-In</option>
            {:else if reservation["type"] === 2}
                <option value="1">Reservation</option>
                <option value="2" selected="selected">Walk-In</option>
            {:else}
                <option value="1">Reservation</option>
                <option value="2">Walk-In</option>
            {/if}
        </select>
    </div>

    <!-- Guest Name -->
    <div class="flex w-3/4 flex-col">
        <label for="guest_name" class="text-xl font-semibold">Guest Name</label>
        <input
            type="text"
            id="guest_name"
            name="guest_name"
            value={reservation["guest_name"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        />
    </div>

    <!-- No. of Guests -->
    <div class="flex w-3/4 flex-col">
        <label for="no_of_guests" class="text-xl font-semibold"
            >No. of accompanying persons</label
        >
        <input
            type="number"
            id="no_of_guests"
            min="1"
            name="no_of_guests"
            value={reservation["no_of_guests"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        />
    </div>

    <!-- Phone -->
    <div class="flex w-3/4 flex-col">
        <label for="phone" class="text-xl font-semibold">Phone</label>
        <input
            type="tel"
            id="phone"
            name="phone"
            minlength="10"
            maxlength="10"
            value={reservation["phone"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        />
    </div>

    <!-- Instructions -->
    <div class="flex w-3/4 flex-col">
        <label for="instructions" class="text-xl font-semibold"
            >Instructions</label
        >
        <input
            type="text"
            id="instructions"
            name="instructions"
            value={reservation["instructions"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
        />
    </div>

    <div class="px-2 outline outline-2 outline-black ">
        <button class="text-lg font-semibold" type="submit"> Submit </button>
    </div>
</form>
