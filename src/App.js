import { useState } from 'react';
import './App.css';
import Die from './components/Die';
import { nanoid } from 'nanoid'

function App() {

  const numberArray = [...new Array(10)]
        .map(() =>{
          const randomNumber = Math.ceil(Math.random() * 6)
          const newObject = {
            value: randomNumber,
            isHeld: false,
            id: nanoid()
          }
          return newObject
        })
  
  const [allNewDice, setAllNewDice] = useState(numberArray);

  const rollDice = () => {
    setAllNewDice(numberArray)
    console.log(numberArray)
  }

  const dice = allNewDice.map((number) => (
    <Die key={number.id} value={number.value} isHeld={number.isHeld}/>
  ))
  
  return (
    <div className="app f-c">
      <main className='game f-c'>
        <div className='dice'>
          {dice}
        </div>
        <button  onClick={rollDice} className='button-roll'>Roll</button> 
      </main>
    </div>
  );
}

export default App;
