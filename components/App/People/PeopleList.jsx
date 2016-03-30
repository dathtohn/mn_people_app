var PeopleList = React.createClass({

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

        <PersonListItem person={ person } />

      );

    });

    return (

      <div className="peopleList">

        <h3>People List</h3>

        { personListItems }

      </div>

    );

  }

});
