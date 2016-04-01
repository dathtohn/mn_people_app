var PeopleDisplayList = React.createClass({

  propTypes: {
    data:      React.PropTypes.object,
    deleted:   React.PropTypes.bool,
    undeleted: React.PropTypes.bool
  },

  getDefaultProps: function() {

    return {
      data:   {},
      filter: 'all'
    };

  },

  getInitialState: function() {

    return {
      className: 'people-display__list'
    };

  },

  componentWillReceiveProps: function( nextProps ) {

    this.handleNextPropsFilter( nextProps.filter, this.props.filter );

  },

  shouldComponentUpdate: function( nextProps, nextState ) {

    return nextProps.data !== this.props.data;

  },

  handleNextPropsFilter: function( nextFilter, filter ) {

    if ( nextFilter !== filter ) {

      var $this;

      $this = $(this.getDOMNode());

      switch ( nextFilter ) {

        case 'deleted':
          $this.removeClass( 'people-display__list--undeleted' ).addClass( 'people-display__list--deleted' );
          break;

        case 'undeleted':
          $this.removeClass( 'people-display__list--deleted' ).addClass( 'people-display__list--undeleted' );
          break;

        default:
          $this.removeClass( 'people-display__list--undeleted people-display__list--deleted' );

      }

    }

  },

  updateClassName: function( newClassName, className ) {

    $(this.getDOMNode()).addClass( newClassName ).removeClass( className );

  },

  render: function() {

    var data, people, peopleDisplayListItems;

    data   = this.props.data;
    people = data.people !== undefined ? data.people : [];

    peopleDisplayListItems = people.map( function( person ) {

      return (

        <PeopleDisplayListItem person={ person } />

      );

    });

    return (

      <ul className={ this.state.className }>

        { peopleDisplayListItems }

      </ul>

    );

  }

});
