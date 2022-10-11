<script>

    // Svelte Store Import

    import { auth } from "../stores/auth.js";

    import { goto } from "$app/navigation";

    function login(e) {
        const credentials = {
            userid: document.getElementById('userid').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };


        const formData = new FormData();

        for (let key in credentials) {
            formData.append(key, credentials[key]);
        }

        fetch("http://localhost:5000/api/login", {
            method : "POST",
            credentials: "include",

            body: formData,
        }).then(response => response.json()).then(data => {console.log(data); auth.set(data.message); goto('/');} );
    }

</script>


<div class="container flex h-full flex-col items-center gap-7 py-8">
    <!-- User ID -->
    <div class="w-3/4 flex flex-col justify-between">
        <label for="userid" class="text-xl font-semibold">User ID</label>
        <input type="text" name="userid" id="userid" class="h-8 outline outline-2 outline-black md:h-10 lg:h-12" />
    </div>

    <!-- Username -->
    <div class="w-3/4 flex flex-col justify-between">
        <label for="username" class="text-xl font-semibold">Username</label>
        <input type="text" name="username" id="username" class="h-8 outline outline-2 outline-black md:h-10 lg:h-12" />
    </div>

    <!-- Password -->
    <div class="w-3/4 flex flex-col justify-between">
        <label for="password" class="text-xl font-semibold">Password</label>
        <input type="password" name="password" id="password" class="h-8 outline outline-2 outline-black md:h-10 lg:h-12" />
    </div>

    <div class="px-2 outline outline-2 outline-black">
        <button class="text-lg font-semibold" on:click={login}>
            Login
        </button>
    </div>
</div>
