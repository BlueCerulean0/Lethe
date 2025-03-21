import { ReactNode } from 'react';

interface Props {
  change: boolean;
  msg: string;
  score?: string;
  reset: any;
  children?: ReactNode;
}

export default function End({ change, msg, score, reset, children }: Props) {
  return (
    <div
      className={`justify-between flex-col items-center fixed z-10 w-96 h-80 p-4 bg-black/80 rounded-2xl transition-all ease-in-out duration-300 ${change ? 'flex opacity-100 top-55 lg:top-50' : 'flex top-200 opacity-0'}`}>
      <p className="text-4xl font-medium text-center">{msg}!</p>
      {children}
      <p className="text-2xl font-bold flex items-center justify-between gap-5">
        <span className="text-orange-600 text-3xl">{score}</span>
      </p>
      <button
        type="button"
        className="font-medium text-2xl text-white bg-blue-600 p-2 rounded-xl cursor-pointer"
        onClick={reset}>
        Reset
      </button>
    </div>
  );
}
