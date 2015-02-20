var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    RouteHandler = Router.RouteHandler,
    Route = Router.Route;

module.exports = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <ul>
            <li><Link to="app">Home</Link></li>
          </ul>
          Logged in as Jane
        </header>

        <RouteHandler/>
      </div>
    );
  }
});

