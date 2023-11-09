import './App.css';
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [searchField, setSearchField] = useState('')
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  // 只跑一次
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((users) => setMonsters(users))
  }, [])

  // 針對 monsters,searchField 跑的函式
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })
    setFilteredMonsters(newFilteredMonsters)
  },[monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase() 
    setSearchField(searchFieldString)
  }
  return (
    <div className="App">
      <h1 className="app-title">Monster Bitch</h1>
      <SearchBox
        className='monster-search-box'
        placeholder='search monsters'
        onChangeHandler={onSearchChange} />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;
