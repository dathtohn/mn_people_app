var PeopleActions = (function () {
  'use strict';

  var instance;

  function _factory() {

    var current;

    function setCurrent( person ) {

      current = person;

    }

    function getCurrent() {

      if ( current ) {

        return current;

      }

      console.log( 'No current person set.' );

    }

    return {
      setCurrent: setCurrent,
      getCurrent: getCurrent
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
