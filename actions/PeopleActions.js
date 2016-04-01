var PeopleActions = (function () {
  'use strict';

  var instance;

  function _factory() {

    var personToDisplay, personToDelete;

    function setPersonToDisplay( person ) {

      personToDisplay = person;

    }

    function getPersonToDisplay() {

      if ( personToDisplay ) {

        return personToDisplay;

      }

      console.log( 'No person set.' );

    }

    function setPersonToDelete( person ) {

      personToDelete = person;

    }

    function getPersonToDelete() {

      if ( personToDelete ) {

        return personToDelete;

      }

      console.log( 'No person set.' );

    }

    return {
      setPersonToDisplay: setPersonToDisplay,
      getPersonToDisplay: getPersonToDisplay,
      setPersonToDelete:  setPersonToDelete,
      getPersonToDelete:  getPersonToDelete
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
