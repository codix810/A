"use client";

import { useEffect, useState } from "react";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
const [editing, setEditing] = useState<any>(null);

  const loadProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete product?")) return;

    await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    loadProducts();
  };

  if (loading) return <p>Loading...</p>;
console.log(products);
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Products Management
      </h1>

      <div className="bg-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">

          <thead className="bg-slate-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Gender</th>
              <th>Offer</th>
              <th>Colors</th>
              <th>Sizes</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-t border-slate-700"
              >
                {/* Image */}
<td className="p-3 flex gap-1">
  {p.images?.slice(0,3).map((img:string,i:number)=>(
    <img
      key={i}
      src={img}
      className="w-12 h-12 object-cover rounded"
    />
  ))}
</td>

                <td>{p.name}</td>

                <td className="text-green-400">
                  {p.price} EGP
                </td>

                <td>{p.gender}</td>

                <td>
                  {p.hasOffer ? "🔥 Yes" : "No"}
                </td>

                <td>{p.colors?.join(", ")}</td>

                <td>{p.sizes?.join(", ")}</td>

                <td className="flex gap-2">
  <button
    onClick={() => setEditing(p)}
    className="bg-yellow-500 px-3 py-1 rounded"
  >
    Edit
  </button>

  <button
    onClick={() => deleteProduct(p._id)}
    className="bg-red-500 px-3 py-1 rounded"
  >
    Delete
  </button>
</td>
              </tr>
              
            ))}
          </tbody>

        </table>
        {editing && (
  <EditModal
    product={editing}
    close={() => setEditing(null)}
    reload={loadProducts}
  />
)}
      </div>
    </div>
  );
}
function EditModal({ product, close, reload }: any) {
  const [form, setForm] = useState({
    ...product,
    colors: product.colors.join(","),
    sizes: product.sizes.join(","),
    images: product.images || [],
  });

  /* ========= Upload Image ========= */
  const uploadImage = async (file: File) => {
    if (form.images.length >= 5) {
      alert("Max 5 images");
      return;
    }

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
  };

  /* ========= Delete Image ========= */
  const removeImage = (index: number) => {
    const newImages = [...form.images];
    newImages.splice(index, 1);

    setForm({ ...form, images: newImages });
  };

  /* ========= Drag reorder ========= */
  const moveImage = (from: number, to: number) => {
    const arr = [...form.images];
    const item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);

    setForm({ ...form, images: arr });
  };

  /* ========= Save ========= */
  const save = async () => {
    await fetch(`/api/admin/products/${product._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        colors: form.colors.split(","),
        sizes: form.sizes.split(","),
      }),
    });

    reload();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-slate-800 p-6 rounded-xl w-[600px] space-y-4 max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold">Edit Product</h2>

        {/* ===== Images ===== */}
        <div>
          <p className="mb-2 text-sm text-gray-300">
            Images ({form.images.length}/5)
          </p>

          <div className="grid grid-cols-5 gap-3">

            {form.images.map((img: string, i: number) => (
              <div
                key={i}
                draggable
                onDragStart={(e) =>
                  e.dataTransfer.setData("index", String(i))
                }
                onDrop={(e) => {
                  const from = Number(
                    e.dataTransfer.getData("index")
                  );
                  moveImage(from, i);
                }}
                onDragOver={(e) => e.preventDefault()}
                className="relative group"
              >
                <img
                  src={img}
                  className="w-full h-20 object-cover rounded-lg border border-slate-600"
                />

                {/* delete btn */}
                <button
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 bg-red-500 text-xs px-1 rounded opacity-0 group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Upload */}
            {form.images.length < 5 && (
              <label className="flex items-center justify-center border-2 border-dashed border-slate-600 rounded-lg h-20 cursor-pointer hover:bg-slate-700">
                +
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    uploadImage(e.target.files![0])
                  }
                />
              </label>
            )}
          </div>
        </div>

        {/* ===== Fields ===== */}

        <input
          value={form.name}
          onChange={(e)=>setForm({...form,name:e.target.value})}
          className="input"
          placeholder="Name"
        />

        <textarea
          value={form.description}
          onChange={(e)=>setForm({...form,description:e.target.value})}
          className="input"
          placeholder="Description"
        />

        <input
          value={form.price}
          onChange={(e)=>setForm({...form,price:e.target.value})}
          className="input"
          placeholder="Price"
        />

        <select
          value={form.gender}
          onChange={(e)=>setForm({...form,gender:e.target.value})}
          className="input"
        >
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="unisex">Unisex</option>
        </select>

        <input
          value={form.colors}
          onChange={(e)=>setForm({...form,colors:e.target.value})}
          className="input"
          placeholder="red,blue,black"
        />

        <input
          value={form.sizes}
          onChange={(e)=>setForm({...form,sizes:e.target.value})}
          className="input"
          placeholder="S,M,L"
        />

        <label className="flex gap-2">
          <input
            type="checkbox"
            checked={form.hasOffer}
            onChange={(e)=>setForm({...form,hasOffer:e.target.checked})}
          />
          Has Offer
        </label>

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={save}
            className="bg-green-600 px-4 py-2 rounded"
          >
            Save Changes
          </button>

          <button
            onClick={close}
            className="bg-gray-500 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}