<script>
    import { filter } from "$lib/stores";

    function update(e) {
        $filter = e.target.value;
    }
</script>

<select
    value={$filter}
    on:change={update}
    class="h-10 w-full bg-white text-xl outline outline-2 outline-black md:h-12 lg:h-14"
>
    <option value="1">Reservations</option>
    <option value="2">Walk-Ins</option>
    <option value="3">Waitlist</option>
    <option value="4">All</option>
</select>
