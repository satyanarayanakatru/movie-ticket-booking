import React from 'react';

const SkeletonLoader = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-[#151c28] border border-slate-800 rounded-3xl p-4 space-y-4 animate-pulse shadow-lg"
        >
          {/* Poster Skeleton */}
          <div className="h-52 bg-slate-800 rounded-2xl w-full" />
          {/* Title Skeleton */}
          <div className="h-5 bg-slate-800 rounded-lg w-3/4" />
          {/* Subtext Skeleton */}
          <div className="h-3 bg-slate-800/60 rounded w-1/2" />
          {/* Description Skeleton */}
          <div className="space-y-1.5 pt-2">
            <div className="h-3 bg-slate-800/40 rounded w-full" />
            <div className="h-3 bg-slate-800/40 rounded w-5/6" />
          </div>
          {/* Actions Skeleton */}
          <div className="flex gap-2 pt-3 border-t border-slate-800/60">
            <div className="h-9 bg-slate-800 rounded-full flex-1" />
            <div className="h-9 bg-slate-800 rounded-full flex-1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
