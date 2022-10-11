<script>
    import menu from "../assets/menu.svg";
    import home from "../assets/home.svg";
    import list from "../assets/list.svg";
    import account from "../assets/account.svg";

    import { auth } from "../stores/auth.js";

    import { date } from "../stores/date.js";

    import Login from "../lib/login.svelte";

    function logout(e) {
        fetch("http://localhost:5000/api/logout", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => response.json())
            .then((data) => {
                auth.set("NOT_LOGGED_IN");
                goto(`/`);
            });
    }

    import { onMount } from "svelte";

    onMount(async () => {
        const res = await fetch("http://localhost:5000/api/isloggedin", {
            method: "GET",
            credentials: "include",
        });

        const data = await res.json();

        auth.set(data.message);

    });
</script>

<main
    class="container relative mx-auto flex h-screen max-w-sm flex-col md:max-w-md lg:max-w-lg"
>
    <header
        class="inset-x-0 top-0 flex h-8 flex-row justify-between border-2 border-solid border-black md:h-10 lg:h-12"
    >
        <div class="flex flex-row gap-3">
            <!-- Menu Icon -->

            <img class="h-full" src={menu} alt="Menu Icon" />

            <!-- Title -->

            <span
                class="my-auto  font-mono text-3xl font-semibold tracking-wide"
            >
                Rezerva
            </span>

        </div>
        <div class="mr-2 self-center">
            <button
                class="right-0 float-right text-lg font-semibold"
                on:click={logout}
            >
                Logout
            </button>
        </div>
    </header>

    <!-- Made the container occupy the whole screen, and flex-shrinked it in the layout page -->

    <div class="relative flex-1 overflow-auto">
        {#if $auth === "LOGGED_IN"}
            <slot />
        {:else if $auth === "NOT_LOGGED_IN"}
            <Login />
        {:else}
            <p>Internal Server Error!!!</p>
        {/if}
    </div>

    <footer
        class="=sticky bottom-0 flex h-10 flex-row justify-around border-2 border-solid border-black md:h-12 lg:h-14"
    >
        <!-- Home -->
        <a href="/">
            <img class="h-full" src={home} alt="Home Icon" />
        </a>

        <!-- Reservations -->
        <a href="/reservations">
            <img class="h-full" src={list} alt="Reservations List Icon" />
        </a>

        <!-- User Account -->
        <a href="/profile">
            <img class="h-full" src={account} alt="User Profile Icon" />
        </a>
    </footer>
</main>
