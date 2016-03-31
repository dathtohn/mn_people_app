var Dispatcher = ( function () {
  'use strict';

  var instance;

  function _factory() {

    var handlers;

    handlers = {};

    function registerHandler( event, callback ) {

      handlers[event] = callback;

    }

    function fire( event ) {

      if ( handlers[event] ) {

        handlers[event]();

      }

    }

    return {
      registerHandler: registerHandler,
      fire:            fire
    };

  }

  function getInstance() {

    if ( typeof instance === 'undefined' ) {

      instance = _factory();

    }

    return instance;

  }

  return getInstance;

})();
