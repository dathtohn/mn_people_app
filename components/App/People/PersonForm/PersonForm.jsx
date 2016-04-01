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

      <form className='person-form' onSubmit={ this.handleSubmit }>

        <h1 className='person-form__title'>Enter name and birthday. Then hit create!</h1>

        <input
          className='person-form__input-text'
          type='text'
          placeholder='Name'
          value={ this.state.name }
          onChange={ this.handleNameChange }
        />

        <input
          className='person-form__input-date'
          type='date'
          value={ this.state.dateOfBirth }
          onChange={ this.handleDateOfBirthChange }
        />

        <button className='person-form__btn-submit' type='submit'>Create Person</button>

      </form>

    );
  }

});
