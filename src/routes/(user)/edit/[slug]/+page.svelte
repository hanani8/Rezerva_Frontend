<script>
    import { patchFetch } from "$lib/fetch";

    import { goto } from "$app/navigation";

    export let data;

    const TODAY_DATE = new Date().toISOString().split("T")[0];

    const url = import.meta.env.VITE_URL;

    // Variable to hold reservation data
    let reservation = {
        guest_name: "",
        no_of_guests: "",
        instructions: "",
        time: "",
        date: "",
        phone: "",
        status: "",
        type: "",
        table: "",
    };

    let status = 0;

    let id = 0;

    if (data) {
        reservation = data.data.reservation;

        let date_time = reservation["reservation_time"].split(" ");
        reservation.date = date_time[0];
        let time = date_time[1].split("+");
        reservation.time = time[0];
        status = reservation["status"];
        id = data.id;
    }

    async function submit(e) {
        const form = document.querySelector("form");

        const fieldsOfEditForm = Array.from(form);

        // console.log(fieldsOfEditForm);

        const fieldsOfEditFormThatHaveBeenUpdated = fieldsOfEditForm.filter(
            (el) => el.dataset.value != el.value && el.id != "submit"
        );

        const formData = {};

        fieldsOfEditFormThatHaveBeenUpdated.forEach((element) => {
            if (element.id == "data" || element.id == "time") {
                const reservation_time =
                    document.getElementById("date").value +
                    " " +
                    document.getElementById("time").value;

                formData["reservation_time"] = reservation_time;
            } else {
                formData[element.id] = element.value;
            }
        });

        const URL = `${url}/api/reservation/${id}`;

        const data = await patchFetch(URL, JSON.stringify(formData));

        console.log(data);

        if (data) {
            goto("/reservations");
        }
    }
</script>

<form
    on:submit|preventDefault={submit}
    class="container flex h-full flex-col items-center gap-7 py-8"
    id="edit-form"
>
    <div class="flex w-3/4 flex-row justify-around">
        <!-- Date -->
        <div class="flex w-5/12 flex-col">
            <label for="date" class="text-xl font-semibold">Date</label>
            <input
                type="date"
                min={TODAY_DATE}
                id="date"
                name="date"
                data-value={reservation["date"]}
                value={reservation["date"]}
                class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                required
            />
        </div>

        <!-- Time -->
        <div class="flex w-5/12 flex-col">
            <label for="time" class="text-xl font-semibold">Time</label>
            <input
                type="time"
                id="time"
                name="time"
                data-value={reservation["time"]}
                value={reservation["time"]}
                class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                required
            />
        </div>
    </div>

    <!-- Type - {Reservation / Walk-in} -->

    <div class="flex w-3/4 flex-col">
        <label for="time" class="text-xl font-semibold">Type</label>
        <select
            id="type"
            name="type"
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            data-value={reservation["type"]}
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
            data-value={reservation["guest_name"]}
            value={reservation["guest_name"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        />
    </div>

    <div class="flex w-3/4 justify-around">
        <!-- No. of Guests -->
        <div class="flex w-5/12 flex-col">
            <label for="no_of_guests" class="text-xl font-semibold"
                >Headcount</label
            >
            <input
                type="number"
                id="no_of_guests"
                min="1"
                name="no_of_guests"
                data-value={reservation["no_of_guests"]}
                value={reservation["no_of_guests"]}
                class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                required
            />
        </div>

        <!-- Table No -->
        <div class="flex w-5/12 flex-col">
            <label for="table" class="text-xl font-semibold">Table No</label>
            <input
                type="text"
                id="table"
                name="table"
                data-value={reservation["table"]}
                value={reservation["table"]}
                class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                required
            />
        </div>
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
            data-value={reservation["phone"]}
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
            data-value={reservation["instructions"]}
            value={reservation["instructions"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
        />
    </div>

    <div class="px-2 outline outline-2 outline-black ">
        <button class="text-lg font-semibold" type="submit" id="submit">
            Submit
        </button>
    </div>
</form>
