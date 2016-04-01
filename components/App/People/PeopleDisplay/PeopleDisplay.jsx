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

      <div className='people-display'>

        <h1 className='people-display--title'>
          Filter and Delete People at will!
        </h1>

        <PeopleDisplayFilter handleFilterChange={ this.handleFilterChange } filter={ this.state.filter } />

        <PeopleDisplayList data={ this.props.data } filter={ this.state.filter } />

      </div>

    );

  }

});
