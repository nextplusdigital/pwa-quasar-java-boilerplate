import { field, filter } from 'src/app/support/model/index'
import { resource } from 'src/app/infra/services/http/resource'

export const entity = 'user'

export const meta = {
  icon: 'supervisor_account',
  label: 'Usuários',
  tooltip: 'Cadastro de Usuários'
}

export const api = '/auth/user'

export const path = '/dashboard/user'

export const service = resource(api)

export const fields = (scope) => {
  return filter(
    [
      field('id', 'Código', '').$in('index').$grid({width: 10}).$render(),
      field('name', 'Nome', 'field-text').$render(),
      field('email', 'E-mail', 'field-text').$render(),
      field('password', 'Senha', 'field-text').$form({type: 'password'}).$out('index').$render()
    ],
    scope
  )
}

export const grid = () => {
  return {
    api: api,
    path: path,
    data: {
      pagination: false,
      search: true,
      schemas: fields('index'),
      actions: ($this, actions) => {
        return actions
      }
    }
  }
}

export const form = (scope) => {
  return {
    api: api,
    path: path,
    data: {
      scope: scope,
      schemas: fields(scope),
      actions: ($this, actions) => {
        return actions
      }
    }
  }
}
