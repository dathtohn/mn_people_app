var PeopleDisplayBtnName = React.createClass({

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

    peopleActions.setPersonToDisplay( this.props.person );

    dispatcher.fire( 'display person' );

  },

  render: function() {

    return (

      <button className="people-display__btn-name" onClick={ this.handleClick }>

        { this.props.person.name }

      </button>

    );

  }

});
