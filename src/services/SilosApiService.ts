import axios, { type AxiosRequestConfig } from 'axios';
import type { AxiosError } from 'axios';
import type { SilosDto } from 'src/models/SilosDto';
import { routerService } from 'src/services/router.service';
import type { LoginDto } from 'src/models/LoginDto';
import type { UserDto } from 'src/models/UserDto';
import type { SilosFilterDto } from 'src/models/SilosFilterDto';

const instance = axios.create({
  baseURL: 'http://192.168.0.105:5160/api/v1',
  timeout: 60000, // тайм-аут (в миллисекундах)
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => { // Добавляем async
    if (error.response?.status === 401 || error.response?.status === 403) {
      try {
        routerService.navigateToLogin()

      } catch (routerError) {
        console.error('Router redirect failed:', routerError)
      }
    }

    return Promise.reject(error)
  }
)

instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');

  if(token){
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config;
}, async (error: AxiosError) => { // Добавляем async
   return Promise.reject(error)
});

export const apiService = {

  // логин
  async logIn(data: LoginDto) : Promise<UserDto> {
    const response = await instance.post('/Auth/login', data);
    return response.data;
  },

  // запрос силосов по фильтру
  async getSilosItems(silosFilterDto: SilosFilterDto | undefined): Promise<SilosDto[]> {
    const params = new URLSearchParams({
    });
    if (silosFilterDto) {
      this.setParams(silosFilterDto, params);
    }

    const config: AxiosRequestConfig = {
      params,
      paramsSerializer: {
        indexes: null // Для красивого формата массивов (если будут)
      }
    };
    const response = await instance.get('/siloses', config);
    return response.data;
  },

  // создание силоса
  async createSilos(data: SilosDto) {
    this.validateSilosDtoValues(data)
    const response = await instance.post('/siloses', data);
    return response.data;
  },

  // удаление силоса
  async deleteSilos(id: number): Promise<void> {
    await instance.delete('/siloses/' + id);
  },

  // изменение силоса
  async updateSilos(silos: SilosDto): Promise<SilosDto> {
    this.validateSilosDtoValues(silos)
    const response = await instance.put('/siloses/' + silos.id, silos);
    return response.data;
  },

  validateSilosDtoValues(silosDto: SilosDto) {
    silosDto.gorchak = this.validateNumberValue(silosDto.gorchak);
    silosDto.protein = this.validateNumberValue(silosDto.protein);
    silosDto.bug = this.validateNumberValue(silosDto.bug);
    silosDto.sornaya = this.validateNumberValue(silosDto.sornaya);
    silosDto.nature = this.validateNumberValue(silosDto.nature);
    silosDto.humidity = this.validateNumberValue(silosDto.humidity);
    silosDto.zernovaya = this.validateNumberValue(silosDto.zernovaya);
    silosDto.idk = this.validateNumberValue(silosDto.idk);
    silosDto.totalFootage = this.validateNumberValue(silosDto.totalFootage);
    silosDto.freeFootage = this.validateNumberValue(silosDto.freeFootage);
    silosDto.gluten = this.validateNumberValue(silosDto.gluten);
    silosDto.class = this.validateNumberValue(silosDto.class);
  },

  validateNumberValue(value: number | null | undefined) {
    return value == null ? null : (this.isStrictlyNumeric(value.toString()) ? Number(value) : null);
  },

  isStrictlyNumeric(value: string): boolean {
    return /^-?\d*\.?\d+$/.test(value);
  },

  setParams(silosFilterDto: SilosFilterDto, params: URLSearchParams){
    if(silosFilterDto.name != null){
      params.append('name', silosFilterDto.name)
    }
    if(silosFilterDto.culture != null){
      params.append('culture', silosFilterDto.culture)
    }
    if(silosFilterDto.gorchakFrom != null){
      params.append('gorchakFrom', silosFilterDto.gorchakFrom.toString())
    }
    if(silosFilterDto.gorchakTo != null){
      params.append('gorchakTo', silosFilterDto.gorchakTo.toString())
    }
    if(silosFilterDto.proteinFrom != null){
      params.append('proteinFrom', silosFilterDto.proteinFrom.toString())
    }
    if(silosFilterDto.proteinTo != null){
      params.append('proteinTo', silosFilterDto.proteinTo.toString())
    }
    if(silosFilterDto.bugFrom != null){
      params.append('bugFrom', silosFilterDto.bugFrom.toString())
    }
    if(silosFilterDto.bugTo != null){
      params.append('bugTo', silosFilterDto.bugTo.toString())
    }
    if(silosFilterDto.sornayaFrom != null){
      params.append('sornayaFrom', silosFilterDto.sornayaFrom.toString())
    }
    if(silosFilterDto.sornayaTo != null){
      params.append('sornayaTo', silosFilterDto.sornayaTo.toString())
    }
    if(silosFilterDto.zernovayaFrom != null){
      params.append('zernovayaFrom', silosFilterDto.zernovayaFrom.toString())
    }
    if(silosFilterDto.zernovayaTo != null){
      params.append('zernovayaTo', silosFilterDto.zernovayaTo.toString())
    }
    if(silosFilterDto.idkFrom != null){
      params.append('idkFrom', silosFilterDto.idkFrom.toString())
    }
    if(silosFilterDto.idkTo != null){
      params.append('idkTo', silosFilterDto.idkTo.toString())
    }
    if(silosFilterDto.natureFrom != null){
      params.append('natureFrom', silosFilterDto.natureFrom.toString())
    }
    if(silosFilterDto.natureFrom != null){
      params.append('natureFrom', silosFilterDto.natureFrom.toString())
    }
    if(silosFilterDto.humidityFrom != null){
      params.append('humidityFrom', silosFilterDto.humidityFrom.toString())
    }
    if(silosFilterDto.humidityTo != null){
      params.append('humidityTo', silosFilterDto.humidityTo.toString())
    }
    if(silosFilterDto.classFrom != null){
      params.append('classFrom', silosFilterDto.classFrom.toString())
    }
    if(silosFilterDto.classTo != null){
      params.append('classTo', silosFilterDto.classTo.toString())
    }
    if(silosFilterDto.glutenFrom != null){
      params.append('glutenFrom', silosFilterDto.glutenFrom.toString())
    }
    if(silosFilterDto.glutenTo != null){
      params.append('glutenTo', silosFilterDto.glutenTo.toString())
    }
    if(silosFilterDto.fullnessFrom != null){
      params.append('fullnessFrom', silosFilterDto.fullnessFrom.toString())
    }
    if(silosFilterDto.fullnessTo != null){
      params.append('fullnessTo', silosFilterDto.fullnessTo.toString())
    }
    if(silosFilterDto.totalFootageFrom != null){
      params.append('totalFootageFrom', silosFilterDto.totalFootageFrom.toString())
    }
    if(silosFilterDto.totalFootageTo != null){
      params.append('totalFootageTo', silosFilterDto.totalFootageTo.toString())
    }
    if(silosFilterDto.freeFootageFrom != null){
      params.append('freeFootageFrom', silosFilterDto.freeFootageFrom.toString())
    }
    if(silosFilterDto.freeFootageTo != null){
      params.append('freeFootageTo', silosFilterDto.freeFootageTo.toString())
    }
    if(silosFilterDto.startDateFrom != null){
      params.append('startDateFrom', silosFilterDto.startDateFrom.toISOString())
    }
  }
};
