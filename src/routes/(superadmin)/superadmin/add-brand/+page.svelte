<script>
    const url = import.meta.env.VITE_URL;

    import { postFetch } from "$lib/fetch";

    import { goto } from "$app/navigation";

    async function submit(e) {
        const inputData = {
            // brand_id: document.getElementById("brand_id").value,
            brand_name: document.getElementById("brand_name").value,
        };

        const formData = new FormData();

        for (let key in inputData) {
            formData.append(key, inputData[key]);
        }

        const URL = `${url}/api/brand`;

        console.log(inputData);

        const data = await postFetch(URL, formData);

        if (data) {
            goto("/superadmin");
        }
    }
</script>

<div class="flex h-full w-full flex-col gap-8">
    <form
        on:submit|preventDefault={submit}
        class="container flex h-full flex-col items-center gap-7 py-8"
    >
        <!-- Brand ID -->
        <!-- <div class="flex w-3/4 flex-col">
            <label for="brand_id" class="text-xl font-semibold">Brand ID</label>
            <input
                type="number"
                id="brand_id"
                name="brand_id"
                class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                required
            />
        </div> -->

        <div class="flex w-3/4 justify-around">
            <!-- No. of Guests -->
            <div class="flex w-5/12 flex-col">
                <label for="brand_name" class="text-xl font-semibold"
                    >Brand Name</label
                >
                <input
                    type="text"
                    id="brand_name"
                    name="brand_name"
                    class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                    required
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
