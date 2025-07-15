import type { Router } from 'vue-router'

class RouterService {
  private static instance: RouterService
  private router: Router | null = null

  private constructor() {}

  public static getInstance(): RouterService {
    if (!RouterService.instance) {
      RouterService.instance = new RouterService()
    }
    return RouterService.instance
  }

  public init(router: Router): void {
    this.router = router
  }

  public navigateToLogin(): void {
    if (!this.router) {
      console.error('Router not initialized!')
      window.location.href = '/login' // Fallback
      return
    }

    this.router.push('/login').catch(err => {
      console.error('Navigation error:', err)
      window.location.href = '/login' // Fallback
    })
  }

  public navigateAfterLogin(): void {
    if (!this.router) {
      console.error('Router not initialized!')
      window.location.href = '/' // Fallback
      return
    }

    this.router.push('/').catch(err => {
      console.error('Navigation error:', err)
      window.location.href = '/' // Fallback
    })
  }
}

export const routerService = RouterService.getInstance()
