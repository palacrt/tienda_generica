class LOV {
  constructor(data) {
    this.r = data.r;
    this.d = data.d;
  }
}

// Constructor del Cliente para usar en el ViewModel
class Cliente {
  constructor(data = {id:false,cedula:null,nombre:null,email:null,direccion:null,telefono:null,municipio_id:null}) {
    this.id = ko.observable(data.id);
    this.cedula = ko.observable(data.cedula);
    this.nombre = ko.observable(data.nombre);
    this.email = ko.observable(data.email);
    this.direccion = ko.observable(data.direccion);
    this.telefono = ko.observable(data.telefono);
    this.municipio_id = ko.observable(data.municipio_id);
  }
}

// ViewModel de Clientes
class ClientesViewModel {
  constructor() {
    // Data
    var self = this;

    self.clientes = ko.observableArray([]);
    self.clienteCurrent = ko.observable(new Cliente());
    self.isModalVisible = ko.observable(false);

    self.lov_municipios = ko.observableArray([]);

    self.crear = function() {
      self.clienteCurrent(new Cliente());
      console.log(self.clienteCurrent());
      self.isModalVisible(true);
    }

    self.getActual = function (i) {

      console.log(i);

      self.clienteCurrent(self.clientes()[i]);
      //console.log(self.clienteCurrent());
      self.isModalVisible(true);
    }

    self.seleccionar = function () {
      // Cargar estado inicial del servidor
      fetch("http://localhost:3000")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        self.clientes(data.map((item) => { return new Cliente(item)}));
      });
    }

    self.seleccionar_lov_municipios = function () {
      // Cargar estado inicial del servidor
      fetch("http://localhost:3100/ciudades")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        self.lov_municipios(data.map((item) => { return new LOV(item)}));
      });
    }

    self.get_descripcion_municipio = function (observable) {

      console.log(observable());

      try {

        var dato = self.lov_municipios().find(item => item.r == observable());

        console.log('Municipio: ');
        console.log(dato);

        return dato.d;

      } catch (e) {

        return null;

      }
    }

    self.insertar = () => {

      console.log('insertar');
      var dato = ko.toJS(self.clienteCurrent());

      // Cargar estado inicial del servidor
      fetch("http://localhost:3000",{
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, same-origin, *omit
        headers: {
          'Accept': 'application/json',       // receive json
          'Content-Type': 'application/json'  // send json
        },
        //redirect: 'follow', // manual, *follow, error
        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(dato) // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        self.seleccionar();
        self.isModalVisible(false);
      });
    }

    self.actualizar = () => {

      var dato = ko.toJS(self.clienteCurrent());

      // Cargar estado inicial del servidor
      fetch("http://localhost:3000/" + dato.id,{
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, same-origin, *omit
        headers: {
          'Accept': 'application/json',       // receive json
          'Content-Type': 'application/json'  // send json
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(dato) // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        self.seleccionar();
        self.isModalVisible(false);
      })
    }

    self.guardar = () => {
      if (!self.clienteCurrent().id()) {
        self.insertar();
      } else {
        self.actualizar();
      }
    }

    self.eliminar = (i) => {

      self.clienteCurrent(self.clientes()[i]);
      var dato = ko.toJS(self.clienteCurrent());

      // Cargar estado inicial del servidor
      fetch("http://localhost:3000/" + dato.id,{
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, same-origin, *omit
        headers: {
          'Accept': 'application/json'       // receive json
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        self.seleccionar();
        self.isModalVisible(false);
      })
    }

    self.seleccionar_lov_municipios();
    self.seleccionar();

  }
}

ko.applyBindings(new ClientesViewModel(),document.getElementById('principal'));