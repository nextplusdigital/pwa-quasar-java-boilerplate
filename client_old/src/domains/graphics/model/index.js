import { resource } from 'src/app/infra/services/http/resource'

export const title = 'Gráficos'

export const api = '/graphics'

export const path = '/dashboard/graphics'

export const service = resource(api)
