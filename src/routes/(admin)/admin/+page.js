const url = import.meta.env.VITE_URL;
import "../../../app.css";


// export async function load() {


    // let authenticated = false;
    // let role = null;

    // try {


    //     const unsubscribe = authStore.subscribe(user => {
    //         console.log("ANAMASTE", user);
    //         authenticated = user.authenticated;
    //         role = user.role;
    //     }
    //     );

    //     if (!authenticated) {

    //         unsubscribe();

    //         throw redirect(301, "/admin/login");
    //     }
    //     //  else {
    //     //     if (role != "admin") {
    //     //         authStore.logout();
    //     //         throw redirect(301, '/admin/login');
    //     //     }
    //     // }
    //     const [data] = await Promise.all([
    //         getFetch(`${url}/api/restaurants`)
    //     ])

    //     console.log(data);

    //     unsubscribe();

    //     return data;
    // }
    // catch (e) {
    //     console.error(e, authenticated, role);
    // }

// }

/* <script>
    const url = import.meta.env.VITE_URL;
    // Svelte Store Import

    import { authStore } from "../../../../lib/stores/authStore";

    async function handleLogin(e) {
        const brand_id = document.getElementById("brand_id").value;
        const username = document
            .getElementById("username")
            .value.toLowerCase();
        const password = document.getElementById("password").value;

        // authStore.adminLogin.bind(this)(brand_id, username, password);
    }
</script>

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
</form> */
