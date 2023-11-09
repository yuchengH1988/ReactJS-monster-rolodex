import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor () {
    console.log('1 constructor')
    super();
    this.state = {
      searchField: '',
      monsters: []
    }
  }
  componentDidMount() {
    console.log('3 componentDidMount')
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) =>
        this.setState(() => {
          return { 
            monsters: users
          }
        })
      )
  }
  onSearchChange = (event) => {
    const searchField = event.target.value.toLocaleLowerCase()
    this.setState (
      () => {
        return { searchField }
      }
    )
  }

  render() {
    console.log('2 render')
    const { monsters, searchField } = this.state
    const { onSearchChange } = this
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    });
    return (
      <div className="App">
        <h1 className="app-title">Monster Bitch</h1>
        <SearchBox
          className='monster-search-box'
          placeholder='search monsters'
          onChangeHandler={onSearchChange} />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
