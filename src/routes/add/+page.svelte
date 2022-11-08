<script>
    const url = import.meta.env.VITE_URL;

    import { postFetch } from "$lib/fetch";

    import { goto } from "$app/navigation";

    import { noOfReservations, noOfWalkIns, auth } from "$lib/stores";

    import { page } from "$app/stores";

    const TODAY_DATE = new Date().toISOString().split("T")[0];

    let reservation_walkin = 0;

    let status = 0;

    if($page.url.searchParams.has('type'))
    {
        reservation_walkin = $page.url.searchParams.get('type');   
    }

    async function submit(e) {
        const inputData = {
            guest_name: document.getElementById("guest_name").value,
            no_of_guests: document.getElementById("no_of_guests").value,
            phone: document.getElementById("phone").value,
            instructions: document.getElementById("instructions").value,
            date: document.getElementById("date").value,
            time: document.getElementById("time").value,
            status: status,
            // type: document.getElementById("type").value,
            type: reservation_walkin,
        };

        const formData = new FormData();

        for (let key in inputData) {
            formData.append(key, inputData[key]);
        }

        const URL = `${url}/api/reservation`;

        console.log(inputData)

        const data = await postFetch(URL, formData);

        if (data) {
            goto("/");
        }
    }

    function reservation(e) {
        reservation_walkin = 1;
    }

    function walkin(e) {
        reservation_walkin = 2;
    }
</script>

<div class="flex w-full flex-col gap-8">
    <div class="mt-8 flex w-full flex-row justify-evenly">
        <button
            on:click={reservation}
            class="h-8 w-1/3 bg-black active:bg-neutral-700"
        >
            <span class="text-white"> Reservation </span>
        </button>

        <button on:click={walkin} class="w-1/3 bg-black active:bg-neutral-700">
            <span class="text-white"> Walk-In </span>
        </button>
    </div>

    <hr class="w-3/4 self-center" />

    <!-- A Common Component For Adding and Editing Reservation -->
    {#if reservation_walkin == 1 || reservation_walkin == 2}
        {#if reservation_walkin == 1}
            <div
                class="flex h-24 w-24 flex-col items-center justify-center self-center border bg-neutral-800"
            >
                <span class="text-5xl text-white">{$noOfReservations}</span>
                <br />
                <span class="text-sm text-white">Reservations</span>
            </div>
        {:else if reservation_walkin == 2}
            <div
                class="flex h-24 w-24 flex-col items-center justify-center self-center border bg-neutral-800"
            >
                <span class="text-5xl text-white">{$noOfWalkIns}</span>
                <br />
                <span class="text-sm text-white">Walk-Ins</span>
            </div>
        {/if}
        <form
            on:submit|preventDefault={submit}
            class="container flex h-full flex-col items-center gap-7 py-8"
        >
            <!-- Date -->
            <div class="flex w-3/4 flex-col">
                <label for="date" class="text-xl font-semibold">Date</label>
                <input
                    type="date"
                    min={TODAY_DATE}
                    id="date"
                    name="date"
                    class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                    required
                />
            </div>

            <!-- Time -->
            <div class="flex w-3/4 flex-col">
                <label for="time" class="text-xl font-semibold">Time</label>
                <input
                    type="time"
                    id="time"
                    name="time"
                    class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                    required
                />
            </div>

            <!-- Type - {Reservation / Walk-in} -->

            <!-- <div class="hidden w-3/4 flex-col">
        <label for="time" class="text-xl font-semibold">Type</label>
        <select
            id="type"
            name="type"
            class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
            required
        >
            <option value="1">Reservation</option>
            <option value="2">Walk-In</option>
        </select>
    </div> -->

            <!-- Guest Name -->
            <div class="flex w-3/4 flex-col">
                <label for="guest_name" class="text-xl font-semibold"
                    >Guest Name</label
                >
                <input
                    type="text"
                    id="guest_name"
                    name="guest_name"
                    class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                    required
                />
            </div>

            <div class="flex w-3/4 justify-around">
                <!-- No. of Guests -->
                <div class="flex w-5/12 flex-col">
                    <label for="no_of_guests" class="text-xl font-semibold"
                        >Headcount</label
                    >
                    <input
                        type="number"
                        id="no_of_guests"
                        min="1"
                        name="no_of_guests"
                        class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                        required
                    />
                </div>

                <!-- Table No -->
                <div class="flex w-5/12 flex-col">
                    <label for="table" class="text-xl font-semibold"
                        >Table No</label
                    >
                    <input
                        type="text"
                        id="table"
                        name="table"
                        class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                        required
                    />
                </div>
            </div>

            <!-- Phone -->
            <div class="flex w-3/4 flex-col">
                <label for="phone" class="text-xl font-semibold">Phone</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    minlength="10"
                    maxlength="10"
                    class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                    required
                />
            </div>

            <!-- Instructions -->
            <div class="flex w-3/4 flex-col">
                <label for="instructions" class="text-xl font-semibold"
                    >Instructions</label
                >
                <input
                    type="text"
                    id="instructions"
                    name="instructions"
                    class="h-8 outline outline-2 outline-black md:h-10 lg:h-12"
                />
            </div>

            <div class="flex w-full justify-around">
                <div class="px-2 outline outline-2 outline-black ">
                    <button on:click={() => {status = 1}} class="text-lg font-semibold" type="submit">
                        Waitlist
                    </button>
                </div>
                <div class="px-2 outline outline-2 outline-black ">
                    <button class="text-lg font-semibold" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </form>
    {/if}
</div>
