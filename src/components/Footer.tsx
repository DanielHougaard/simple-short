import React from 'react';

export default function Footer() {
  return (
    <div className="w-full bg-slate-900 flex lg:px-80 md:px-40 max-sm:px-5 justify-between items-center py-4">
      <p className="text-white max-sm:text-sm text-xl">Made by <a href="https://github.com/danielhougaard" className="text-blue-500 font-medium">Daniel Hougaard</a></p>
      <p className="text-white max-sm:text-sm text-xl">Source code on <a href="https://github.com/danielhougaard/simple-short" className="text-blue-500 font-medium">Github</a></p>
    </div>

  );
}
