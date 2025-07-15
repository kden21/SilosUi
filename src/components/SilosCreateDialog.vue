<script setup lang="ts">
import { ref } from 'vue';
import type { SilosDto } from 'src/models/SilosDto';
import { apiService } from 'src/services/SilosApiService';
import { notifyService } from 'assets/scripts/notify';
import { parse } from 'date-fns'
import { v4 as uuidv4 } from 'uuid';

const saveSilosEmit = defineEmits(['SaveSilosEvent']);
const sendSaveSilosEventToParent = () => {
  if(silosAfterSaveData.value){
    silosAfterSaveData.value.uuid = uuidv4();
  }
  const data = { silos: silosAfterSaveData.value };
  saveSilosEmit('SaveSilosEvent', data);
};

const silosDto = defineModel<SilosDto>()
const silosAfterSaveData = ref(silosDto.value)

const harvestYear = ref(null);
const startDate = ref(null);
const cultures = ['Пшеница', 'Ячмень', 'Семечка']
const createInProgress = ref(false);

const onInputFullness = () => {
  if(silosDto.value == null){
    return;
  }
  if(silosDto.value.freeFootage != null && silosDto.value.totalFootage != null
    && silosDto.value.nature != null&& silosDto.value.nature > 0 && silosDto.value.freeFootage.toString() !== ''
    && silosDto.value.totalFootage.toString() !== '' && silosDto.value.nature.toString() !== '')
  {
    if(silosDto.value.totalFootage == silosDto.value.freeFootage){
      silosDto.value.fullness = 0;
    }
    else{
      silosDto.value.fullness = silosDto.value.nature / 1000 * 9000 * (silosDto.value.totalFootage - silosDto.value.freeFootage);
    }
  }
  else {
    silosDto.value.fullness = null;
  }

};

async function createSilos() {
  if(!validateSilos()){
    return;
  }

  createInProgress.value = true;
  try {
    if(silosDto.value !== undefined){
      silosAfterSaveData.value = await apiService.createSilos(silosDto.value);
      notifyService.success(`Силос ${silosDto.value?.name} успешно добавлен`);
      sendSaveSilosEventToParent()
    }
  }
  catch (error) {
    if (error instanceof Error) {
      notifyService.error('Произошла ошибка при создании силоса', error.message);
    } else {
      notifyService.error('Произошла неизвестная ошибка при создании силоса');
    }
  }
  createInProgress.value = false;
}

function validateSilos(): boolean {
  if(silosDto.value?.name === undefined || silosDto.value.name === null || silosDto.value.name === ''){
    notifyService.error('Не указано наименование силоса');
    return false;
  }

  if(silosDto.value?.culture === undefined || silosDto.value.culture === null|| silosDto.value.culture === ''){
    notifyService.error('Не указана культура');
    return false;
  }

  if(startDate.value !== null && startDate.value !== ''){
    silosDto.value.startDate = parse(startDate.value, 'yyyy/MM/dd', new Date());
  }

  if(harvestYear.value !== null && harvestYear.value !== ''){
    silosDto.value.harvestYear = parse(harvestYear.value, 'yyyy', new Date());
  }

  return true;
}

</script>

<template>
  <q-card style="max-width: 800px!important;" v-if="!createInProgress" >
    <q-card-section class="row items-center q-pb-none text-h6"> Новый силос</q-card-section>

    <q-card-section v-if="silosDto != null">
      <div class="q-pa-md flex column" style="width: 650px;">

        <q-input
          filled
          v-model="silosDto.name"
          label="Наименование силоса"
          :rules="[(val) => !!val || 'Наименование не заполнено']"
          style="margin-bottom: 5px"
          dense
        />

        <q-select filled v-model="silosDto.culture" :rules="[(val) => !!val || 'Наименование не заполнено']"
                  :options="cultures" label="Культура" dense style="margin-bottom: 5px" />

        <div style="margin-bottom: 22px" class="flex justify-between">
          <q-input
            filled
            v-model="silosDto.gorchak"
            label="Горчак, %"
            type="number"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDto.protein"
            label="Белок, %"
            type="number"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDto.bug"
            label="Клоп, %"
            type="number"
            reverse-fill-mask
            dense
          />
        </div>

        <div style="margin-bottom: 22px;" class="flex justify-between">
          <q-input
            filled
            v-model="silosDto.sornaya"
            label="Сорная примесь, %"
            type="number"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDto.nature"
            label="Натура, г/л"
            type="number"
            @update:model-value="onInputFullness"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDto.humidity"
            label="Влажность, %"
            type="number"
            reverse-fill-mask
            dense
          />
        </div>

        <div style="margin-bottom: 22px;" class="flex justify-between">
          <q-input
            filled
            v-model="silosDto.zernovaya"
            label="Зерновая примесь, %"
            type="number"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDto.idk"
            label="ИДК, ед"
            type="number"
            reverse-fill-mask
            dense
          />
          <q-input dense filled v-model="startDate" mask="date" style="max-width: 184px" label="Дата закладки">
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

        <div style="margin-bottom: 22px;" class="flex justify-between">
          <q-input
            filled
            v-model="silosDto.totalFootage"
            label="Метраж общий, м"
            type="number"
            @update:model-value="onInputFullness"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDto.freeFootage"
            label="Метраж свободный, м"
            type="number"
            @update:model-value="onInputFullness"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDto.fullness"
            label="Загруженность, т"
            type="number"
            reverse-fill-mask
            dense
            disable
          />
        </div>

        <div style="margin-bottom: 22px;" class="flex justify-between">
          <q-input
            filled
            v-model="silosDto.gluten"
            label="Клейковина, %"
            type="number"
            reverse-fill-mask
            dense
          />
          <q-input
            filled
            v-model="silosDto.class"
            label="Класс"
            mask="#"
            dense
          />
          <q-input
            filled
            v-model="harvestYear"
            label="Год урожая"
            dense
            mask="####"
          />
        </div>

        <q-input
          v-model="silosDto.additionalInfo"
          filled
          type="textarea"
          label="Примечание"
          dense
        />
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Добавить" color="primary" @click="createSilos()" />
      <q-btn flat label="Отмена" color="red" v-close-popup />
    </q-card-actions>
  </q-card>

  <q-card v-else class="relative-position card-example" flat bordered style="width: 500px;height: 300px">

    <q-inner-loading
      color="primary"
      :showing="true"
      label="Идет создание силоса. Пожалуйста, подождите..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
  </q-card>
</template>

<style scoped lang="sass"></style>
