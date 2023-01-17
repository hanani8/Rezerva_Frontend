<script>
    // Icons
    import home from "../../assets/home.svg";
    import list from "../../assets/list.svg";
    import account from "../../assets/account.svg";

    // Navigation Bar Component
    import Nav from "./Nav.svelte";

    import { authStore } from "../../lib/stores/authStore.js";
</script>

<main
    class="container relative mx-auto flex h-screen max-w-sm flex-col md:max-w-md lg:max-w-lg"
>
    <Nav />
    <!-- Made the container occupy the whole screen, and flex-shrinked it in the layout page -->

    <div class="relative flex-1 overflow-auto">
        <slot />
    </div>

    {#if $authStore.authenticated}
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
    {/if}
</main>
