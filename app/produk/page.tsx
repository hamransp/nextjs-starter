'use client';
import React from 'react';
import { json } from 'stream/consumers';
import useSWR, { Key, Fetcher } from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function page() {
  const { data, error, isLoading } = useSWR(
    `https://dummyjson.com/quotes?limit=6`,
    fetcher
  );
  // console.log('datanya : ', JSON.stringify(data));
  if (error) return <div>Failed to fetch characters.</div>;
  if (isLoading) return <h2>Loading...</h2>;
  //  looping data quotes
  return data.quotes.map((item: any) => (
    <div key={item.id} className="p-4 my-2 rounded-lg bg-slate-400">
      <h3 className="text-2xl">{item.quote}</h3>
      <p className="italic text-mute">{item.author}</p>
    </div>
  ));
}
