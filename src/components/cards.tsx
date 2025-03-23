import { Daum, CharacterResponse } from './characterInterface.ts';
import { useEffect, useState } from 'react';
import { Game } from './game.tsx';
import End from './endScr.tsx';
import loadingGIF from '/src/assets/loading.gif';
import errorPNG from '/src/assets/error.png';
import lostGIF from '/src/assets/lost.gif';
import wonGIG from '/src/assets/won.gif';

async function fetchCharacters(animeId: number): Promise<Promise<CharacterResponse> | null> {
  try {
    const response: Response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching anime: ,', error);
    return null;
  }
}

function shuffleArr(arr: Daum[]) {
  const arrCopy = [...arr];
  for (let i = arrCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
  }
  return arrCopy;
}

interface Props {
  animeId: number;
  dataID: number;
}

export function MakeCard({ animeId = 16, dataID }: Props) {
  const [character, setCharacter] = useState<Daum[]>([]);
  const [allCharacters, setAllCharacters] = useState<Daum[]>([]);
  const [clicked, setClicked] = useState<Daum[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(0);
  const [win, setWin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect((): void => {
    const fetchData = async (): Promise<void> => {
      const data = await fetchCharacters(animeId);

      if (data === null) {
        setError(true);
      }
      if (data) {
        setLoading(false);
      } else if (!error) {
        setLoading(false);
      } else {
        setLoading(true);
      }

      await new Promise<void>((resolved) => {
        setTimeout(resolved, 500);
      });

      const eachChar: Daum[] = [];
      if (data?.data) {
        for (let i = 0; i < data?.data.length; i++) {
          if (i === 30) break;
          if (data) {
            eachChar.push(data.data[i]);
          }
        }
      }
      setAllCharacters(eachChar);
      setCharacter(eachChar.slice(0, 6));
    };
    fetchData();
    resetGame();
  }, [dataID]);

  useEffect((): void => {
    const clickedNames = new Set(clicked.map((c) => c.character.name));

    let remaining = allCharacters.filter((char) => !clickedNames.has(char.character.name));

    const shuffleIt: Daum[] = [...clicked];

    while (shuffleIt.length < 6 && remaining.length > 0) {
      const randomIndex = Math.floor(Math.random() * remaining.length);
      const randomChar = remaining[randomIndex];
      shuffleIt.push(randomChar);

      remaining = remaining.filter((char) => char !== randomChar);
    }

    setCharacter(shuffleArr(shuffleIt));

    if (clicked.length === 6) {
      setWin(true);
    }
  }, [level, clicked, allCharacters]);

  function resetGame(): void {
    setCharacter(allCharacters.slice(0, 6));
    setLevel(1);
    setWin(false);
    setGameOver(false);
    setClicked([]);
  }
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center w-[100%] h-[100vh] text-6xl font-medium bg-black/40">
        <img className="w-50" src={loadingGIF} alt="loading.png" />
        <p className="mb-40">Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div className="flex justify-center items-center w-[100%] h-[100vh] text-8xl font-medium bg-black/40">
        <End
          change={error}
          msg={'There was an error fetching data'}
          reset={() => window.location.reload()}>
          <img
            className="bg-cover bg-center w-35 bg-no-repeat bg-fixed"
            src={errorPNG}
            alt="Error"
          />
        </End>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center">
        <End change={gameOver} msg={'You Lose!'} score={`Score: ${level - 2}`} reset={resetGame}>
          <img
            className="bg-cover bg-center w-35 bg-no-repeat bg-fixed"
            src={lostGIF}
            alt="you lose"
          />
        </End>
        <End change={win} msg={'You Win'} score={`Score: ${level - 1}`} reset={resetGame}>
          <img
            className="bg-cover bg-center w-35 bg-no-repeat bg-fixed"
            src={wonGIG}
            alt="you win"
          />
        </End>
        <Game
          char={character}
          setLevel={setLevel}
          level={level}
          setClicked={setClicked}
          setGameOver={setGameOver}
          gameOver={gameOver}
          clicked={clicked}
        />
      </div>
    );
  }
}
