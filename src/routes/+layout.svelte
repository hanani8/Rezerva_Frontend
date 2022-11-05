<script>
    const url = import.meta.env.VITE_URL;

    import { getFetch } from "$lib/fetch";

    import menu from "../assets/menu.svg";
    import home from "../assets/home.svg";
    import list from "../assets/list.svg";
    import account from "../assets/account.svg";

    import { auth } from "$lib/stores";

    import { goto } from "$app/navigation";

    import { onMount } from "svelte";

    async function logout(e) {
        const data = await getFetch(`${url}/api/logout`);

        if (data) {
            $auth = "NOT_LOGGED_IN";
            goto("/login");
        }
    }

    async function isLoggedIn() {
        const data = await getFetch(`${url}/api/isloggedin`);

        if (data.message === "LOGGED_IN") {
            $auth = "LOGGED_IN";
        } else if (data.message === "NOT_LOGGED_IN") {
            $auth = "NOT_LOGGED_IN";
        }
    }

    onMount(async () => {
        isLoggedIn();
    })

    
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
            {#if $auth === "LOGGED_IN"}
                <button
                    class="right-0 float-right text-lg font-semibold"
                    on:click={logout}
                >
                    Logout
                </button>
                <!-- {:else}
                Not Logged In -->
            {/if}
        </div>
    </header>

    <!-- Made the container occupy the whole screen, and flex-shrinked it in the layout page -->

    <div class="relative flex-1 overflow-auto">
        <slot />
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
