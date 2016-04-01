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

    this.getPeopleData();

    this.registerDeletePersonEvt();

  },

  getPeopleData: function() {

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

  registerDeletePersonEvt: function() {

    var dispatcher;

    dispatcher = Dispatcher();

    dispatcher.registerHandler( 'delete person', this.handleDeletePersonEvt );

  },

  handleDeletePersonEvt: function() {

    var peopleActions, person, personId;

    peopleActions = PeopleActions();

    person   = peopleActions.getPersonToDelete();
    personId = person.id;

    if ( personId ) {

      var url;

      url = this.props.url + '/' + personId;

      $.ajax({
        url:      url,
        type:     'DELETE',
        success:  function( data ) {
                    this.setState({
                      data: data
                     });
                  }.bind( this ),
        error:    function( xhr, status, err ) {
                    console.error( this.props.url, status, err.toString() );
                  }.bind( this )
      });

    }

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
      url:      this.props.url,
      dataType: 'json',
      type:     'POST',
      data:     { person: newPerson },
      success:  function( data ) {
                  this.setState({
                    data: data
                  });
                }.bind( this ),
      error:    function( xhr, status, err ) {
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

        React.createElement("h3", null, "People"), 

        React.createElement(PersonForm, {onPersonSubmit:  this.handlePersonSubmit}), 

        React.createElement(PersonDisplay, null), 

        React.createElement(PeopleDisplay, {data:  this.state.data})

      )

    );
  }

});

var PeopleDisplay = React.createClass({displayName: "PeopleDisplay",

  propTypes: {
    data: React.PropTypes.object
  },

  getDefaultProps: function() {

    return {
      data: {},
    };

  },

  getInitialState: function() {

    return {
      filter: 'all'
    };

  },

  handleFilterChange: function( filter ) {

    this.setState({
      filter: filter
    });

  },

  render: function() {

    return (

      React.createElement("div", {className: "people-display"}, 

        React.createElement(PeopleDisplayFilter, {handleFilterChange:  this.handleFilterChange, filter:  this.state.filter}), 

        React.createElement(PeopleDisplayList, {data:  this.props.data, filter:  this.state.filter})

      )

    );

  }

});

var PeopleDisplayBtnDelete = React.createClass({displayName: "PeopleDisplayBtnDelete",

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

      React.createElement("button", {className: "people-display__btn-delete", onClick:  this.handleClick}, 

        "delete"

      )

    );

  }

});

var PeopleDisplayBtnName = React.createClass({displayName: "PeopleDisplayBtnName",

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

      React.createElement("button", {className: "people-display__btn-name", onClick:  this.handleClick}, 

         this.props.person.name

      )

    );

  }

});

var PeopleDisplayFilter = React.createClass({displayName: "PeopleDisplayFilter",

  propTypes: {
    handleFilterChange: React.PropTypes.func.isRequired,
    filter:             React.PropTypes.string.isRequired
  },

  handleOnChange: function( e ) {

    this.props.handleFilterChange( e.target.value );

  },

  render: function() {

    return (

      React.createElement("div", {className: "people-display__filter"}, 

        React.createElement("input", {id: "people-display__filter-radio--all", type: "radio", name: "filter", value: "all", checked:  'all' === this.props.filter, onChange:  this.handleOnChange}), 

        React.createElement("label", {for: "people-display__filter-radio--all"}, 
          "All"
        ), 

        React.createElement("input", {id: "people-display__filter-radio--undeleted", type: "radio", name: "filter", value: "undeleted", checked:  'undeleted' === this.props.filter, onChange:  this.handleOnChange}), 

        React.createElement("label", {for: "people-display__filter-radio--undeleted"}, 
          "Undeleted"
        ), 

        React.createElement("input", {id: "people-display__filter-radio--deleted", type: "radio", name: "filter", value: "deleted", checked:  'deleted' === this.props.filter, onChange:  this.handleOnChange}), 

        React.createElement("label", {for: "people-display__filter-radio--deleted"}, 
          "Deleted"
        )

      )

    );

  }

});


var PeopleDisplayList = React.createClass({displayName: "PeopleDisplayList",

  propTypes: {
    data:      React.PropTypes.object,
    deleted:   React.PropTypes.bool,
    undeleted: React.PropTypes.bool
  },

  getDefaultProps: function() {

    return {
      data:   {},
      filter: 'all'
    };

  },

  getInitialState: function() {

    return {
      className: 'people-display__list'
    };

  },

  componentWillReceiveProps: function( nextProps ) {

    this.handleNextPropsFilter( nextProps.filter, this.props.filter );

  },

  shouldComponentUpdate: function( nextProps, nextState ) {

    return nextProps.data !== this.props.data;

  },

  handleNextPropsFilter: function( nextFilter, filter ) {

    if ( nextFilter !== filter ) {

      var $this;

      $this = $(this.getDOMNode());

      switch ( nextFilter ) {

        case 'deleted':
          $this.removeClass( 'people-display__list--undeleted' ).addClass( 'people-display__list--deleted' );
          break;

        case 'undeleted':
          $this.removeClass( 'people-display__list--deleted' ).addClass( 'people-display__list--undeleted' );
          break;

        default:
          $this.removeClass( 'people-display__list--undeleted people-display__list--deleted' );

      }

    }

  },

  updateClassName: function( newClassName, className ) {

    $(this.getDOMNode()).addClass( newClassName ).removeClass( className );

  },

  render: function() {

    var data, people, peopleDisplayListItems;

    data   = this.props.data;
    people = data.people !== undefined ? data.people : [];

    peopleDisplayListItems = people.map( function( person ) {

      return (

        React.createElement(PeopleDisplayListItem, {person:  person })

      );

    });

    return (

      React.createElement("ul", {className:  this.state.className}, 

         peopleDisplayListItems 

      )

    );

  }

});

var PeopleDisplayListItem = React.createClass({displayName: "PeopleDisplayListItem",

  propTypes: {
    person: React.PropTypes.object
  },

  getDefaultProps: function() {

    return {
      person: {}
    };

  },

  render: function() {

    var classes, btnDelete;

    classes = 'people-display__list-item';


    if ( this.props.person.deleted_at ) {

      classes+= ' people-display__list-item--deleted';

      btnDelete = null;

    } else {

      btnDelete = React.createElement(PeopleDisplayBtnDelete, React.__spread({},   this.props ));

    }

    return (

      React.createElement("li", {className:  classes }, 

        React.createElement(PeopleDisplayBtnName, React.__spread({},   this.props )), 

         btnDelete 

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
