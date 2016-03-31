var PeopleListItem = React.createClass({

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

      <li className="people-list__item">

        <PersonNameBtn { ...this.props } />

        <button>x</button>

      </li>

    );

  }

});
