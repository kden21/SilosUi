<script setup lang="ts">
import { ref } from 'vue';
import type { SilosFilterDto } from 'src/models/SilosFilterDto';

const search = ref('')
const silosFilterDto = defineModel<SilosFilterDto>();

const emit = defineEmits(['ShowDialog', 'SearchByFilter']);
const sendShowDialogToParent = () => {
  emit('ShowDialog');
};
const searchByFilterToParent = () => {
  emit('SearchByFilter');
};

function searchSiloses() {
  if(silosFilterDto.value){
    if(search.value != null && search.value.length > 0){
      silosFilterDto.value.name = search.value;
    }
    if(startDateFrom.value != null){
      silosFilterDto.value.startDateFrom = new Date(startDateFrom.value);
    }
    if(startDateTo.value != null){
      silosFilterDto.value.startDateTo = new Date(startDateTo.value);
    }
    if(harvestYearFrom.value != null){
      silosFilterDto.value.harvestYearFrom = new Date(harvestYearFrom.value);
    }
    if(harvestYearTo.value != null){
      silosFilterDto.value.harvestYearTo = new Date(harvestYearTo.value);
    }
  }
  searchByFilterToParent()
}

function createSilos() {
  sendShowDialogToParent()
}

const startDateFrom = ref(null)
const startDateTo = ref(null)
const harvestYearFrom = ref(null)
const harvestYearTo = ref(null)
const userRole = localStorage.getItem('role');

function resetFilter(){
  silosFilterDto.value = {
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
  }

  startDateFrom.value = null;
  startDateTo.value = null;
  harvestYearFrom.value = null;
  harvestYearTo.value = null;

  searchByFilterToParent()
}

const onInput = () => {
  if(silosFilterDto.value && search.value != null && search.value.length > 0){
    silosFilterDto.value.name = search.value;
  }

  searchByFilterToParent()
};

</script>

<template>
  <div>
    <div class="q-pa-md flex row justify-between full-height main-set">
      <div class="title">Силосовая доска</div>
      <div class="row gap-1">
        <div class="row">
          <q-btn v-if="userRole === 'Admin'"
            size="15px"
            label="Добавить силос"
            color="primary"
            dense
            no-caps
            padding="10px"
            @click="createSilos()"
          />
          <span style="width: 5px;height: 10px"></span>

          <q-btn
            flat
            dense
            icon="tune"
            color="primary"
            aria-label="Фильтр"
            padding="0px 15px"
            size="large"
          >
            <q-menu
              v-if="silosFilterDto"
              anchor="bottom right"
              transition-show="jump-down"
              transition-hide="jump-up"
            >
              <div class="row no-wrap q-pa-md">
                <div class="column gap-1">
                  <div class="column gap-1 justify-between">
                    <div class="text-h6">Фильтрация</div>
                    <div class="row gap-1 justify-between">
                      <q-btn
                        color="red"
                        label="Сбросить фильтр"
                        no-caps
                        size="md"
                        padding="7px 30px"
                        @click="resetFilter()"
                      />
                      <q-btn
                        color="primary"
                        padding="7px 60px"
                        label="Показать"
                        no-caps
                        size="md"
                        v-close-popup
                        @click="searchSiloses()"
                      />
                    </div>
                  </div>

                  <div class="column gap-1">
                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.gorchakFrom"
                        label="Горчак от, шт"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.gorchakTo"
                        label="Горчак до, шт"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.proteinFrom"
                        label="Белок от, %"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.proteinTo"
                        label="Белок до, %"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.bugFrom"
                        label="Клоп от, %"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.bugTo"
                        label="Клоп до, %"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.sornayaFrom"
                        label="Сорная примесь от, %"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.sornayaTo"
                        label="Сорная примесь до, %"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.natureFrom"
                        label="Натура от, %"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.natureTo"
                        label="Натура до, %"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.humidityFrom"
                        label="Влажность от, %"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.humidityTo"
                        label="Влажность до, %"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.zernovayaFrom"
                        label="Зерновая примесь от, %"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.zernovayaTo"
                        label="Зерновая примесь до, %"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.idkFrom"
                        label="ИДК от, ед"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.idkTo"
                        label="ИДК до, ед"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="harvestYearFrom"
                        label="Год урожая от"
                        dense
                        mask="####"
                      />
                      <q-input
                        filled
                        v-model="harvestYearTo"
                        label="Год урожая до"
                        dense
                        mask="####"
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.totalFootageFrom"
                        label="Метраж общий от, м"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.totalFootageTo"
                        label="Метраж общий до, м"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.freeFootageFrom"
                        label="Метраж свободный от, м"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.freeFootageTo"
                        label="Метраж свободный до, м"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.glutenFrom"
                        label="Клейковина от, %"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.glutenTo"
                        label="Клейковина до, %"
                        dense
                      />
                    </div>

                    <div class="row gap-1">
                      <q-input
                        filled
                        v-model="silosFilterDto.classFrom"
                        label="Класс от"
                        type="number"
                        dense
                      />
                      <q-input
                        filled
                        v-model="silosFilterDto.classTo"
                        label="Класс до"
                        dense
                      />
                    </div>



                    <div class="row gap-1">
                      <q-input dense filled v-model="startDateFrom" mask="date" style="max-width: 184px" label="Дата закладки от">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="startDateFrom">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Закрыть" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>

                      <q-input dense filled v-model="startDateTo" mask="date" style="max-width: 184px" label="Дата закладки до">
                        <template v-slot:append>
                          <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                              <q-date v-model="startDateTo">
                                <div class="row items-center justify-end">
                                  <q-btn v-close-popup label="Закрыть" color="primary" flat />
                                </div>
                              </q-date>
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>

        </div>
        <q-input outlined v-model="search" label="Поиск" @update:model-value="onInput" >
          <template v-slot:prepend>
            <q-icon @click="searchSiloses()" name="search" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">
.main-set
  padding: 20px 50px
.title
  font-size: xx-large
  color: #757575
.gap-1
  gap: 15px
</style>
