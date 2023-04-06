import React, { ReactElement, useState } from 'react';
import './App.css';
import {useBreedList, useRandomDog } from './hooks/useDogFetch';

const App = () => {
  console.group('App');
  const [breedList] = useBreedList();
  const [currentBreed, setCurrentBreed] = useState('');
  const currentDogPhotoSrc = useRandomDog(currentBreed || Object.keys(breedList)[0]);
  console.groupEnd();
  return (
    <div className="App">
      <header className="App-header">
        <img src={currentDogPhotoSrc} className="App-logo" alt="logo" />
        <select onChange={(e)=> {
            console.log(e.currentTarget.value);
            setCurrentBreed(e.currentTarget.value);
            }}>
          {Object.entries(breedList).map(([breed, subbreeds]) => {
          return <option key={breed} value={breed}>{breed.charAt(0).toUpperCase() + breed.slice(1)}</option>})}
        </select>
      </header>
    </div>
  );
}

export default App;
