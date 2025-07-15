<script setup lang="ts">
import SilosCard from 'components/SilosCard.vue';
import { apiService } from 'src/services/SilosApiService';
import type { SilosDto } from 'src/models/SilosDto';
import type { SilosFilterDto } from 'src/models/SilosFilterDto';
import { type Ref, ref, watch } from 'vue';
import { notifyService } from 'assets/scripts/notify';
import { v4 as uuidv4 } from 'uuid';

const silosCardsUpdate = (silos: SilosDto) => {
  const index = siloses.value.findIndex(item => item.id === silos.id);
  if (index !== -1) {
   siloses.value[index] = silos; // Заменяем существующий элемент
  } else {
    siloses.value.push(silos); // Добавляем новый элемент
  }
};

// Экспортируем метод, чтобы родитель мог его вызывать
defineExpose({
  silosCardsUpdate,
});

const silosFilterDto = defineModel<SilosFilterDto>();
const siloses : Ref<SilosDto[]> = ref(await getSiloses());

const handleEditEvent = (data: { silos: SilosDto }) => {
  sendEdit2DataToParent(data.silos)
};

const handleDeleteEvent = (data: { silosId: number }) => {
  siloses.value = siloses.value.filter(i => i.id != data.silosId);
};

const edit2Emit = defineEmits(['Edit2Event']);
const sendEdit2DataToParent = (silosDto: SilosDto) => {
  const data = { silos: silosDto };
  edit2Emit('Edit2Event', data);
};

const props = defineProps({
  eventTrigger: Number,
});

//const isLoading = ref(false);

watch(() => props.eventTrigger,  async () => {
  siloses.value = [];
  siloses.value = await getSiloses();
}, { immediate: false });

async function getSiloses(){
  try {
    const result = await apiService.getSilosItems(silosFilterDto.value);

    result.forEach(item => {
      if (!item.uuid) {
        item.uuid = uuidv4();
      }
    });

    return result;
  } catch (err) {
    if(err instanceof Error){
      notifyService.error('Произошла ошибка при загрузке силосов: ' + err.message);
    }

    //isLoading.value = false;
  }
  return []
}
</script>

<template>
  <div class="row justify-center q-gutter-md" style="padding-bottom: 25px">
    <q-intersection
      v-for="silos in siloses"
      :key="silos.uuid"
      once
      transition="scale"
      class="example-item"
    >
      <silos-card @edit-event="handleEditEvent" @delete-silos-event="handleDeleteEvent" :silos="silos"></silos-card>
    </q-intersection>
  </div>
</template>

<style scoped lang="sass">
.example-item
  //min-height: 500px
  width: 520px
</style>
