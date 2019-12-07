import React, {Component} from 'react';
import './App.css';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
    
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json()) // if success occur from API, fetch will resolve the value and return the response. then we convert response to json object
    .then(users => this.setState({monsters:users})) // above statement will wrap the response into resolved promise. hence we use again .then 
    .catch(error => console.log('error occurred'))  //if an error occcur from API, fetch will rejected the error on our Promise object and we'll get this message
  }
  
  handleChange = (e) => {
    this.setState({
      searchField : e.target.value
    })
  }

  render(){
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter( monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase()) //logic to filter out monsters base on search field. toLowerCase is added to avoid case sensitive search
      );
    return (

      <div className="App">
        <h1> Monster Rolodex </h1>
        <SearchBox placeholder={'search monsters'} handleChange = {this.handleChange} />
        <CardList monsters = { filteredMonsters }/>  

      </div> // in above line sending filtered monsters as props to card-list component
  );
}
}

export default App;
