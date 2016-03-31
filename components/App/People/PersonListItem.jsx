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

    return (

      <div className="person-list-item">

        <PersonNameBtn { ...this.props } />

        <button>x</button>

      </div>

    );

  }

});
