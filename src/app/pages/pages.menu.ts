export const PAGES_MENU = [
  {
      path: 'charts',
      data: {
        menu: {
          title: 'general.menu.charts',
          icon: 'ion-stats-bars',
          selected: false,
          expanded: false,
          order: 200,
        },
      },
      children: [
        {
          path: 'chartist-js',
          data: {
            menu: {
              title: 'general.menu.chartist_js',
            },
          },
        },
      ],
    },
    {
      path: 'home',
      data: {
        menu: {
          title: 'Home',
          icon: 'ion-home',
          selected: false,
          expanded: false,
          order: 250,
        },
      },
    },
];
