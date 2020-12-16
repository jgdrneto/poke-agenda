import React from "react";

import { Redirect, Switch, Route, withRouter } from "react-router";

import Page from '../page/Page';

class App extends React.Component {
   
  constructor(props) {
    super(props);

    // Store the previous pathname and search strings
    this.currentPathname = null;
  }

  componentDidMount() {
     
    this.props.history.listen((newLocation, action) => {
      switch(action){
        case "PUSH":
          /*
          console.log("PUSH");
          console.log("NewLocation: " + newLocation.pathname);
          console.log("CurrentPathName: " + this.currentPathname);
          */
          if (newLocation.pathname !== this.currentPathname) {
            // Save new location
            this.currentPathname = newLocation.pathname;
            // Clone location object and push it to history
            //this.props.history.push(newLocation.pathname);
          }
          //console.log("NewCurrentPathName: " + this.currentPathname);
        break;
       case "POP":
          /*
          console.log("POP");
          console.log("NewLocation: " + newLocation.pathname);
          console.log("CurrentPathName: " + this.currentPathname);
          */
          if (newLocation.pathname !== this.currentPathname) {

            this.currentPathname = newLocation.pathname;
            //this.props.history.go();
          }

          //console.log("NewCurrentPathName: " + this.currentPathname);
       break;
       default:   
      }
    });  
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/pokemons/1" />} />
        <Route exact path="/pokemons" render={() => <Redirect to="/pokemons/1" />} />
        <Route exact path="/abilities" render={() => <Redirect to="/abilities/1" />} />
        <Route exact path="/types" render={() => <Redirect to="/types/1" />} />
        <Route path="/:mode/:id" component={Page}/>
      </Switch>
    );
  }
}

export default withRouter(App);
