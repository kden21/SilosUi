import { boot } from 'quasar/wrappers'
import { routerService } from 'src/services/router.service'

export default boot(({ router }) => {
  routerService.init(router)
})
