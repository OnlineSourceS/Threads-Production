"use client";
// ThemeContext.tsx
import { IThreadSchema } from "@/lib/models/thread.model";
import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the interface for your thread schema

// Define the interface for your thread data
export interface ApiThreadsResponse {
  isNextPage: boolean;
  threads: IThreadSchema[];
  totalThreadsCount: number;
}

// Create a new context
const ThreadsContext = createContext<{
  data: ApiThreadsResponse;
  setData: React.Dispatch<React.SetStateAction<ApiThreadsResponse>>;
}>({
  data: {
    threads: [],
    isNextPage: false,
    totalThreadsCount: 0,
  },
  setData: () => {},
});

// Create a context provider component
export const ThreadsProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ApiThreadsResponse>({
    threads: [],
    isNextPage: false,
    totalThreadsCount: 0,
  });

  return (
    <ThreadsContext.Provider value={{ data, setData }}>
      {children}
    </ThreadsContext.Provider>
  );
};

// Create a custom hook to use the thread context
export const useThreads = () => useContext(ThreadsContext);
