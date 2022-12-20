<script>
    const url = import.meta.env.VITE_URL;
    // Svelte Store Import
    import { auth } from "$lib/stores";
    import { goto } from "$app/navigation";

    import { postFetch } from "$lib/fetch";

    import { authStore } from "../../../../lib/stores/authStore";

    async function login(e) {
        const username = document
            .getElementById("username")
            .value.toLowerCase();
        const password = document.getElementById("password").value;

        const data = await authStore.login(0, username, password, "superadmin");

        if ($authStore.authenticated) {
            console.log(data);
            goto("/superadmin");
        }
    }
</script>

<form
    on:submit|preventDefault={login}
    method="POST"
    class="container flex h-full flex-col items-center gap-7 py-8"
>
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
