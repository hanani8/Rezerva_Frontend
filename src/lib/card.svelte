<script>
    const url = import.meta.env.VITE_URL;

    import { patchFetch } from "$lib/fetch";

    import expand from "../assets/expand.svg";

    import { goto } from "$app/navigation";

    export let reservation;

    async function cancel(id) {
        const URL = `${url}/api/reservation/${id}`;
        const formData = {
            status: 2,
        };
        const data = await patchFetch(URL, JSON.stringify(formData));

        if (data) {
            reservation["status"] = 2;
        }
    }

    async function confirm(id) {
        const URL = `${url}/api/reservation/${id}`;

        const formData = {
            status: 0,
        };

        const data = await patchFetch(URL, JSON.stringify(formData));

        if (data) {
            reservation["status"] = 0;
        }
    }

    function humanizeDate(date) {
        let dateObj = new Date(date);
        const month = dateObj.getMonth();
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();

        if (hour < "10") {
            hour = "0" + hour;
        }

        if (minute < "10") {
            minute = "0" + minute;
        }

        const months = {
            0: "Jan",
            1: "Feb",
            2: "Mar",
            3: "Apr",
            4: "May",
            5: "June",
            6: "July",
            7: "Aug",
            8: "Sep",
            9: "Oct",
            10: "Nov",
            11: "Dec",
        };

        let reservation_date = months[month] + " " + day + " " + year;
        let reservation_time = hour + ":" + minute;
        return {
            reservation_date,
            reservation_time,
        };
    }
</script>

<div class="relative h-full w-full rounded-lg">
    <!-- reservation or walk-in -->

    <div class="float-right flex flex-col gap-2">
        <div class="absolute right-0 bg-black px-1 text-center text-white">
            {#if reservation["status"] == "1"}
                W
            {/if}
        </div>
    </div>

    <div class="flex h-full flex-col gap-3 overflow-auto border-2 border-black">
        <div class="flex h-full flex-row items-center  justify-evenly">
            <div class="flex flex-col">
                <span class="text-sm font-medium"
                    >{reservation["guest_name"]}</span
                >
                <span class="font-mono text-sm">
                    {reservation["phone"]}
                </span>
            </div>

            <div class="flex flex-col">
                <span class="text-sm"> People </span>
                <span class="text-center text-sm"
                    >{reservation["no_of_guests"]}</span
                >
            </div>

            <div class="flex flex-col">
                <span class="text-sm"> Time </span>
                <span class="text-sm">
                    {humanizeDate(reservation["reservation_time"])[
                        "reservation_time"
                    ]}
                </span>
            </div>

            <div class="flex flex-col">
                <span class="text-sm"> Table </span>
                <span class="text-sm">
                    {#if reservation["table"] != ""}
                        {reservation["table"]}
                    {:else}
                        ~
                    {/if}
                </span>
            </div>

            {#if reservation["status"] != 2}
                <div class="">
                    <a href="/edit/{reservation['reservation_id']}">
                        <!-- The reason for button is to disable the redirection to edit page if the reservation is already cancelled -->
                        <!-- https://stackoverflow.com/questions/34684467/dont-redirect-on-button-click-with-css -->
                        <button type="button">
                            <span class="text-sm text-green-800"> Edit </span>
                        </button>
                    </a>
                </div>

                <div class="">
                    <button
                        on:click={() => {
                            if (reservation["status"] != 2) {
                                cancel(reservation["reservation_id"]);
                            }
                        }}
                    >
                        <span class="text-sm text-red-800"> Cancel </span>
                    </button>
                </div>
                {#if reservation["status"] == 1}
                    <div class="">
                        <button
                            on:click={() => {
                                if (
                                    reservation["status"] != 2 &&
                                    reservation["status"] == 1
                                ) {
                                    confirm(reservation["reservation_id"]);
                                }
                            }}
                        >
                            <span class="text-fuchisia-800 text-sm">
                                Confirm
                            </span>
                        </button>
                    </div>
                {/if}
            {:else}
                <div class="text-md tracking-wide">CANCELLED</div>
            {/if}
        </div>

        <div class="mb-3 w-4/5 self-center border border-black ">
            <span class="text-center text-sm">
                {reservation["instructions"]}
            </span>
        </div>

        <!-- <div class="relative">
                <button
                    on:click={() => {
                        document
                            .getElementById("dropdown")
                            .classList.remove("hidden");
                        document
                            .getElementById("dropdown")
                            .classList.add("flex flex-col");
                    }}
                >
                    <img class="h-8" src={expand} alt="Expand More Icon" />
                </button>
                <div id="dropdown" class="w-24 absolute hidden z-50">
                    <a class="block" href="/edit">Link 1</a>
                    <a class="block" href="/cancel">Link 2</a>
                </div>
            </div>
        </div> -->

        <!-- <div id="instructions" class="flex-row">
            <span class="text-sm"> Instructions: </span>
            <span class="text-sm">
                {reservation["instructions"]}
            </span>
        </div> -->
    </div>
</div>
