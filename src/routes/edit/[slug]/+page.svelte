<script>
    import AddEditReservation from "../../../lib/add_edit_reservation.svelte";

    import { page } from '$app/stores';

    const id = $page.params.slug;
</script>

<AddEditReservation add_edit="edit" id={id} />