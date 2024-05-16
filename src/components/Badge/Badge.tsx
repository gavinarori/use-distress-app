import React from 'react';

const Badge = ({ label }:any) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-sky-100 text-sky-800 border border-sky-200">
      <svg
        className="-ml-0.5 mr-1.5 h-2 w-2 text-sky-400"
        fill="currentColor"
        viewBox="0 0 8 8"
      >
        <circle cx="4" cy="4" r="3" />
      </svg>
      {label}
    </span>
  );
};

export default Badge;
