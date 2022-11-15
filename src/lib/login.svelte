<script>
    const url = import.meta.env.VITE_URL;
    // Svelte Store Import
    import { auth } from "$lib/stores";
    import { goto } from "$app/navigation";

    import { postFetch, getFetch } from "$lib/fetch";
    import { onMount } from "svelte";

    let isRestaurantIDSet = false;

    let restaurantName = null;

    let restaurantLocation = null;

    let restaurantID = null;

    onMount(async () => {
        let restaurant_id = localStorage.getItem("restaurant_id");

        if (restaurant_id != null) {
            isRestaurantIDSet = true;

            restaurantID = restaurant_id;

            const data = await getFetch(
                `${url}/api/restaurant/${restaurant_id}`
            );

            if (data.message == "READ_RESTAURANT_SUCCEEDED") {
                restaurantName = data.data["restaurant"]["restaurant_name"];
                restaurantLocation = data.data["restaurant"]["location"];
            }
        }
    });

    async function login(e) {
        if (!isRestaurantIDSet) {
            restaurantID = document.getElementById("restaurant_id").value;
        }

        const credentials = {
            restaurant_id: restaurantID,
            username: document.getElementById("username").value.toLowerCase(),
            password: document.getElementById("password").value,
        };

        const formData = new FormData();

        for (let key in credentials) {
            formData.append(key, credentials[key]);
        }

        const data = await postFetch(`${url}/api/login`, formData);

        if (data.message === "LOGGED_IN") {
            if (!isRestaurantIDSet) {
                localStorage.setItem(
                    "restaurant_id",
                    document.getElementById("restaurant_id").value
                );
            }

            auth.set(data.message);
            goto("/");
            return;
        }
    }

    function notYours() {
        localStorage.removeItem("restaurant_id");
        isRestaurantIDSet = false;
    }
</script>

<form
    on:submit|preventDefault={login}
    method="POST"
    class="container flex h-full flex-col items-center gap-7 py-8"
>
    {#if isRestaurantIDSet}
        <div class="flex flex-row gap-3">
            <span class="text-md font-semibold">{restaurantName}</span>
            <span class="text-sm font-normal">{restaurantLocation}</span>
            <hr />
            <button
                class="outline outline-2 outline-offset-2"
                on:click={notYours}
            >
                Not yours?
            </button>
        </div>
    {:else}
        <!-- Restaurant ID -->
        <div class="flex w-3/4 flex-col justify-between">
            <label for="restaurant_id" class="text-xl font-semibold"
                >Restaurant ID</label
            >
            <input
                type="text"
                name="restaurant_id"
                id="restaurant_id"
                class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                placeholder="Restaurant ID"
            />
        </div>
    {/if}

    <!-- Username -->
    <div class="flex w-3/4 flex-col justify-between">
        <label for="username" class="text-xl font-semibold">Username</label>
        <input
            type="text"
            name="username"
            id="username"
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            placeholder="Username"
            required
        />
    </div>

    <!-- Password -->
    <div class="flex w-3/4 flex-col justify-between">
        <label for="password" class="text-xl font-semibold">Password</label>
        <input
            type="password"
            name="password"
            id="password"
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            placeholder="Password"
        />
    </div>

    <div class="px-2 outline outline-2 outline-black">
        <button class="text-lg font-semibold" type="submit"> Login </button>
    </div>
</form>
