import { useEffect, useState } from 'react';
import './App.css';
import { MakeCard } from './components/cards.tsx';
import HeaderSearch from './components/header.tsx';
import Search from './components/search.tsx';

function App() {
  const [quarry, setQuarry] = useState('');
  const [dataID, setDataId] = useState(49413);

  useEffect(() => {
    console.log(dataID);
  }, [dataID]);
  return (
    <>
      <HeaderSearch quarry={quarry} setQuarry={setQuarry} />
      <Search quarry={quarry} setDataId={setDataId} />
      <MakeCard dataID={dataID} />
    </>
  );
}

export default App;
