<template>
    <section>
        <h2>{{eventera.name}}</h2>
        <p><span>{{ eventera.expireAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span></p>
        <p>{{eventera.loc.address}},{{eventera.loc.city}}</p>
    </section>
</template>

<script>
export default {
    props:{
        eventera: Object,
    }
}
</script>
