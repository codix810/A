"use client";

import { useEffect, useState } from "react";

export default function AdminMessages() {
  const [messages, setMessages]: any = useState([]);

  const load = async () => {
    const res = await fetch("/api/admin/messages");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    load();
  }, []);

  const remove = async (id: string) => {
    await fetch(`/api/admin/messages/${id}`, {
      method: "DELETE",
    });
    load();
  };

  const reply = async (id: string, text: string) => {
    await fetch(`/api/admin/messages/reply/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: text }),
    });

    load();
  };

  return (
    <div className="p-10 space-y-6 text-white">

      <h1 className="text-3xl font-bold">
        User Messages
      </h1>

      {messages.map((msg: any) => (
        <MessageCard
          key={msg._id}
          msg={msg}
          onDelete={remove}
          onReply={reply}
        />
      ))}
    </div>
  );
}

function MessageCard({ msg, onDelete, onReply }: any) {
  const [text, setText] = useState("");

  return (
    <div className="bg-slate-800 p-6 rounded-xl space-y-3">

      <p><b>{msg.name}</b> ({msg.email})</p>

      <p className="text-gray-300">
        {msg.message}
      </p>

      {msg.reply && (
        <p className="text-green-400">
          Admin Reply: {msg.reply}
        </p>
      )}

      <textarea
        placeholder="Write reply..."
        className="w-full p-2 text-black"
        onChange={(e)=>setText(e.target.value)}
      />

      <div className="flex gap-3">
        <button
          onClick={()=>onReply(msg._id, text)}
          className="bg-yellow-400 text-black px-4 py-1"
        >
          Reply
        </button>

        <button
          onClick={()=>onDelete(msg._id)}
          className="bg-red-600 px-4 py-1"
        >
          Delete
        </button>
      </div>

    </div>
  );
}