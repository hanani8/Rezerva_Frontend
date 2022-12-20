<script>
    import { authStore } from "../../../lib/stores/authStore";

    import { onMount, onDestroy } from "svelte";

    import { getFetch } from "$lib/fetch";

    import { goto } from "$app/navigation";

    const url = import.meta.env.VITE_URL;

    let brands = [];

    let authenticated = false;
    let role = null;
    let data;

    const unsubscribe = authStore.subscribe((user) => {
        authenticated = user.authenticated;
        role = user.role;
    });

    onMount(async () => {
        if (!authenticated) {
            goto("/superadmin/login");
            return;
        } else {
            if (role != "superadmin") {
                authStore.logout();
                goto("/superadmin/login");
                return;
            }
        }
        data = await getFetch(`${url}/api/brands`, "/superadmin/login");

        if (data.data) {
            let temp = data.data["brands"];
            let map = new Map();

            for (let i of temp) {
                if (map.has(i.brand_id)) {
                    let value = map.get(i.brand_id);
                    value.push([i.username, i.admin_id, i.phone, i.brand_name]);
                    map.set(i.brand_id, value);
                } else {
                    map.set(i.brand_id, [
                        [i.username, i.admin_id, i.phone, i.brand_name],
                    ]);
                }
            }

            brands = map;
            console.log([...brands]);
        }
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleLogout(e) {
        authStore.logout();
        goto("/superadmin/login");
    }
</script>

<button
    class="border-doubled ml-2 mt-2 border-2 border-black px-2"
    on:click={() => goto("/superadmin/add-brand")}>Add Brand</button
>

<button
    class="border-doubled ml-2 mt-2 border-2 border-black px-2"
    on:click={(e) => handleLogout(e)}>Logout</button
>
<div>
    {#each [...brands] as brand}
        <span class="text-lg font-semibold tracking-wide">
            {brand[1][0][3]}
        </span>
        <a href="/superadmin/edit-brand/{brand[0]}">
            <span
                class="border-2 border-black px-2 text-sm font-normal tracking-wide"
            >
                Edit
            </span>
        </a>
        <a href="/superadmin/add-admin/{brand[0]}">
            <span
                class="border-2 border-black px-2 text-sm font-normal tracking-wide"
            >
                Add Admin
            </span>
        </a>
        <p class="text-red-600">Admin ID: Username: Phone</p>

        <ol>
            {#each brand[1] as admin}
                <li>
                    <!-- <span</span> -->
                    <span>{admin[1]}: {admin[0]}: {admin[2]}</span>
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
