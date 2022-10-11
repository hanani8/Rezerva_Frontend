<script>
    import { onMount } from "svelte";


    export let reservation;

    let reservation_time;
    let reservation_date;

    async function cancel(id) {
        const res = await fetch(
            `http://localhost:5000/api/reservation/${id}/cancel`,
            {
                method: "GET",
                credentials: "include",
            }
        );

        const data = await res.json();
    }

    onMount(() => {
        let date = new Date(reservation['reservation_time']);
        humanizeDate(date);
    })

    function humanizeDate(dateObj){
        const month = dateObj.getMonth();
        const date = dateObj.getDate();
        const year = dateObj.getFullYear();
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();

        if( hour < '10')
        {
            hour = '0' + hour;
        }

        if (minute < '10')
        {
            minute = '0' + minute;
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
            11: "Dec"
        }

        reservation_date = months[month] + " " + date + " " + year;
        reservation_time = hour + ":" + minute;
    }
</script>

<div class="relative w-full overflow-auto rounded-lg bg-gray-200 px-2 py-2">
    <!-- reservation or walk-in -->

    <div class="float-right flex flex-col gap-2">
        <div class="mt-2 mr-2 bg-black px-2 text-center text-white">
            {#if reservation["type"] == "1"}
                reservation
            {:else if reservation["type"] == "2"}
                walk-in
            {/if}
        </div>

        <div class="mr-2 bg-amber-200 text-center ">
            <a href="/edit/{reservation['reservation_id']}">edit</a>
        </div>

        <div class="mr-2 bg-red-500 text-center text-white">
            <button
                on:click={() => {
                    cancel(reservation["reservation_id"]);
                }}>cancel</button
            >
        </div>
    </div>

    <p class="font-sans text-lg font-medium">{reservation["guest_name"]}</p>

    <p class="font-mono text-lg font-bold">
        <span class="">Guests: {reservation["no_of_guests"]}</span>
    </p>

    <p class="font-mono text-xl font-semibold">{ reservation_date }</p>

    <p class="font-mono text-xl font-semibold">{ reservation_time }</p>

    <p class="font-mono text-xl font-semibold">
        Status: {reservation["status"]}
    </p>

    <p class="inline-block px-2 font-mono text-lg font-light outline outline-2">
        {reservation["phone"]}
    </p>

    <div class="mt-3 font-sans text-base">
        <span class="">Notes: </span>
        {reservation["instructions"]}
    </div>
</div>
