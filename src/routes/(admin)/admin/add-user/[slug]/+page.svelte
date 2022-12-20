<script>
    const url = import.meta.env.VITE_URL;

    import { postFetch } from "$lib/fetch";

    import { goto } from "$app/navigation";

    import { page } from "$app/stores";

    async function submit(e) {
        const id = $page.params.slug;

        const inputData = {
            restaurant_id: id,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        const formData = new FormData();

        for (let key in inputData) {
            formData.append(key, inputData[key]);
        }

        const URL = `${url}/api/user`;

        console.log(inputData);

        const data = await postFetch(URL, formData);

        if (data) {
            goto("/admin");
        }
    }
</script>

<div class="flex h-full w-full flex-col gap-8">
    <form
        on:submit|preventDefault={submit}
        class="container flex h-full flex-col items-center gap-7 py-8"
    >
        <!-- Guest Name -->
        <!-- <div class="flex w-3/4 flex-col">
            <label for="restaurant_id" class="text-xl font-semibold"
                >Restaurant ID</label
            >
            <input
                type="number"
                id="restaurant_id"
                name="restaurant_id"
                class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                required
            />
        </div> -->

        <div class="flex w-3/4 justify-around">
            <!-- No. of Guests -->
            <div class="flex w-5/12 flex-col">
                <label for="username" class="text-xl font-semibold"
                    >Username</label
                >
                <input
                    type="text"
                    id="username"
                    name="username"
                    class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                    required
                />
            </div>

            <!-- Table No -->
            <div class="flex w-5/12 flex-col">
                <label for="password" class="text-xl font-semibold"
                    >Password</label
                >
                <input
                    type="text"
                    id="password"
                    name="password"
                    class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                />
            </div>
        </div>

        <div class="flex w-full justify-around">
            <div class="px-2 outline outline-2 outline-black ">
                <button class="text-lg font-semibold" type="submit">
                    Enter
                </button>
            </div>
        </div>
    </form>
</div>
