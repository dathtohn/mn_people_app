var PeopleDisplay = React.createClass({

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

      <div className="people-display">

        <PeopleDisplayFilter handleFilterChange={ this.handleFilterChange } filter={ this.state.filter } />

        <PeopleDisplayList data={ this.props.data } filter={ this.state.filter } />

      </div>

    );

  }

});
