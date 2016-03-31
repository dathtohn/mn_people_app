var People = React.createClass({

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

      <div className='people'>

        <h3>People</h3>

        <PersonForm onPersonSubmit={ this.handlePersonSubmit } />

        <PersonDisplay />

        <PeopleList data={ this.state.data } />

      </div>

    );
  }

});
