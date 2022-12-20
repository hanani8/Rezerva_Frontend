<script>
    import { authStore } from "../../../lib/stores/authStore";

    import { onMount, onDestroy } from "svelte";

    import { getFetch } from "$lib/fetch";

    import { goto } from "$app/navigation";

    const url = import.meta.env.VITE_URL;

    let authenticated = false;
    let role = null;
    let data;
    let restaurants = [];
    let users = [];

    const unsubscribe = authStore.subscribe((user) => {
        authenticated = user.authenticated;
        role = user.role;
    });

    console.log(unsubscribe);

    onMount(async () => {
        if (!authenticated) {
            goto("/admin/login");
            return;
        } else {
            if (role != "admin") {
                authStore.logout();
                goto("/admin/login");
                return;
            }
        }
        data = await getFetch(`${url}/api/restaurants`, "/admin/login");

        if (data.data) {
            let temp = data.data["restaurants"];
            let map = new Map();

            for (let i of temp) {
                if (map.has(i.restaurant_id)) {
                    let value = map.get(i.restaurant_id);
                    value.push([
                        i.username,
                        i.user_id,
                        i.phone,
                        i.restaurant_name,
                        i.location,
                    ]);
                    map.set(i.restaurant_id, value);
                } else {
                    map.set(i.restaurant_id, [
                        [
                            i.username,
                            i.user_id,
                            i.phone,
                            i.restaurant_name,
                            i.location,
                        ],
                    ]);
                }
            }

            restaurants = map;
            console.log(restaurants);
        }
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleLogout(e) {
        authStore.logout();
        goto("/admin/login");
    }
</script>

<!-- {$authStore.authenticated} -->
<!-- {$authStore.role} -->

<button
    class="border-doubled ml-2 mt-2 border-2 border-black px-2"
    on:click={() => goto("/admin/add-restaurant")}>Create Restaurant</button
>

<button
    class="border-doubled ml-2 mt-2 border-2 border-black px-2"
    on:click={(e) => handleLogout(e)}>Logout</button
>
<div>
    {#each [...restaurants] as restaurant}
        <span class="text-lg font-semibold tracking-wide">
            {restaurant[1][0][3]}
        </span>
        <span class="text-sm font-normal tracking-wide">
            {restaurant[1][0][4]}
        </span>
        <a href="/admin/edit-restaurant/{restaurant[0]}">
            <span
                class="border-2 border-black px-2 text-sm font-normal tracking-wide"
            >
                Edit
            </span>
        </a>
        <a href="/admin/add-user/{restaurant[0]}">
            <span
                class="border-2 border-black px-2 text-sm font-normal tracking-wide"
            >
                Add User
            </span>
        </a>
        <p class="text-red-600">User ID: Username: Phone</p>

        <ol>
            {#each restaurant[1] as user}
                <li>
                    <!-- <span</span> -->
                    <span>{user[1]}: {user[0]}: {user[2]}</span>
                    <!-- <li>{user[2]}</li> -->
                </li>
            {/each}
            <hr />
        </ol>
        <!-- <ul>
            {restaurant[1][0][3]}
            {restaurant[1][0][4]}
            {#each restaurant[1] as user}
                <li>
                    {user[0]}
                    {user[2]}
                </li>
            {/each}
        </ul> -->
    {/each}
</div>
