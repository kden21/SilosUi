<template>
  <q-page class="row">
    <div class="back-color">
      <div class="back-color2">
        <search-filter-block @search-by-filter="handleSearchByFilterEvent" @show-dialog="handleShowDialogEvent" v-model=silosFilterDto></search-filter-block>
        <Suspense>
          <silos-cards ref="silosCardsRef" :event-trigger="childEventTrigger" v-model="silosFilterDto" @edit2-event="handleEdit2Event"></silos-cards>
          <template #fallback>
            <CardsWaitSkeleton></CardsWaitSkeleton>
          </template>
        </Suspense>
      </div>
    </div>

    <q-dialog v-model="showCreateDialog" :backdrop-filter="'blur(4px) saturate(150%)'">
      <silos-create-dialog @save-silos-event="handleEditEvent" v-model="silosCreateDto"></silos-create-dialog>
    </q-dialog>

    <q-dialog v-model="showEditDialog" :backdrop-filter="'blur(4px) saturate(150%)'">
      <silos-edit-dialog @save-silos-event="handleEditEvent" v-model="silosDto"></silos-edit-dialog>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import SearchFilterBlock from 'components/SearchFilterBlock.vue';
import SilosCards from 'components/SilosCards.vue';
import SilosCreateDialog from 'components/SilosCreateDialog.vue';
import { type Ref, ref } from 'vue';
import CardsWaitSkeleton from 'components/skeletons/CardsWaitSkeleton.vue';
import type { SilosDto } from 'src/models/SilosDto';
import SilosEditDialog from 'components/SilosEditDialog.vue';
import type { SilosFilterDto } from 'src/models/SilosFilterDto';

const childEventTrigger = ref(0);

const sendEventToChild = () => {
  childEventTrigger.value++; // Изменяем значение для триггера
};

const silosCardsRef = ref<InstanceType<typeof SilosCards> | null>(null);
const silosCardsUpdate = (silos: SilosDto) => {
  silosCardsRef.value?.silosCardsUpdate(silos);
};
const handleShowDialogEvent = () => {
  showCreateDialog.value = true
};
const handleSearchByFilterEvent = () => {
  sendEventToChild()
};

const handleEditEvent = (data: { silos: SilosDto }) => {
  showEditDialog.value = false
  showCreateDialog.value = false
  silosCardsUpdate(data.silos)
  //sendEventToChild(data.silos)
};

const showCreateDialog = ref(false);
const showEditDialog = ref(false);
const handleEdit2Event = (data: { silos: SilosDto }) => {
  showEditDialog.value = true;
  silosDto.value = data.silos;
};

const silosCreateDto: Ref<SilosDto> = ref( {
  uuid: '',
  id: 0,
  name: '',
  culture: '',
  gorchak: null,
  protein: null,
  bug: null,
  sornaya: null,
  zernovaya: null,
  idk: null,
  nature: null,
  humidity: null,
  startDate: null,
  harvestYear: null,
  class: null,
  gluten: null,
  fullness: null,
  freeFootage: null,
  totalFootage: null,
  additionalInfo: null
});

const silosDto: Ref<SilosDto> = ref( {
  uuid: '',
  id: 0,
  name: '',
  culture: '',
  gorchak: null,
  protein: null,
  bug: null,
  sornaya: null,
  zernovaya: null,
  idk: null,
  nature: null,
  humidity: null,
  startDate: null,
  harvestYear: null,
  class: null,
  gluten: null,
  fullness: null,
  freeFootage: null,
  totalFootage: null,
  additionalInfo: null
});

const silosFilterDto: Ref<SilosFilterDto> = ref({
  name: null,
  culture: null,
  gorchakFrom: null,
  gorchakTo: null,
  proteinFrom: null,
  proteinTo: null,
  bugFrom: null,
  bugTo: null,
  sornayaFrom: null,
  sornayaTo: null,
  zernovayaFrom: null,
  zernovayaTo: null,
  idkFrom: null,
  idkTo: null,
  natureFrom: null,
  natureTo: null,
  humidityFrom: null,
  humidityTo: null,
  startDateFrom: null,
  startDateTo: null,
  harvestYearFrom: null,
  harvestYearTo: null,
  classFrom: null,
  classTo: null,
  glutenFrom: null,
  glutenTo: null,
  fullnessFrom: null,
  fullnessTo: null,
  totalFootageFrom: null,
  totalFootageTo: null,
  freeFootageFrom: null,
  freeFootageTo: null,
})
</script>

<style lang="sass" scoped>
.back-color
  background-color: $backgr
  padding: 70px
  width: 100%

.back-color2
  background-color: white
  border-radius: 10px
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px
  width: 100%
  min-height: 600px
</style>
