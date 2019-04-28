// /client/App.js
import React, { Component } from "react";
import axios from "axios";
import DataCrudForm from "./DataCrudForm";
const CircularJSON = require('circular-json');


class App extends Component {
  // initialize our state
  state = {
    message: 'Please Login',
      loginData: {
      userName: '',
      password: ''
    }
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
   // this.getDataFromDb();
    /*if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }*/
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
     // clearInterval(this.state.intervalIsSet);
      this.setState({ username: null, password: null });
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
 /* getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };*/

 /* // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };*/

  checkLogin= (username, password) => {
      axios.post("http://localhost:3001/api/checkLogin", {
          username: username,
          password: password
      }).then(response => {
         let test = JSON.stringify(response);
          this.setState({ message: 'Login Successful' + test});
          console.log(test);
          //return response.json()
      });

  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
        <div> <p>{this.state.message}</p>
      <form action="" onSubmit={this.checkLogin}>
        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ username: e.target.value })}
            placeholder="username"
            style={{ width: "200px" }}
          />
        </div>
        <div style={{ padding: "10px" }}>
          <input
            type="password"
            style={{ width: "200px" }}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="password"
          />
        </div>
        <div style={{ padding: "10px" }}>
          <button
            onClick={() =>
              this.checkLogin(this.state.username, this.state.password)
            }
          >
            Submit
          </button>
        </div>
      </form>
       </div>
    );
  }
}

export default App;
