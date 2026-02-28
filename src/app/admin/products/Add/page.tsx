"use client";

import { useState } from "react";

export default function ProductsAdmin() {
  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    price: "",
    hasOffer: false,
    gender: "unisex",
    colors: "",
    sizes: "",
    images: [],
  });
const [uploading, setUploading] = useState(false);
const uploadImage = async (file: File) => {
  setUploading(true);

  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: fd,
  });

  const data = await res.json();

  setForm((prev: any) => ({
    ...prev,
    images: [...prev.images, data.url],
  }));

  setUploading(false);
};

const submit = async () => {

  if (uploading) {
    alert("Wait until images finish uploading");
    return;
  }

  if (form.images.length === 0) {
    alert("Add at least one image");
    return;
  }

  await fetch("/api/admin/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...form,
      price: Number(form.price),
      colors: form.colors.split(","),
      sizes: form.sizes.split(","),
    }),
  });

  alert("Product Added ✅");
};

  return (
    <div className="space-y-4 max-w-xl">

      <h1 className="text-2xl font-bold">Add Product</h1>

      <input placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})}
        className="input"/>

      <textarea placeholder="Description"
        onChange={(e)=>setForm({...form,description:e.target.value})}
        className="input"/>

      <input placeholder="Price"
        onChange={(e)=>setForm({...form,price:e.target.value})}
        className="input"/>

      {/* Offer */}
      <label className="flex gap-2">
        <input type="checkbox"
          onChange={(e)=>setForm({...form,hasOffer:e.target.checked})}/>
        Has Offer
      </label>

      {/* Gender */}
<select
  value={form.gender}   // ✅ مهم جدا
  onChange={(e)=>setForm({...form,gender:e.target.value})}
  className="input"
>
  <option value="men">Men</option>
  <option value="women">Women</option>
  <option value="unisex">Unisex</option>
</select>

      <input placeholder="Colors (red,blue,black)"
        onChange={(e)=>setForm({...form,colors:e.target.value})}
        className="input"/>

      <input placeholder="Sizes (S,M,L,XL)"
        onChange={(e)=>setForm({...form,sizes:e.target.value})}
        className="input"/>

      {/* Images */}
      <input
        type="file"
        multiple
        onChange={(e)=>{
          const files = Array.from(e.target.files || []);
          files.slice(0,5).forEach(uploadImage);
        }}
      />

      <p>{form.images.length}/5 images uploaded</p>

<button
  disabled={uploading}
  onClick={submit}
  className="bg-blue-600 px-4 py-2 rounded disabled:opacity-50"
>
  {uploading ? "Uploading Images..." : "Add Product"}
</button>

    </div>
  );
}