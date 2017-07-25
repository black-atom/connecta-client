export const PAGES_MENU = [{
  path: 'pages',
  children: [{
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
    {
      path: 'clientes',
      data: {
        menu: {
          title: 'Clientes',
          icon: 'ion-person',
          selected: false,
          expanded: false,
          order: 300,
        },
      },
      children: [{
          path: 'novo',
          data: {
            menu: {
              title: 'Novo',
              icon: 'ion-person-add',
            },
          },
        },
        {
          path: 'gerenciar',
          data: {
            menu: {
              title: 'Gerenciar',
              icon: 'ion-clipboard',
            },
          },
        },
      ],
    },
    {
      path: 'tecnicos',
      data: {
        menu: {
          title: 'Técnicos',
          icon: 'ion-model-s',
          selected: false,
          expanded: false,
          order: 300,
        },
      },
      children: [{
          path: 'novo',
          data: {
            menu: {
              title: 'Novo',
              icon: 'ion-person-add',
            },
          },
        },
        {
          path: 'gerenciar',
          data: {
            menu: {
              title: 'Gerenciar',
              icon: 'ion-clipboard',
            },
          },
        },
      ],
    },
    {
      path: 'atendimentos',
      data: {
        menu: {
          title: 'Atendimentos',
          icon: 'ion-settings',
          selected: false,
          expanded: false,
          order: 300,
        },
      },
      children: [{
          path: 'perguntas',
          data: {
            menu: {
              title: 'Perguntas',
              icon: 'ion-help',
            },
          },
        },
        {
          path: 'novo',
          data: {
            menu: {
              title: 'Novo',
              icon: 'ion-person-add',
            },
          },
        },
        {
          path: 'gerenciar',
          data: {
            menu: {
              title: 'Gerenciar',
              icon: 'ion-clipboard',
            },
          },
        },
      ],
    },
    {
      path: 'sac',
      data: {
        menu: {
          title: 'SAC',
          icon: 'ion-ios-chatboxes',
          selected: false,
          expanded: false,
          order: 250,
        },
      },
      children: [{
        path: 'consulta',
        data: {
          menu: {
            title: 'Consulta',
            icon: 'ion-android-search',
          },
        },
      }],
    },
  ],
 }, 
];

