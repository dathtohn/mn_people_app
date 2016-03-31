var App = React.createClass({displayName: "App",

  render: function() {

    return (

      React.createElement("div", {className: "app"}, 

        React.createElement("h1", null, "Mommy Nearest People App"), 

        React.createElement(People, null)

      )

    );
  }

});

var People = React.createClass({displayName: "People",

  propTypes: {
    url: React.PropTypes.string
  },

  getDefaultProps: function() {

    return {
      url: 'http://localhost:3000/api/v1/people'
    };

  },

  getInitialState: function() {

    return {
      data: {}
    };

  },

  componentDidMount: function() {

    this.loadPeopleFromServer();

  },

  loadPeopleFromServer: function() {

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function( data ) {
        this.setState({
          data: data
        });
      }.bind( this ),
      error: function( xhr, status, err ) {
        console.error( this.props.url, status, err.toString() );
      }.bind( this )
    });

  },

  handlePersonSubmit: function( personParams ) {
    // 1. optimistically "create" the person
    // 2. wait for ajax to return success and update ID or error in which case the data will be resorted back
    // this provides for a better UX

    var tempID, newPerson, people, newPeople;

    tempID = Date().now;

    newPerson = {
      id:            tempID,
      name:          personParams.name,
      date_of_birth: personParams.dateOfBirth
    };

    people    = this.state.data;
    newPeople = people.people.concat([newPerson]);

    this.setState({
      data: newPeople
    });

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: { person: newPerson },
      success: function( data ) {
        this.setState({
          data: data
        });
      }.bind( this ),
      error: function( xhr, status, err ) {
        this.setState({
          data: people
        });
        console.error( this.props.url, status, err.toString() );
      }.bind( this )
    });

  },

  render: function() {

    return (

      React.createElement("div", {className: "people"}, 

        React.createElement(PersonForm, {onPersonSubmit:  this.handlePersonSubmit}), 

        React.createElement(PeopleList, {data:  this.state.data})

      )

    );
  }

});

var PeopleList = React.createClass({displayName: "PeopleList",

  propTypes: {
    data: React.PropTypes.array
  },

  getDefaultProps: function() {

    return {
      data: {}
    };

  },

  render: function() {

    var data, people, personListItems;

    data   = this.props.data;
    people = data.people !== undefined ? data.people : [];

    personListItems = people.map( function( person ) {

      return (

        React.createElement(PersonListItem, {person:  person })

      );

    });

    return (

      React.createElement("div", {className: "people-list"}, 

        React.createElement("h3", null, "People List"), 

        React.createElement(PersonDisplay, null), 

         personListItems 

      )

    );

  }

});

var PersonDisplay = React.createClass({displayName: "PersonDisplay",

  getInitialState: function() {

    return {
      person: {}
    };

  },

  componentDidMount: function() {

    var dispatcher, peopleActions;

    dispatcher    = Dispatcher();
    peopleActions = PeopleActions();

    dispatcher.registerHandler( 'display person', function() {

      this.setState({
        person: peopleActions.getCurrent()
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

      React.createElement("div", {className: "person-display"}, 

         copy 

      )

    );

  }

});

var PersonForm = React.createClass({displayName: "PersonForm",

  propTypes: {
    onPersonSubmit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {

    return {
      name:        '',
      dateOfBirth: null
    };

  },

  handleNameChange: function( e ) {

    this.setState({
      name: e.target.value
    });

  },

  handleDateOfBirthChange: function( e ) {

    this.setState({
      dateOfBirth: e.target.value
    });

  },

  handleSubmit: function( e ) {

    e.preventDefault();

    var name, dateOfBirth;

    name        = this.state.name.trim();
    dateOfBirth = this.state.dateOfBirth;

    this.props.onPersonSubmit({
      name:        name,
      dateOfBirth: dateOfBirth
    });

    name        = this.state.name.trim();
    dateOfBirth = this.state.dateOfBirth;

    this.setState({
      name:        '',
      dateOfBirth: null
    });

  },

  render: function() {

    return (

      React.createElement("form", {className: "personForm", onSubmit:  this.handleSubmit}, 

        React.createElement("input", {
          type: "text", 
          placeholder: "Your name", 
          value:  this.state.name, 
          onChange:  this.handleNameChange}
        ), 

        React.createElement("input", {
          type: "date", 
          placeholder: "Say something...", 
          value:  this.state.dateOfBirth, 
          onChange:  this.handleDateOfBirthChange}
        ), 

        React.createElement("input", {type: "submit", value: "Post"})

      )

    );
  }

});

var PersonListItem = React.createClass({displayName: "PersonListItem",

  propTypes: {
    person: React.PropTypes.object
  },

  getDefaultProps: function() {

    return {
      person: {}
    };

  },

  render: function() {

    return (

      React.createElement("div", {className: "person-list-item"}, 

        React.createElement(PersonNameBtn, React.__spread({},   this.props )), 

        React.createElement("button", null, "x")

      )

    );

  }

});

var PersonNameBtn = React.createClass({displayName: "PersonNameBtn",

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

      React.createElement("button", {className: "person-name-btn", onClick:  this.handleClick}, 

         this.props.person.name

      )

    );

  }

});
