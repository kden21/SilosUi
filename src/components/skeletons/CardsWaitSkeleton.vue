<script setup lang="ts">

</script>

<template>
  <div class="row justify-center q-gutter-md" style="gap:20px">
    <q-intersection
      v-for="index in 3"
      :key="index"
      once
      transition="scale"
      class="example-item"
    >
      <q-card flat style="width: 470px;max-width: 500px">
        <q-card-section class="row" style="gap:20px">
          <q-skeleton size="80px" />
          <q-skeleton height="80px" width="320px" />
        </q-card-section>

        <q-card-section>
          <q-skeleton type="text" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" width="80%" class="text-subtitle1" />
          <q-skeleton type="text" class="text-caption" />
          <q-skeleton type="text" class="text-caption" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" class="text-h2" />
          <q-skeleton height="80px" />
        </q-card-section>
      </q-card>
    </q-intersection>
  </div>
</template>

<style scoped lang="sass">

</style>
