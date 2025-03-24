import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { AnimeSetch } from './searchInterface';
import { Daum } from './searchInterface';
interface Props {
  quarry: string;
  setDataId: Dispatch<SetStateAction<number>>;
}

export default function Search({ quarry, setDataId }: Props) {
  const [searchResults, setSearchResults] = useState<Daum[]>([]);
  const [fold, setFold] = useState(false);
  const foldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data: AnimeSetch = await animeSearch(quarry);

      await new Promise((resolved) => {
        setTimeout(resolved, 500);
      });
      let animeResArr = data.data !== undefined ? data.data : null;

      if (animeResArr) {
        animeResArr = animeResArr.filter((value) => {
          !(value.status === 'Music');
        });

        setFold(true);
        setSearchResults(data.data);
      }
    };
    fetchData();
  }, [quarry]);

  // useEffect(() => {}, [searchResults, fold]);

  useEffect(() => {
    function handleClickout(event: MouseEvent) {
      if (foldRef.current && event.target && !foldRef.current.contains(event.target as Node)) {
        setFold(false);
      }
    }

    document.addEventListener('mousedown', handleClickout);

    return () => {
      document.removeEventListener('mousedown', handleClickout);
    };
  });
  return (
    <div
      id="scrollSear"
      className={`flex flex-col gap-2  w-full xl:w-lg md:w-lg bg-black/60 fixed z-10 right-0 rounded-b-xl overflow-y-scroll overflow-auto transition-all duration-300 ${!fold ? 'h-0' : 'p-2 h-180 sm:h-140 xl:h-120 md:h-120'}`}
      ref={foldRef}>
      {searchResults.map((value, index) => {
        return (
          <button
            type="button"
            className="flex items-center justify-between bg-gray-900/80 backdrop-blur-lg rounded-lg p-2"
            key={index}
            onClick={() => setDataId(value.mal_id)}>
            <img
              className="object-cover w-30 max-h-55 xl:w-40 rounded-xl cursor-pointer"
              src={`${value.images.jpg.image_url}`}
              alt=""
              onClick={() => setFold(false)}
            />
            <div className="flex flex-col justify-between items-start p-3 text-wrap gap-3">
              <div className="flex justify-between w-full gap-4">
                <h1
                  className="text-sm sm:text-lg text-left font-medium cursor-pointer"
                  onClick={() => setFold(false)}>
                  {value.title_english || value.title}
                </h1>
                <p className="text-sm font-light sm:text-xl sm:font-bold right-0 sm:ml-50 md:m-0 lg:m-0 xl:m-0">
                  {value.score}
                </p>
              </div>
              <div
                id="scrollSyn"
                className="h-35 min-w-[100%] overflow-scroll overflow-x-hidden p-3 rounded-lg bg-gray-600/20">
                <p className="text-md text-left text-wrap cursor-text">{value.synopsis}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

async function animeSearch(quarry: string) {
  if (quarry === '') return { none: 'none' };
  const params = new URLSearchParams({
    q: quarry,
    page: '1',
    order_by: 'score',
    sort: 'desc'
    // type: 'tv,movie,ova,special,ona'
  });

  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime?${[params]}`);

    if (!response.ok) {
      throw new Error(`Error teching ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('There was an error fetching data: ', error);
    return null;
  }
}
