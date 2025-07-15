<script setup lang="ts">
import { type Ref, ref } from 'vue';
import type { SilosDto } from 'src/models/SilosDto';
import { apiService } from 'src/services/SilosApiService';
import { notifyService } from 'assets/scripts/notify';
import { parse } from 'date-fns';
import { format } from 'date-fns-tz';
import { v4 as uuidv4 } from 'uuid';

const saveSilosEmit = defineEmits(['SaveSilosEvent']);
const sendSaveSilosEventToParent = () => {
  silosDtoDraft.value.uuid = uuidv4();
  const data = { silos: silosDtoDraft.value };
  saveSilosEmit('SaveSilosEvent', data);
};

const silosDto = defineModel<SilosDto>();
const silosDtoDraft: Ref<SilosDto> = ref({
  uuid: silosDto.value!.uuid,
  id: silosDto.value!.id,
  name: silosDto.value!.name,
  culture: silosDto.value!.culture,
  gorchak: silosDto.value?.gorchak,
  protein: silosDto.value?.protein,
  bug: silosDto.value?.bug,
  sornaya: silosDto.value?.sornaya,
  zernovaya: silosDto.value?.zernovaya,
  idk: silosDto.value?.idk,
  nature: silosDto.value?.nature,
  humidity: silosDto.value?.humidity,
  startDate: silosDto.value?.startDate,
  harvestYear: silosDto.value?.harvestYear,
  class: silosDto.value?.class,
  gluten: silosDto.value?.gluten,
  fullness: silosDto.value?.fullness,
  freeFootage: silosDto.value?.freeFootage,
  totalFootage: silosDto.value?.totalFootage,
  additionalInfo: silosDto.value?.additionalInfo
});

let harvestYearValue = null;
let startDateValue = null;
if (silosDto.value) {
  if (silosDto.value.startDate != null) {
    startDateValue = new Date(silosDto.value.startDate); // todo костыль
    startDateValue.setHours(startDateValue.getHours() + 3);
    startDateValue = format(startDateValue, 'yyyy/MM/dd');
  }

  if (silosDto.value.harvestYear != null) {
    harvestYearValue = new Date(silosDto.value.harvestYear); // todo костыль
    harvestYearValue.setHours(harvestYearValue.getHours() + 3);
    harvestYearValue = format(harvestYearValue, 'yyyy/MM/dd');
  }
}

const harvestYear = ref(harvestYearValue);
const startDate = ref(startDateValue);
const cultures = ['Пшеница', 'Ячмень', 'Семечка'];
const editInProgress = ref(false);

function cancel() {
  if(silosDto.value){
    silosDtoDraft.value = silosDto.value;
  }
}
async function editSilos() {
  if (!validateSilos()) {
    return;
  }

  editInProgress.value = true;
  try {
    if (silosDtoDraft.value !== undefined) {
      await apiService.updateSilos(silosDtoDraft.value);
      notifyService.success(`Силос ${silosDtoDraft.value?.name} успешно изменен`);
      sendSaveSilosEventToParent();
    }
  } catch (error) {
    if (error instanceof Error) {
      notifyService.error('Произошла ошибка при изменении силоса', error.message);
    } else {
      notifyService.error('Произошла неизвестная ошибка при изменении силоса');
    }
  }
  editInProgress.value = false;
}

function validateSilos(): boolean {
  if (
    silosDtoDraft.value?.name === undefined ||
    silosDtoDraft.value.name === null ||
    silosDtoDraft.value.name === ''
  ) {
    notifyService.error('Не указано наименование силоса');
    return false;
  }

  if (
    silosDtoDraft.value?.culture === undefined ||
    silosDtoDraft.value.culture === null ||
    silosDtoDraft.value.culture === ''
  ) {
    notifyService.error('Не указана культура');
    return false;
  }

  if (silosDto.value == null) {
    return true;
  }

  if (startDate.value !== null && startDate.value !== '') {
    silosDtoDraft.value.startDate = parse(startDate.value, 'yyyy/MM/dd', new Date());
  }

  if (harvestYear.value !== null && harvestYear.value !== '') {
    silosDtoDraft.value.harvestYear = parse(harvestYear.value, 'yyyy', new Date());
  }

  return true;
}
</script>

