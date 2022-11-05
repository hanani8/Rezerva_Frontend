<script>
    const url = import.meta.env.VITE_URL;

    import { postFetch } from "$lib/fetch";

    import { goto } from "$app/navigation";

    const TODAY_DATE = new Date().toISOString().split("T")[0];

    async function submit(e) {
        const inputData = {
            guest_name: document.getElementById("guest_name").value,
            no_of_guests: document.getElementById("no_of_guests").value,
            phone: document.getElementById("phone").value,
            instructions: document.getElementById("instructions").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            status: 0,
            type: document.getElementById("type").value,
        };

        const formData = new FormData();

        for (let key in inputData) {
            formData.append(key, inputData[key]);
        }

        const URL = `${url}/api/reservation`;

        const data = await postFetch(URL, formData);

        if (data) {
            goto("/");
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
            <option value="1">Reservation</option>
            <option value="2">Walk-In</option>
        </select>
    </div>

    <!-- Guest Name -->
    <div class="flex w-3/4 flex-col">
        <label for="guest_name" class="text-xl font-semibold">Guest Name</label>
        <input
            type="text"
            id="guest_name"
            name="guest_name"
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
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
        />
    </div>

    <div class="px-2 outline outline-2 outline-black ">
        <button class="text-lg font-semibold" type="submit"> Submit </button>
    </div>
</form>
