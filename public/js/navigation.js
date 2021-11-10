var MenuViewModel = function (links) { 
    this.menu = ko.observableArray(links);
};

ko.applyBindings(new MenuViewModel([
  {
    descripcion: 'Usuarios',
    url: '/usuarios'
  },
  {
    descripcion: 'Clientes',
    url: '/clientes'
  },
  {
    descripcion: 'Productos',
    url: '/usuarios'
  },        
  {
    descripcion: 'Ventas',
    url: '/ventas'
  },
  {
    descripcion: 'Reportes',
    url: '/reportes'        
  }
]));