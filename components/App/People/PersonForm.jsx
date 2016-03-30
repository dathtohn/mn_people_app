var PersonForm = React.createClass({

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

      <form className="personForm" onSubmit={ this.handleSubmit }>

        <input
          type="text"
          placeholder="Your name"
          value={ this.state.name }
          onChange={ this.handleNameChange }
        />

        <input
          type="date"
          placeholder="Say something..."
          value={ this.state.dateOfBirth }
          onChange={ this.handleDateOfBirthChange }
        />

        <input type="submit" value="Post" />

      </form>

    );
  }

});
