var PersonNameBtn = React.createClass({

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

    peopleActions.setCurrent( this.props.person );

    dispatcher.fire( 'display person' );

  },

  render: function() {

    return (

      <button className="person-name-btn" onClick={ this.handleClick }>

        { this.props.person.name }

      </button>

    );

  }

});
