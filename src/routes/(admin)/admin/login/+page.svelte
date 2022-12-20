<script>
    const url = import.meta.env.VITE_URL;

    import { goto } from "$app/navigation";
    // Svelte Store Import

    import { authStore } from "../../../../lib/stores/authStore";

    async function handleLogin(e) {
        const brand_id = document.getElementById("brand_id").value;
        const username = document
            .getElementById("username")
            .value.toLowerCase();
        const password = document.getElementById("password").value;

        const data = await authStore.login(
            brand_id,
            username,
            password,
            "admin"
        );

        if ($authStore.authenticated) {
            goto("/admin");
        }
    }
</script>

<!-- {$authStore.authenticated} -->
<!-- {$authStore.role} -->
<form
    on:submit|preventDefault={handleLogin}
    method="POST"
    class="container flex h-full flex-col items-center gap-7 py-8"
>
    <!-- Brand ID -->
    <div class="flex w-3/4 flex-col justify-between">
        <label for="brand_id" class="text-xl font-semibold">Brand ID</label>
        <input
            type="text"
            name="brand_id"
            id="brand_id"
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            placeholder="Brand ID"
        />
    </div>

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
