var PeopleDisplayBtnDelete = React.createClass({

  propTypes: {
    person: React.PropTypes.object
  },

  getDefaultProps: function() {

    return {
      person: {}
    };

  },

  handleClick: function( e ) {

    var dispatcher, peopleActions;

    dispatcher    = Dispatcher();
    peopleActions = PeopleActions();

    peopleActions.setPersonToDelete( this.props.person );

    dispatcher.fire( 'delete person' );

  },

  render: function() {

    return (

      <button className="people-display__btn-delete" onClick={ this.handleClick }>

        delete

      </button>

    );

  }

});
