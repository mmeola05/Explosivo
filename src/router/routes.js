// src/router/routes.js
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PlanList.vue') },
      { path: 'plan/:id', component: () => import('pages/PlanCalendar.vue') },
    ],
  },
];


export default routes
