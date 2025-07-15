<script setup lang="ts">
import { computed, ref } from 'vue';
import type { SilosCardDto } from 'src/models/SilosDto';

import { apiService } from 'src/services/SilosApiService';
import { notifyService } from 'assets/scripts/notify';
import { format } from 'date-fns-tz';

const emit = defineEmits(['EditEvent', 'DeleteSilosEvent']);
const sendEditDataToParent = () => {
  const data = { silos: silos };
  emit('EditEvent', data);
};
const deleteSilosEventToParent = () => {
  const data = { silosId: silos.id };
  emit('DeleteSilosEvent', data);
};

function editSilos() {
  sendEditDataToParent();
}

const userRole = localStorage.getItem('role');
const model = defineProps<SilosCardDto>();
const silos = model.silos;

const maxFullness = ref(0);
if(silos && silos.nature != null && silos.totalFootage != null){
  maxFullness.value = silos.nature / 1000 * 9000 * (silos.totalFootage);
}
const fullnessResult = silos.fullness != null ? silos.fullness / maxFullness.value : 0;

const progress1 = ref(fullnessResult);
const progressLabel1 = computed(() => (silos.fullness == null ? '-' : silos.fullness) + ' т');

const confirmDeleteDialog = ref(false)
let silosStartDate = null;
let silosHarvestYear = null;

if(silos.startDate != null) {
  silos.startDate = new Date(silos.startDate.toString()); // todo костыль
  silos.startDate.setHours(silos.startDate.getHours() + 3);
  silosStartDate = format(silos.startDate, 'dd.MM.yyyy');
} else {
  silosStartDate = '-';
}

if (silos.harvestYear != null) {
  silos.harvestYear = new Date(silos.harvestYear); // todo костыль
  silos.harvestYear.setHours(silos.harvestYear.getHours() + 3);
  silosHarvestYear = format(silos.harvestYear, 'yyyy');
} else {
  silosHarvestYear = '-';
}

async function deleteSilos() {
  try {
    await apiService.deleteSilos(silos.id);
    notifyService.success(`Силос ${silos.name} удален`);
    deleteSilosEventToParent()
  } catch (error) {
    if (error instanceof Error) {
      notifyService.error(`Произошла ошибка при удалении слоса ${silos.name}`, error.message);
    } else {
      notifyService.error('Произошла неизвестная ошибка при удалении силоса');
    }
  }
}

function confirmDelete(){
  confirmDeleteDialog.value = true;
}


</script>

<template>
  <q-card class="q-ma-sm my-card" style="padding: 10px" v-if="silos">
    <q-card-section>
      <div class="flex gap-1">
        <q-img v-if="silos.culture === 'Пшеница'" src="~/assets/images/pshenitsa.png" style="height: 70px; max-width: 70px"> </q-img>
        <q-img v-if="silos.culture === 'Ячмень'" src="~/assets/images/yacmen.png" style="height: 70px; max-width: 70px"> </q-img>
        <q-img v-if="silos.culture === 'Семечка'" src="~/assets/images/semya.png" style="height: 70px; max-width: 70px"> </q-img>
        <div>
          <div class="text-h5 text-primary">{{ silos.name }}</div>
          <div class="text-subtitle1" style="color: #5e5e5e">{{ silos.culture }}</div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="flex gap-1 justify-between">
        <div>
          <div class="text-subtitle2">Горчак:</div>
          <div class="text-subtitle2">Белок:</div>
          <div class="text-subtitle2">Клоп:</div>
          <div class="text-subtitle2">Сорная примесь:</div>
          <div class="text-subtitle2">Натура:</div>
          <div class="text-subtitle2">Влажность:</div>
          <div class="text-subtitle2">Зерн. примесь:</div>
        </div>
        <div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold"
              >{{ silos.gorchak == null ? '-' : silos.gorchak }} шт</span
            >
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold"
              >{{ silos.protein == null ? '-' : silos.protein }} %</span
            >
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold">{{ silos.bug == null ? '-' : silos.bug }} %</span>
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold"
              >{{ silos.sornaya == null ? '-' : silos.sornaya }} %</span
            >
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold">{{ silos.nature == null ? '-' : silos.nature }} г/л</span>
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold"
              >{{ silos.humidity == null ? '-' : silos.humidity }} %</span
            >
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold"
              >{{ silos.zernovaya == null ? '-' : silos.zernovaya }} %</span
            >
          </div>
        </div>

        <div>
          <div class="text-subtitle2">ИДК:</div>
          <div class="text-subtitle2">Дата закладки:</div>
          <div class="text-subtitle2">Год урожая:</div>
          <div class="text-subtitle2">Метраж общий:</div>
          <div class="text-subtitle2">Метраж свободный:</div>
          <div class="text-subtitle2">Клейковина:</div>
          <div class="text-subtitle2">Класс:</div>
        </div>
        <div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold">{{ silos.idk == null ? '-' : silos.idk }} ед</span>
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold">{{ silosStartDate }}</span>
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold">{{ silosHarvestYear }}</span>
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold"
              >{{ silos.totalFootage == null ? '-' : silos.totalFootage }} м</span
            >
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold"
              >{{ silos.freeFootage == null ? '-' : silos.freeFootage }} м</span
            >
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold">{{ silos.gluten == null ? '-' : silos.gluten }} %</span>
          </div>
          <div class="text-subtitle2" style="text-align: end; width: 100%">
            <span class="text-weight-bold">{{ silos.class == null ? '-' : silos.class }}</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-subtitle2">Загруженность:</div>
      <q-linear-progress rounded size="20px" :value="progress1" color="primary">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" class="fon" text-color="primary" :label="progressLabel1" />
        </div>
      </q-linear-progress>
    </q-card-section>

    <!--    <q-card-section>
      <div class="text-grey-9">Какое то описание наверное будет. или не будет</div>
    </q-card-section>-->

    <q-card-section>
      <div class="text-grey-9 text-italic">
        <span class="text-weight-bold">Дополнительно:</span>
        {{ silos.additionalInfo }}
      </div>
    </q-card-section>
    <q-card-actions align="right" v-if="userRole === 'Admin'">
      <q-btn flat label="Редактировать" color="primary" @click="editSilos()" />
      <q-btn flat label="Удалить" color="red" @click="confirmDelete()" />
    </q-card-actions>
  </q-card>

  <q-dialog v-model="confirmDeleteDialog" persistent :backdrop-filter="'blur(4px) saturate(150%)'">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">Вы действительно хотите удалить силос {{ silos.name }}?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Отмена" color="red" v-close-popup />
        <q-btn flat label="Удалить" color="primary" v-close-popup @click="deleteSilos()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="sass">
.gap-1
  gap: 10px
.my-card
  border-radius: 2px
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px
</style>
