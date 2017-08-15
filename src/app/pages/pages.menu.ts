export const PAGES_MENU = [{
  path: 'pages',
  children: [{
      path: 'home',
      data: {
        menu: {
          title: 'Monitoramento',
          icon: 'ion-arrow-graph-up-right',
          selected: false,
          expanded: false,
          order: 250
        }
      }
    },
    {
      path: 'clientes',
      data: {
        menu: {
          title: 'Clientes',
          icon: 'ion-person',
          selected: false,
          expanded: false,
          order: 300
        }
      },
      children: [{
          path: 'novo',
          data: {
            menu: {
              title: 'Novo',
              icon: 'ion-person-add'
            }
          }
        },
        {
          path: 'gerenciar',
          data: {
            menu: {
              title: 'Gerenciar',
              icon: 'ion-clipboard'
            }
          }
        }
      ]
    },
    {
      path: 'tecnicos',
      data: {
        menu: {
          title: 'Técnicos',
          icon: 'ion-model-s',
          selected: false,
          expanded: false,
          order: 300
        }
      },
      children: [{
          path: 'novo',
          data: {
            menu: {
              title: 'Novo',
              icon: 'ion-person-add'
            }
          }
        },
        {
          path: 'gerenciar',
          data: {
            menu: {
              title: 'Gerenciar',
              icon: 'ion-clipboard'
            }
          }
        }
      ]
    },
    {
      path: 'atendimentos',
      data: {
        menu: {
          title: 'Atendimentos',
          icon: 'ion-settings',
          selected: false,
          expanded: false,
          order: 300
        }
      },
      children: [{
          path: 'novo',
          data: {
            menu: {
              title: 'Novo',
              icon: 'ion-person-add'
            }
          }
        },
        {
          path: 'associar',
          data: {
            menu: {
              title: 'Associar',
              icon: 'ion-person-stalker'
            }
          }
        },
        {
          path: 'gerenciar',
          data: {
            menu: {
              title: 'Gerenciar',
              icon: 'ion-clipboard'
            }
          }
        }
      ]
    },
    {
      path: 'sac',
      data: {
        menu: {
          title: 'SAC',
          icon: 'ion-ios-chatboxes',
          selected: false,
          expanded: false,
          order: 250
        }
      },
      children: [{
        path: 'consulta',
        data: {
          menu: {
            title: 'Consulta',
            icon: 'ion-android-search'
          }
        }
      }]
    }
  ]
 }
];

