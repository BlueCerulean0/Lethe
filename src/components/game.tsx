import * as React from 'react';
import { Daum } from './characterInterface';
import { Dispatch, useState, SetStateAction } from 'react';

interface Props {
  char: Daum[];
  setLevel: Dispatch<SetStateAction<number>>;
  level: number;
  setClicked: Dispatch<SetStateAction<Daum[]>>;
  clicked: Daum[];
  setGameOver: Dispatch<SetStateAction<boolean>>;
  gameOver: boolean;
  win: boolean;
  dataID: number;
}

export function Game({
  char,
  setLevel,
  setClicked,
  setGameOver,
  gameOver,
  win,
  dataID
}: Props): React.ReactElement {
  const [allClicked, setAllClicked] = useState(new Map<string, Daum>());
  const [key, setKey] = useState('');

  function clickedCard(key: string, index: number): void {
    setAllClicked((prevClicked) => {
      if (prevClicked.has(key)) {
        setKey(key);
        return prevClicked;
      } else {
        const newClicked = new Map(prevClicked);
        newClicked.set(key, char[index]);
        return newClicked;
      }
    });

    setLevel((curr) => {
      return curr + 1;
    });
  }
  React.useEffect(() => {
    if (allClicked.has(key)) {
      setAllClicked(new Map());
      setKey('');
      setGameOver(true);
    }
  }, [key, allClicked]);

  React.useEffect(() => {
    setAllClicked(new Map());
  }, [win, dataID]);

  React.useEffect(() => {
    setClicked(() => [...allClicked.values()]);
  }, [allClicked]);

  return (
    <div className="flex min-w-full h-auto bg-[rgba(46,44,44,0.31)]">
      <div className="grid place-items-center min-h-screen auto-rows-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4 w-full p-4 mb-2">
        {char.map((eachChar, index) => {
          return (
            <button
              className={`relative lg:w-50 lg:h-80 md:w-55 md:h-90 w-40 h-64 bg-black rounded outline-6 outline-black/35 overflow-hidden transition-all cursor-pointer ${gameOver ? 'pointer-events-none' : ''}`}
              key={index}
              onClick={() => {
                clickedCard(eachChar.character?.name, index);
              }}>
              <img
                className="relative rounded transition-transform  object-cover object-center duration-500 hover:scale-110 active:scale-110 w-full h-full"
                src={`${eachChar?.character?.images?.jpg?.image_url}`}
                alt={eachChar?.character?.name}
              />
              <div className="absolute rounded-t bottom-0 left-1/2 -translate-x-1/2  w-full bg-black opacity-60 h-auto flex items-end justify-center text-white p-1">
                <p className="font-medium text-xl cursor-text">{eachChar?.character?.name}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
