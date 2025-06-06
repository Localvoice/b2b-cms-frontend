import { AuthPermission } from '~app/modules/auth';

export const menuItems = [
  {
    id: 1,
    title: 'Strona główna',
    icon: 'mdi-home',
    to: '/app'
  },
  {
    id: 2,
    title: 'Kursy',
    icon: 'mdi-school-outline',
    to: '/app/courses'
  },
  {
    id: 3,
    title: 'Lekcje',
    icon: 'mdi-book-open-page-variant-outline',
    to: '/app/lessons'
  },
  {
    id: 4,
    title: 'Statystyki',
    icon: 'mdi-circle-double',
    to: '/app/stats'
  },
  {
    id: 5,
    title: 'Finanse',
    icon: 'mdi-finance',
    to: '/app/finances'
  },
  {
    id: 6,
    title: 'Ustawienia',
    icon: 'mdi-cog',
    to: '/app/settings'
  }
];
