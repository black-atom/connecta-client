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
        }
      },
      children: [
        {
          path: 'chartist-js',
          data: {
            menu: {
              title: 'general.menu.chartist_js',
            }
          }
        }
      ]
    },
];
