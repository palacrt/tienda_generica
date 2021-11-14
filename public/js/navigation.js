class MenuViewModel {
  constructor(links) {
    this.menu = ko.observableArray(links);
  }
}

ko.applyBindings(new MenuViewModel([
  {descripcion: 'Usuarios',  url: '/usuarios'},
  {descripcion: 'Clientes',  url: '/clientes'},
  {descripcion: 'Productos', url: '/productos'},        
  {descripcion: 'Ventas',    url: '/ventas'},
  {descripcion: 'Reportes',  url: '/reportes'}
]),document.getElementById('navigation'));