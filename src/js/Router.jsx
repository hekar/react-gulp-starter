var React = require('react'),
    Router = require('react-router'),
    Link = Router.Link,
    RouteHandler = Router.RouteHandler,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    HomeView = require('./components/home/HomeView'),
    Layout = require('./Layout');

module.exports = {
  init: function RouterInit() {
    //<Route name="calendar" handler={Calendar}/>
    var routes = (
      <Route name="app" path="/" handler={Layout}>
      <DefaultRoute handler={HomeView}/>
      </Route>
    );

    Router.run(routes, function (Handler) {
      React.render(<Handler/>, document.getElementById('content'));
    });
  }
};

