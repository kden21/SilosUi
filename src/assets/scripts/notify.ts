import { Notify } from 'quasar'

export const notifyService = {
  // Успешное уведомление
  success(message: string, caption?: string) {
    const captionRes = caption == null ? '' : caption;

    Notify.create({
      type: 'positive',
      message,
      caption: captionRes,
      position: 'top',
      timeout: 2500,
    });
  },

  // Ошибка
  error(message: string, caption?: string) {
    const captionRes = caption == null ? '' : caption;
    Notify.create({
      type: 'negative',
      message,
      caption: captionRes,
      position: 'top',
      timeout: 3000
    })
  },
/*
  // Предупреждение
  warning(message: string, caption?: string) {
    Notify.create({
      type: 'warning',
      message,
      caption,
      position: 'top',
      timeout: 3000
    })
  },

  // Информационное сообщение
  info(message: string, caption?: string) {
    Notify.create({
      type: 'info',
      message,
      caption,
      position: 'top',
      timeout: 2500
    })
  },

  // Кастомное уведомление
  custom(config: {
    message: string
    caption?: string
    color?: string
    textColor?: string
    icon?: string
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    timeout?: number
  }) {
    Notify.create({
      ...config,
      position: config.position || 'top',
      timeout: config.timeout || 2500
    })
  }*/
}