<template>
  <q-card style="max-width: 800px !important" v-if="silosDtoDraft && silosDto && !editInProgress">
    <q-card-section class="row items-center q-pb-none text-h6"
      >Редактирование силоса {{ silosDto.name }}</q-card-section
    >

    <q-card-section>
      <div class="q-pa-md flex column" style="width: 650px">
        <q-input
          filled
          v-model="silosDtoDraft.name"
          label="Наименование силоса"
          :rules="[(val) => !!val || 'Наименование не заполнено']"
          style="margin-bottom: 5px"
          dense
        />

        <q-select
          filled
          v-model="silosDtoDraft.culture"
          :rules="[(val) => !!val || 'Наименование не заполнено']"
          :options="cultures"
          label="Культура"
          dense
          style="margin-bottom: 5px"
        />

        <div style="margin-bottom: 22px" class="flex justify-between">
          <q-input
            filled
            v-model="silosDtoDraft.gorchak"
            mask="#.##"
            reverse-fill-mask
            label="Горчак, %"
            dense
          />
          <q-input
            filled
            v-model="silosDtoDraft.protein"
            mask="#.##"
            reverse-fill-mask
            label="Белок, %"
            dense
          />
          <q-input
            filled
            v-model="silosDtoDraft.bug"
            mask="#.##"
            reverse-fill-mask
            label="Клоп, %"
            dense
          />
        </div>

        <div style="margin-bottom: 22px" class="flex justify-between">
          <q-input
            filled
            v-model="silosDtoDraft.sornaya"
            mask="#.##"
            reverse-fill-mask
            label="Сорная примесь, %"
            dense
          />
          <q-input
            filled
            v-model="silosDtoDraft.nature"
            mask="#.##"
            reverse-fill-mask
            label="Натура, %"
            dense
          />
          <q-input
            filled
            v-model="silosDtoDraft.humidity"
            mask="#.##"
            reverse-fill-mask
            label="Влажность, %"
            dense
          />
        </div>

        <div style="margin-bottom: 22px" class="flex justify-between">
          <q-input
            filled
            v-model="silosDtoDraft.zernovaya"
            mask="#.##"
            reverse-fill-mask
            label="Зерновая примесь, %"
            dense
          />
          <q-input
            filled
            v-model="silosDtoDraft.idk"
            mask="#.##"
            reverse-fill-mask
            label="ИДК, ед"
            dense
          />
          <q-input
            dense
            filled
            v-model="startDate"
            mask="date"
            style="max-width: 184px"
            label="Дата закладки"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="startDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Закрыть" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div style="margin-bottom: 22px" class="flex justify-between">
          <q-input filled v-model="harvestYear" label="Год урожая" dense mask="####" />
          <q-input
            filled
            v-model="silosDtoDraft.totalFootage"
            label="Метраж общий, м"
            mask="#.##"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDtoDraft.freeFootage"
            label="Метраж свободный, м"
            mask="#.##"
            reverse-fill-mask
            dense
          />
        </div>

        <div style="margin-bottom: 22px" class="flex justify-between">
          <q-input
            filled
            v-model="silosDtoDraft.gluten"
            label="Клейковина, %"
            mask="#.##"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDtoDraft.class"
            label="Класс"
            mask="#"
            dense
          />
          <q-input
            filled
            v-model="silosDtoDraft.fullness"
            label="Загруженность, %"
            mask="#.##"
            reverse-fill-mask
            dense
          />
        </div>

        <q-input
          v-model="silosDtoDraft.additionalInfo"
          filled
          type="textarea"
          label="Примечание"
          dense
        />
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Сохранить" color="primary" @click="editSilos()" />
      <q-btn flat label="Отмена" color="red" v-close-popup @click="cancel()" />
    </q-card-actions>
  </q-card>

  <q-card
    v-else
    class="relative-position card-example"
    flat
    bordered
    style="width: 500px; height: 300px"
  >
    <q-inner-loading
      color="primary"
      :showing="true"
      label="Изменения сохраняются. Пожалуйста, подождите..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-card>
</template>

<style scoped lang="sass"></style>
