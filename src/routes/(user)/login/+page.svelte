<script>
    const url = import.meta.env.VITE_URL;
    // Svelte Store Import
    import { restaurantName, restaurantLocation } from "$lib/stores";
    import { authStore } from "../../../lib/stores/authStore.js";

    import { getFetch } from "$lib/fetch";
    import { onMount } from "svelte";

    let isRestaurantIDSet = false;

    let restaurantID = null;

    import { goto } from "$app/navigation";

    onMount(async () => {
        let restaurant_id = localStorage.getItem("restaurant_id");

        if (restaurant_id != null) {
            isRestaurantIDSet = true;

            restaurantID = restaurant_id;

            getRestaurantData(restaurantID);
        }
    });

    async function handleLogin(e) {
        if (!isRestaurantIDSet) {
            restaurantID = document.getElementById("restaurant_id").value;
        }

        const username = document
            .getElementById("username")
            .value.toLowerCase();
        const password = document.getElementById("password").value;

        const data = await authStore.login(
            restaurantID,
            username,
            password,
            "user"
        );

        if ($authStore.authenticated) {
            getRestaurantData(restaurantID);

            localStorage.setItem("restaurant_id", restaurantID);

            goto("/");
        }
    }

    async function getRestaurantData(restaurantID) {
        const data = await getFetch(`${url}/api/restaurant/${restaurantID}`);

        if (data.message == "READ_RESTAURANT_SUCCEEDED") {
            $restaurantName = data.data["restaurant"]["restaurant_name"];
            $restaurantLocation = data.data["restaurant"]["location"];
        }
    }

    function notYours() {
        localStorage.removeItem("restaurant_id");
        isRestaurantIDSet = false;
    }
</script>

<form
    on:submit|preventDefault={handleLogin}
    method="POST"
    class="container flex h-full flex-col items-center gap-7 py-8"
>
    {#if isRestaurantIDSet}
        <div class="flex flex-row gap-3">
            <span class="text-md font-semibold">{$restaurantName}</span>
            <span class="text-sm font-normal">{$restaurantLocation}</span>
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
