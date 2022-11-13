import type { RouteRecordRaw } from 'vue-router'
import mainRoutes from './main'
import signupRoutes from './signup'
import dashboardRoutes from './dashboard'

const routes: Array<RouteRecordRaw> = [...mainRoutes, ...signupRoutes, ...dashboardRoutes]

export default routes
