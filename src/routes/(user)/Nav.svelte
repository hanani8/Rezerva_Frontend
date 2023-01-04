<script>
    // Stores
    import { authStore } from "../../lib/stores/authStore.js";
    import { restaurantLocation } from "$lib/stores";

    // Icons
    import cross from "../../assets/cross.svg";
    import menu from "../../assets/menu.svg";

    // Goto
    import { goto } from "$app/navigation";

    let SIDEBAR = false;

    function sidebar(e) {
        SIDEBAR = !SIDEBAR;
    }

    async function handleLogout(e) {
        const data = await authStore.logout();
        goto("/login");
        return;
    }
</script>

<header
    class="inset-x-0 top-0 flex h-8 flex-row justify-between border-2 border-solid border-black md:h-10 lg:h-12"
>
    <div class="flex flex-row gap-3">
        <!-- {$authStore.authenticated} -->
        <!-- {$authStore.role} -->
        <!-- Menu Icon -->

        {#if $authStore.authenticated}
            <button on:click={sidebar}>
                <img class="h-full" src={menu} alt="Menu Icon" />
            </button>
        {/if}

        <!-- Title -->

        <span class="my-auto text-2xl font-semibold tracking-wide">
            Rezerva
        </span>

        <!-- Restaurant Location -->
        <span class="my-auto text-sm font-normal">
            {$restaurantLocation}
        </span>
    </div>
    <div class="mr-2 self-center">
        {#if $authStore.authenticated}
            <button
                class="right-0 float-right text-lg font-semibold"
                on:click={(e) => handleLogout(e)}
            >
                Logout
            </button>
        {/if}
    </div>

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
                    <a class="text-lg font-semibold" href="/add/waitlist">
                        <button on:click={sidebar}> Waitlist </button>
                    </a>
                </div>
                <div>
                    <button
                        class="text-lg font-semibold"
                        on:click={(e) => handleLogout(e)}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    {/if}
</header>
