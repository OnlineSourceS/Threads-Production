import React, { useEffect } from "react";

function PostReel() {
  
  return (
    <div
      className="rounded-lg border bg-gray-900 text-gray-200 max-w-full"
      data-v0-t="card"
    >
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="font-semibold whitespace-nowrap tracking-tight text-2xl">
          Upload your Reel
        </h3>
        <p className="text-sm text-gray-400">
          Share your amazing moments with the world.
        </p>
      </div>
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm ring-offset-gray-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="title"
            placeholder="Enter the title"
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="flex w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm ring-offset-gray-800 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
            id="description"
            placeholder="Enter the description"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="file"
          >
            File
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm ring-offset-gray-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="file"
            type="file"
          />
        </div>
        <div className="space-y-2">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="tags"
          >
            Tags
          </label>
          <input
            className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm ring-offset-gray-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            id="tags"
            placeholder="e.g. travel, adventure"
          />
          <div>Enter tags separated by commas.</div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Privacy
          </label>
          <div className="space-y-2">
            <div
              role="radiogroup"
              aria-required="false"
              dir="ltr"
              className="grid gap-2"
               style={{ outline: "none" }}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-violet-500 text-gray-100 hover:bg-violet-400 h-10 px-4 py-2 w-full">
          Upload Reel
        </button>
      </div>
    </div>
  );
}

export default PostReel;
