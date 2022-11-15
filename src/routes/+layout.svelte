<script>
    const url = import.meta.env.VITE_URL;

    import { getFetch } from "$lib/fetch";

    import menu from "../assets/menu.svg";
    import home from "../assets/home.svg";
    import list from "../assets/list.svg";
    import account from "../assets/account.svg";
    import cross from "../assets/cross.svg";
    import reservation from "../assets/reservation.svg";
    import walkin from "../assets/walkin.svg";

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
    });

    function sidebar(e) {
        SIDEBAR = !SIDEBAR;
    }

    let SIDEBAR = false;
</script>

<main
    class="container relative mx-auto flex h-screen max-w-sm flex-col md:max-w-md lg:max-w-lg"
>
    <header
        class="inset-x-0 top-0 flex h-8 flex-row justify-between border-2 border-solid border-black md:h-10 lg:h-12"
    >
        <div class="flex flex-row gap-3">
            <!-- Menu Icon -->

            {#if $auth === "LOGGED_IN"}
                <button on:click={sidebar}>
                    <img class="h-full" src={menu} alt="Menu Icon" />
                </button>
            {/if}

            <!-- Title -->

            <span class="my-auto text-3xl font-semibold tracking-wide">
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
            {/if}
        </div>
    </header>

    <!-- Sidebar -->

    {#if SIDEBAR === true}
        <div
            class="fixed z-40 flex w-80 flex-col overflow-y-auto bg-white p-4"
            tabindex="-1"
        >
            <div>
                <button class="float-right" on:click={sidebar}>
                    <img src={cross} alt="X Icon" />
                </button>
            </div>
            <div class="flex flex-col gap-7">
                <div>
                    <a class="text-lg font-semibold" href="/add?type=1">
                        <button on:click={sidebar}> Reservation </button>
                    </a>
                </div>
                <div>
                    <a class="text-lg font-semibold" href="/add?type=2">
                        <button on:click={sidebar}> Walk-In </button>
                    </a>
                </div>
                <div>
                    <p class="text-lg font-semibold">Waitlist</p>
                    <a
                        href="/add/waitlist?type=1"
                        class="text-md flot-right ml-8"
                    >
                        <button on:click={sidebar}> Reservation </button>
                    </a>
                    <br />
                    <a
                        href="/add/waitlist?type=2"
                        class="text-md flot-right ml-8"
                    >
                        <button on:click={sidebar}> Walk-In </button>
                    </a>
                </div>
                <div>
                    <button class="text-lg font-semibold" on:click={logout}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    {/if}

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
