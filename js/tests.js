var TestUtils = React.addons.TestUtils;

var appTest = TestUtils.renderIntoDocument(
   React.createElement(App, null)
);

var appTitleTest = TestUtils.findRenderedDOMComponentWithClass(
   appTest, 'app__title'
);

console.log( "Describe App, it 'shows title' is equal to 'Mommy Nearest People App' returns " + ( appTitleTest.getDOMNode().textContent === 'Mommy Nearest People App' ) );
