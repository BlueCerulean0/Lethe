import './App.css';
import { MakeCard } from './components/cards.tsx';
import HeaderSearch from './components/header.tsx';

function App() {
  return (
    <>
      <HeaderSearch />
      <MakeCard animeId={100} />
    </>
  );
}

export default App;
