<script>
    import { patchFetch, getFetch } from "$lib/fetch";

    const url = import.meta.env.VITE_URL;

    import { page } from "$app/stores";

    import { goto } from "$app/navigation";

    import { onMount } from "svelte";

    export let data;

    console.log(data);

    // Variable to hold reservation data
    let brand = {
        brand_id: "",
        brand_name: "",
    };

    onMount(async () => {
        const id = $page.params.slug;

        const data = await getFetch(`${url}/api/brand/${id}`);

        brand = data.data.brand;
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

        const URL = `${url}/api/brand/${brand["brand_id"]}`;

        const data = await patchFetch(URL, JSON.stringify(formData));

        console.log(data);

        if (data) {
            goto("/superadmin");
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
        <label for="brand_name" class="text-xl font-semibold"
            >Restaurant Name</label
        >
        <input
            type="text"
            id="brand_name"
            name="brand_name"
            data-value={brand["brand_name"]}
            value={brand["brand_name"]}
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        />
    </div>

    <div class="px-2 outline outline-2 outline-black ">
        <button class="text-lg font-semibold" type="submit" id="submit">
            Submit
        </button>
    </div>
</form>
