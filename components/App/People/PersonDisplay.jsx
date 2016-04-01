var PersonDisplay = React.createClass({

  getInitialState: function() {

    return {
      person: {}
    };

  },

  componentDidMount: function() {

    this.handleDisplayPersonEvt();

  },

  handleDisplayPersonEvt: function() {

    var dispatcher, peopleActions;

    dispatcher    = Dispatcher();
    peopleActions = PeopleActions();

    dispatcher.registerHandler( 'display person', function() {

      this.setState({
        person: peopleActions.getPersonToDisplay()
      });

    }.bind( this ));

  },

  render: function() {

    var person, copy;

    person = this.state.person;

    if ( person ) {

      if ( person.name && person.date_of_birth ) {

        copy = person.name + "'s birthday is on " + person.date_of_birth;

      } else {

        copy = 'Click on a person to display his or her birthday.';

      }

    }

    return (

      <div className="person-display">

        { copy }

      </div>

    );

  }

});
