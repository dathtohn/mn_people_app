var PeopleDisplayListItem = React.createClass({

  propTypes: {
    person: React.PropTypes.object
  },

  getDefaultProps: function() {

    return {
      person: {}
    };

  },

  render: function() {

    var classes, btnDelete;

    classes = 'people-display__list-item';


    if ( this.props.person.deleted_at ) {

      classes+= ' people-display__list-item--deleted';

      btnDelete = null;

    } else {

      btnDelete = <PeopleDisplayBtnDelete { ...this.props } />;

    }

    return (

      <li className={ classes }>

        <PeopleDisplayBtnName { ...this.props } />

        { btnDelete }

      </li>

    );

  }

});
