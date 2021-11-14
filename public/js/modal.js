// Añade el mapeo para controlar el comportamiento del Bootstrap Modal con la propiedad modalVisible

// Vincular el modal
ko.bindingHandlers.modalVisible = {
    init: function (element, valueAccessor) {
      var value = valueAccessor();
      /* init the modal */
      var modal = bootstrap.Modal.getOrCreateInstance(element);
      /* subscribe to the 'hidden' event and update the observable, if the modal gets hidden */
      element.addEventListener('hidden.bs.modal', function () {
        if (ko.isObservable(value)) { value(false); }
      })
    },
    update: function (element, valueAccessor) {
      var value = valueAccessor();
      var modal = bootstrap.Modal.getOrCreateInstance(element);
      ko.unwrap(value) ? modal.show() : modal.hide();
    }
  }