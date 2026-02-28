"use client";

import { useEffect, useState } from "react";

export default function ReviewsAdmin() {
  const [reviews,setReviews]:any = useState([]);

  const load = async ()=>{
    const r = await fetch("/api/admin/reviews");
    setReviews(await r.json());
  };

  useEffect(()=>{load();},[]);

  const remove = async(id:string)=>{
    await fetch(`/api/admin/reviews/${id}`,{
      method:"DELETE"
    });
    load();
  };

  return (
    <div className="p-10 space-y-6 text-white">
      {reviews.map((r:any)=>(
        <div key={r._id} className="bg-slate-800 p-6">
          <p><b>{r.name}</b></p>
          <p>{"★".repeat(r.rating)}</p>
          <p>{r.message}</p>

          <button
            onClick={()=>remove(r._id)}
            className="bg-red-500 px-4 py-1 mt-3"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}