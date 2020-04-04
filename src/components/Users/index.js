import React, { Component } from "react";
import API from "../API";
import "./style.css";
import "bootstrap";
import Search from "../Search";

export default class Users extends Component {
  state = {
    search: "",
    people: [],
    displayPeople: []
  };

  handleInputChange = event => {
    const searchTerm = event.target.value.toLowerCase();
    
    console.log(searchTerm)
    console.log(this.state)
    const newUserList = this.state.people.filter(person=>{
      const thisName= person.name.first +person.name.last
       return thisName.toLowerCase().includes(searchTerm)
        
    });

    this.setState({
      displayPeople: newUserList,
      search: searchTerm
    });
  };

  sortByFirstName = () => {
      console.log("weBsorting")
      const dontMessWithState= new Array(...this.state.people)
      
    
    const sortUsers = dontMessWithState.sort((a, b) => {
        if (b.name.first > a.name.first) {
          return -1;
        }
        if (a.name.first > b.name.first) {
          return 1;
        }
  
        return 0;
      });
    // const sortedUsers = this.state.people.map(user => {
    //   return user.name.first.sort(people);
    // });
    this.setState({ displayPeople: sortUsers })
  };

  componentDidMount() {
    API.people().then(res => {
      this.setState({ 
          people: res.data.results,
         displayPeople: res.data.results,
         });
      console.log(this.state.people);
    });
  }

  render() {
    return (
        <>
        <Search handler={this.handleInputChange} val={this.state.search}></Search>
      <div className="container">
        <table className="userTable">
          <thead>
            <tr>
              <th>Photo</th>
              <th onClick={this.sortByFirstName}>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          {this.state.displayPeople &&
            this.state.displayPeople.map(person => (
              <tbody>
                <tr key={person.id.value}>
                  <td>
                    <img src={person.picture.thumbnail} alt="thumb" />
                  </td>
                  <td>{person.name.first}</td>
                  <td>{person.name.last}</td>
                  <td>{person.phone}</td>
                  <td>{person.email}</td>
                  <td>{person.dob.date.split("T")[0]}</td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
      </>
    );
  }
}
