import type { RouteRecordRaw } from 'vue-router'

const dashboardRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    components: {
      Dashboard: () => import('../../views/Dashboard/DashboardLayout.vue'),
    },
    children: [
      {
        path: 'scheduler',
        name: 'scheduler',
        component: () => import('../../views/Dashboard/Scheduler/SchedulerPage.vue'),
      },
      {
        path: 'resources',
        name: 'resources',
        component: () => import('../../views/Dashboard/Resources/ResourcesPage.vue'),
      },
      {
        path: 'locations',
        name: 'locations',
        component: () => import('../../views/Dashboard/Locations/LocationsPage.vue'),
      },
      {
        path: 'reports',
        name: 'reports',
        component: () => import('../../views/Dashboard/Reports/ReportsPage.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('../../views/Dashboard/Profile/ProfilePage.vue'),
      },
      {
        path: 'my-bookings',
        name: 'my-bookings',
        component: () => import('../../views/Dashboard/MyBookings/MyBookingsPage.vue'),
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../../views/Dashboard/Settings/SettingsPage.vue'),
      },
    ],
  },
]

export default dashboardRoutes
