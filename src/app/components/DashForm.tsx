import { Region } from "@/app/types/Region";
import { useState, useEffect } from "react";

interface DashFormProps {
  region: Region | null;
  onUpdate: (region: Region) => void;
}

export default function DashForm({ region, onUpdate }: DashFormProps) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantitySold: "",
    demandScore: "",
  });

  const handleAddProduct = async () => {
    if (region == null) {
      console.log("Form failed");
      return;
    }
    console.log("Region passed to DashForm:", region);
    const res = await fetch(`/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productName: form.name,
        price: parseFloat(form.price),
        quantitySold: parseInt(form.quantitySold),
        demandScore: parseInt(form.demandScore),
        regionId: region?.id,
      }),
    });
    if (!res.ok) {
      console.error("Failed to update region");
      return;
    }

    const updatedRegion: Region = await res.json();
    setForm({ name: "", price: "", quantitySold: "", demandScore: "" });
    onUpdate(updatedRegion);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddProduct();
        }}
      >
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">
              Add a product
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-2 sm:col-start-1">
                <label className="block text-sm/6 font-medium text-white">
                  Product Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="ex. Coffee"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm/6 font-medium text-white">
                  Price
                </label>
                <div className="mt-2">
                  <input
                    id="price"
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        price: e.target.value,
                      })
                    }
                    placeholder="ex. 100"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6 overflow-hidden"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm/6 font-medium text-white">
                  Quantity Sold
                </label>
                <div className="mt-2">
                  <input
                    id="quantity-sold"
                    type="number"
                    value={form.quantitySold}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        quantitySold: e.target.value,
                      })
                    }
                    placeholder="ex. 72"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm/6 font-medium text-white">
                  Demand Score
                </label>
                <div className="mt-2">
                  <input
                    id="demand"
                    type="number"
                    value={form.demandScore}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        demandScore: e.target.value,
                      })
                    }
                    placeholder="ex. 100"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-800 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
