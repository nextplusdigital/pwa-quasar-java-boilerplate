import store from 'src/app/infra/store'
import { abort } from 'src/app/infra/services/http'
import { PATH_LOGIN } from 'src/app/support'
import { confirm } from 'src/app/support/message'
import i18n from 'src/app/support/i18n'

/**
 * @param {Array} routes
 * @returns {Array}
 */
export const protect = (routes) => {
  const security = {security: true}

  if (Array.isArray(routes)) {
    return routes.map(route => {
      route.meta = route.meta ? Object.assign({}, route.meta, security) : security
      if (route.children) {
        route.children = protect(route.children)
      }
      return route
    })
  }
  return routes
}

/**
 * @return {boolean}
 */
export const checkSession = () => {
  // noinspection JSUnresolvedVariable
  return store.getters.AppToken
}

/**
 * @param {function} next
 * @returns {*}
 */
export const checkModified = (next) => {
  const modified = store.getters.AppModified
  if (modified) {
    window.setTimeout(() => {
      // noinspection JSCheckFunctionSignatures
      confirm(i18n.t('events.modified.title'), i18n.t('events.modified.message'), () => {
        store.dispatch('changeModified', false)
        next()
      })
    }, 100)
    return true
  }
  return false
}

/**
 * @param {Route} to
 * @param {Route} from
 * @param {Function} next
 * @returns {*}
 */
export const beforeEach = (to, from, next) => {
  // noinspection JSUnresolvedVariable
  const security = to.meta.security

  abort('The route where request was started was leaved, all requests was canceled')

  if (!security) {
    return next()
  }

  if (checkModified(next)) {
    return next(false)
  }

  if (checkSession()) {
    return next()
  }
  return next(PATH_LOGIN)
}

/**
 * @param {Route} to
 * @param {Route} from
 * @returns {*}
 */
export const afterEach = (to, from) => {
  // noinspection JSIgnoredPromiseFromCall
  store.dispatch('clear')
}
