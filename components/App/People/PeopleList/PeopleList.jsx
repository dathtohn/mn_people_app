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

    var data, people, peopleListItems;

    data   = this.props.data;
    people = data.people !== undefined ? data.people : [];

    peopleListItems = people.map( function( person ) {

      return (

        <PeopleListItem person={ person } />

      );

    });

    return (

      <ul className="people-list">

        { peopleListItems }

      </ul>

    );

  }

});
