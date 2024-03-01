import './App.css';
import { useState, useEffect, ChangeEvent } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

import { getData } from './utils/data.utils';

export type Monster = {
  id: string;
  name: string;
  email: string;
}

const App = () => {
  const [monsters,setMonsters] = useState<Monster[]>([]);
  const [searchField, setSearchField] = useState('')
  const [filteredMonsters, setFilteredMonsters] = useState(monsters)

  // 只跑一次
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getData<Monster[]>('https://jsonplaceholder.typicode.com/users')
      setMonsters(users)
    }
    fetchUsers()
  }, [])

  // 針對 monsters,searchField 跑的函式
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField)
    })
    setFilteredMonsters(newFilteredMonsters)
  },[monsters, searchField])

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
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
