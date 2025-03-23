import React, { Dispatch, SetStateAction, useState, useRef } from 'react';

interface Props {
  quarry: string;
  setQuarry: Dispatch<SetStateAction<string>>;
}

export default function HeaderSearch({ setQuarry }: Props) {
  const [isfold, setFold] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  function clicked(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (isfold) {
      setFold(false);
    } else {
      setFold(true);
    }
  }

  return (
    <header className="flex justify-between items-center sticky w-full rounded-b-2xl shadow-2xs p-5 z-20 bg-black/50 backdrop-blur-sm top-0 left-0 min-h-8 max-h-16 gap-4">
      <div className="flex items-center justify-center gap-3">
        <p className="font-bold text-3xl xl:text-4xl">Lethe</p>
        <div className="flex w-12 p-2 overflow-hidden transition-all duration-300 md:hover:w-42 sm:hover:w-42 lg:hover:w-42 xl:hover:w-42">
          <a
            className="flex justify-center items-center gap-2"
            href="https://github.com/BlueCerulean0/"
            target="_blank"
            rel="noopener noreferrer">
            <svg
              className="transition-transform duration-500 hover:rotate-360 hover:scale-122 hover:fill-[rgb(147,231,196)] focus:scale-122 focus:fill-cyan-300/80 cursor-pointer"
              viewBox="0 0 16 16"
              width="32"
              height="32"
              fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <p className="">@BlueCerulean0</p>
          </a>
        </div>
      </div>

      <form className="flex justify-center items-center gap-1">
        <input
          type="text"
          name="anime"
          id="anime"
          ref={inputRef}
          className={`rounded-lg outline-white outline-2 text-md font-medium transition-all duration-400 ease-in-out ${isfold ? 'w-0 pointer-events-none opacity-0' : ' bg-black/30 w-48 min-h-8 p-1'}`}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <button
          type="submit"
          onClick={(event) => {
            clicked(event);
            if (inputRef.current) setQuarry(inputRef.current.value);
            setValue('');
          }}
          className="transition-transform duration-300 cursor-pointer hover:scale-105 active:rotate-70">
          <svg
            viewBox="0 0 128 128"
            width="40px"
            height="40px"
            stroke="white"
            strokeWidth={1}
            fill="white">
            {' '}
            <path d="M 52.349609 14.400391 C 42.624609 14.400391 32.9 18.1 25.5 25.5 C 10.7 40.3 10.7 64.399219 25.5 79.199219 C 32.9 86.599219 42.600391 90.300781 52.400391 90.300781 C 62.200391 90.300781 71.900781 86.599219 79.300781 79.199219 C 94.000781 64.399219 93.999219 40.3 79.199219 25.5 C 71.799219 18.1 62.074609 14.400391 52.349609 14.400391 z M 52.300781 20.300781 C 60.500781 20.300781 68.700391 23.399219 74.900391 29.699219 C 87.400391 42.199219 87.4 62.5 75 75 C 62.5 87.5 42.199219 87.5 29.699219 75 C 17.199219 62.5 17.199219 42.199219 29.699219 29.699219 C 35.899219 23.499219 44.100781 20.300781 52.300781 20.300781 z M 52.300781 26.300781 C 45.400781 26.300781 38.9 29 34 34 C 29.3 38.7 26.700391 44.800391 26.400391 51.400391 C 26.300391 53.100391 27.600781 54.4 29.300781 54.5 L 29.400391 54.5 C 31.000391 54.5 32.300391 53.199609 32.400391 51.599609 C 32.600391 46.499609 34.699219 41.799219 38.199219 38.199219 C 41.999219 34.399219 47.000781 32.300781 52.300781 32.300781 C 54.000781 32.300781 55.300781 31.000781 55.300781 29.300781 C 55.300781 27.600781 54.000781 26.300781 52.300781 26.300781 z M 35 64 A 3 3 0 0 0 32 67 A 3 3 0 0 0 35 70 A 3 3 0 0 0 38 67 A 3 3 0 0 0 35 64 z M 83.363281 80.5 C 82.600781 80.5 81.850781 80.800391 81.300781 81.400391 C 80.100781 82.600391 80.100781 84.499609 81.300781 85.599609 L 83.800781 88.099609 C 83.200781 89.299609 82.900391 90.6 82.900391 92 C 82.900391 94.4 83.8 96.700391 85.5 98.400391 L 98.300781 111 C 100.10078 112.8 102.39922 113.69922 104.69922 113.69922 C 106.99922 113.69922 109.29961 112.79961 111.09961 111.09961 C 114.59961 107.59961 114.59961 101.90039 111.09961 98.400391 L 98.300781 85.599609 C 96.600781 83.899609 94.300391 83 91.900391 83 C 90.500391 83 89.2 83.300391 88 83.900391 L 85.5 81.400391 C 84.9 80.800391 84.125781 80.5 83.363281 80.5 z M 91.900391 88.900391 C 92.700391 88.900391 93.5 89.200781 94 89.800781 L 106.69922 102.5 C 107.89922 103.7 107.89922 105.59922 106.69922 106.69922 C 105.49922 107.89922 103.6 107.89922 102.5 106.69922 L 89.800781 94.099609 C 89.200781 93.499609 88.900391 92.700391 88.900391 91.900391 C 88.900391 91.100391 89.200781 90.300781 89.800781 89.800781 C 90.400781 89.200781 91.100391 88.900391 91.900391 88.900391 z" />
          </svg>
        </button>
      </form>
    </header>
  );
}
