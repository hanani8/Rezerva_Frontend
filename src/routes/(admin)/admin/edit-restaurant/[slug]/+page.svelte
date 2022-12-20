<script>
    import { patchFetch, getFetch } from "$lib/fetch";

    const url = import.meta.env.VITE_URL;

    import { page } from "$app/stores";

    import { goto } from "$app/navigation";

    import { onMount } from "svelte";

    export let data;

    console.log(data);

    // Variable to hold reservation data
    let restaurant = {
        restaurant_id: "",
        restaurant_name: "",
        location: "",
    };

    onMount(async () => {
        const id = $page.params.slug;

        const data = await getFetch(`${url}/api/restaurant/${id}`);

        restaurant = data.data.restaurant;
    });

    // if (data) {
    //     reservation = data.data.reservation;

    //     let date_time = reservation["reservation_time"].split(" ");
    //     reservation.date = date_time[0];
    //     let time = date_time[1].split("+");
    //     reservation.time = time[0];
    //     status = reservation["status"];
    //     id = data.id;
    // }

    async function submit(e) {
        const form = document.querySelector("form");

        const fieldsOfEditForm = Array.from(form);

        // console.log(fieldsOfEditForm);

        const fieldsOfEditFormThatHaveBeenUpdated = fieldsOfEditForm.filter(
            (el) => el.dataset.value != el.value && el.id != "submit"
        );

        const formData = {};

        fieldsOfEditFormThatHaveBeenUpdated.forEach((element) => {
            formData[element.id] = element.value;
        });

        const URL = `${url}/api/restaurant/${restaurant["restaurant_id"]}`;

        const data = await patchFetch(URL, JSON.stringify(formData));

        console.log(data);

        if (data) {
            goto("/admin");
        }
    }
</script>

<form
    on:submit|preventDefault={submit}
    class="container flex h-full flex-col items-center gap-7 py-8"
    id="edit-form"
>
    <!-- Restaurant Name -->
    <div class="flex w-3/4 flex-col">
        <label for="restaurant_name" class="text-xl font-semibold"
            >Restaurant Name</label
        >
        <input
            type="text"
            id="restaurant_name"
            name="restaurant_name"
            data-value={restaurant["restaurant_name"]}
            value={restaurant["restaurant_name"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        />
    </div>

    <div class="flex w-3/4 justify-around">
        <!-- No. of Guests -->
        <div class="flex w-5/12 flex-col">
            <label for="location" class="text-xl font-semibold">Location</label>
            <input
                type="text"
                id="location"
                name="location"
                data-value={restaurant["location"]}
                value={restaurant["location"]}
                class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                required
            />
        </div>
    </div>

    <div class="px-2 outline outline-2 outline-black ">
        <button class="text-lg font-semibold" type="submit" id="submit">
            Submit
        </button>
    </div>
</form>
