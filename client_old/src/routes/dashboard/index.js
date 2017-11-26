import user from 'src/domains/auth/user/routes'
import graphics from 'src/domains/graphics/routes'
import forms from 'src/domains/forms/routes'

/**
 * @type Array
 */
export default [
  {
    path: '/dashboard',
    component: 'app/modules/dashboard/Index',
    props: {
      view: 'hHh Lpr lFf',
      reveal: true,
      leftBreakpoint: 996
    },
    children: [
      {
        path: '',
        component: 'app/modules/dashboard/components/Home',
        name: 'dashboard.home'
      },
      ...forms,
      ...graphics,
      ...user
    ]
  }
]
