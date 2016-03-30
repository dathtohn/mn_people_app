var PersonListItem = React.createClass({

  propTypes: {
    person: React.PropTypes.object
  },

  getDefaultProps: function() {

    return {
      person: {}
    };

  },

  render: function() {

    var person;

    person = this.props.person;

    return (

      <div className="personListItem">

        <button>

          { person.name }

        </button>

        <button>x</button>

      </div>

    );

  }

});
