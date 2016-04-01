var PeopleDisplayFilter = React.createClass({

  propTypes: {
    handleFilterChange: React.PropTypes.func.isRequired,
    filter:             React.PropTypes.string.isRequired
  },

  handleOnChange: function( e ) {

    this.props.handleFilterChange( e.target.value );

  },

  render: function() {

    return (

      <div className='people-display__filter'>

        <input id='people-display__filter-radio--all' type='radio' name='filter' value='all' checked={ 'all' === this.props.filter } onChange={ this.handleOnChange } />

        <label className='people-display__filter-label' htmlFor='people-display__filter-radio--all'>
          All
        </label>

        <input id='people-display__filter-radio--undeleted' type='radio' name='filter' value='undeleted' checked={ 'undeleted' === this.props.filter } onChange={ this.handleOnChange } />

        <label className='people-display__filter-label' htmlFor='people-display__filter-radio--undeleted'>
          Undeleted
        </label>

        <input id='people-display__filter-radio--deleted' type='radio' name='filter' value='deleted' checked={ 'deleted' === this.props.filter } onChange={ this.handleOnChange } />

        <label className='people-display__filter-label' htmlFor='people-display__filter-radio--deleted'>
          Deleted
        </label>

      </div>

    );

  }

});

