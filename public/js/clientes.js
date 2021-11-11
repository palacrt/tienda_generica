class Cliente {
  constructor(data) {
    this.id = ko.observable(data.id);
    this.cedula = ko.observable(data.cedula);
    this.nombre = ko.observable(data.nombre);
    this.email = ko.observable(data.email);
    this.direccion = ko.observable(data.direccion);
    this.telefono = ko.observable(data.telefono);
    this.municipio_id = ko.observable(data.municipio_id);
  }
}

class ClientesViewModel {
  constructor() {
    // Data
    var self = this;
    self.clientes = ko.observableArray([]);

    // Cargar estado inicial del servidor   
    fetch("http://localhost:3000")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        self.clientes(data.map((item) => { return new Cliente(item)}));
      });


  }
}

ko.applyBindings(new ClientesViewModel(),document.getElementById('principal'));