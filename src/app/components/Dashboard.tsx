import { useState, useEffect } from "react";
import { Region } from "@/app/types/Region";
import { Demand } from "@/app/types/Region";
import ColumnChart from "@/app/components/ColumnChart";
import CardGrid from "@/app/components/CardGrid";
import DashForm from "./DashForm";
import { useRouter } from "next/navigation";

type DashboardProps = {
  region: Region | null;
  tileKey: string | null;
  onCreate: (data: Region) => void;
  onUpdate: (data: Region) => void;
  onDelete: () => void;
};

// Manages all CRUD logic and display stats
export default function Dashboard({
  region,
  tileKey,
  onCreate,
  onUpdate,
  onDelete,
}: DashboardProps) {
  const router = useRouter();
  const [form, setForm] = useState<{ name: string; population: number }>({
    name: "",
    population: 0,
  });
  const [demands, setDemands] = useState<Demand[]>(region?.demands ?? []);
  const [editingRow, setEditingRow] = useState<number | null>(null);

  // const [currentRegion, setRegion] = useState<Region | null>(region);
  // useEffect(() => {
  //   if (currentRegion != null) {
  //     setForm({
  //       name: currentRegion.name,
  //       population: currentRegion.population,
  //     });
  //   } else {
  //     setForm({ name: "", population: 0 });
  //   }
  // }, [region]);

  // useEffect(() => {
  //   setRegion(region);
  // }, [region]);

  useEffect(() => {
    setDemands(region?.demands ?? []);
  }, [region]);

  const handleChange = (
    id: number,
    field: "demand_score" | "quantitySold",
    value: number
  ) => {
    const updated = demands.map((d) => {
      if (d.id === id) {
        if (field === "quantitySold") {
          return { ...d, product: { ...d.product, quantitySold: value } };
        } else {
          return { ...d, [field]: value };
        }
      }
      return d;
    });
    setDemands(updated);
  };

  const saveRow = async (id: number) => {
    const row = demands.find((d) => d.id === id);
    if (row == null) {
      console.log("row null on save");
      return;
    }
    console.log("Saving row with id:", row.id);
    await fetch(`/api/products/${row.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        demand_score: Number(row.demand_score),
        quantitySold: Number(row.product.quantitySold),
      }),
    });
    setEditingRow(null);
  };

  const deleteRow = async (id: number) => {
    const row = demands.find((d) => d.id === id);
    if (row == null) return;
    await fetch(`/api/products/${row.id}`, { method: "DELETE" });
    setDemands((prev) => prev.filter((d) => d.id !== id));
    setEditingRow(null);
  };

  const handleCreate = async () => {
    if (tileKey == null) return;

    const [xTile, zTile] = tileKey.split("-").map(Number);

    const res = await fetch("/api/regions", {
      method: "POST",
      body: JSON.stringify({
        name: form.name,
        population: form.population,
        xTile,
        zTile,
        cityId: region?.cityId,
        products: [],
      }),
    });

    const newRegion: Region = await res.json();
    onCreate(newRegion);
  };

  // region or null
  const isOccupied = region !== null;

  return (
    <>
      <div className="dashboard bg-[linear-gradient(120deg,#020013,#3f0834)] right-0 pt-20 p-6">
        <div className="normalize">
          {/* if region is not utilized display creation form */}
          {isOccupied ? (
            <>
              <h1 className="font-bold text-4xl">{region?.name}</h1>
              <div className="stats m-4 flex flex-col gap-4 mb-12 bg-[linear-gradient(45deg,#020013,#1f0214)] rounded-4xl  border-2 border-black">
                {/* <div>
                  <h2 className="text-xl">Population:</h2>
                  <span className="">{region?.population}</span>
                </div>
                <div>
                  <h2 className="text-xl">Total Demand Score:</h2>
                  <span className="">{totalDemandScore()}</span>
                </div>
                <div>
                  <h2 className="text-xl">Number of Tracked Products:</h2>
                  <span className="">{region?.products.length}</span>
                </div> */}
                <CardGrid region={region} />
              </div>
              <div className="stats m-4 flex flex-col gap-4 mb-12 bg-[linear-gradient(45deg,#020013,#1f0214)] p-4 rounded-4xl  border-2 border-black">
                <h1 className="font-bold text-2xl">Top Products</h1>
                <ColumnChart region={region} />
              </div>
              <div className="stats m-4 flex flex-col gap-4 mb-12 bg-[linear-gradient(45deg,#020013,#1f0214)] p-4 rounded-4xl  border-2 border-black">
                <h1 className="font-bold text-2xl">All Products</h1>
                <table className="table-auto md:table-fixed w-full text-sm text-left rtl:text-right text-bodyborder-white">
                  <thead className="text-sm text-body bg-neutral-800 border border-white/50">
                    <tr>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Product Name
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Demand Score
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Quantity Sold
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium"></th>
                      {/* {editingRow ? (
                        <>
                          <th
                            scope="col"
                            className="px-6 py-3 font-medium"
                          ></th>
                        </>
                      ) : (
                        <></>
                      )} */}
                    </tr>
                  </thead>
                  <tbody>
                    {(demands ?? []).map((p) => {
                      const rowKey = `${p.id}-${p.product.id}`;
                      return editingRow === p.id ? (
                        <tr
                          className="px-6 py-4 font-medium text-heading whitespace-nowrap border border-white/30 bg-indigo-200/20"
                          key={rowKey}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                          >
                            {p.product.productName}
                          </th>
                          <td className="px-6 py-4">
                            <input
                              className="w-16 bg-white/20 text-white p-1 border border-white"
                              type="number"
                              value={
                                demands.find((d) => d.id === p.id)
                                  ?.demand_score ?? 0
                              }
                              onChange={(e) =>
                                handleChange(
                                  p.id,
                                  "demand_score",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td className="px-6 py-4">
                            <input
                              className="w-16 bg-white/20 text-white p-1 border border-white"
                              type="number"
                              value={
                                demands.find((d) => d.id === p.id)?.product
                                  .quantitySold ?? 0
                              }
                              onChange={(e) =>
                                handleChange(
                                  p.id,
                                  "quantitySold",
                                  Number(e.target.value)
                                )
                              }
                            />
                          </td>
                          <td className="px-2 py-4">
                            <button
                              className="edit cursor-pointer m-1"
                              onClick={() => deleteRow(p.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#fff"
                              >
                                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                              </svg>
                            </button>
                            <button
                              className="edit cursor-pointer m-1"
                              onClick={() => saveRow(p.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#fff"
                              >
                                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                              </svg>
                            </button>
                            <button
                              className="edit cursor-pointer"
                              onClick={() => setEditingRow(null)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#fff"
                              >
                                <path d="M200-440v-80h560v80H200Z" />
                              </svg>
                            </button>
                          </td>
                          {/* <td className="px-6 py-4">
                              <button
                                className="edit cursor-pointer"
                                onClick={() => setEditingRow(null)}
                              >
                                Cancel
                              </button>
                            </td> */}
                        </tr>
                      ) : (
                        <tr
                          className="px-6 py-4 font-medium text-heading whitespace-nowrap border border-white/30"
                          key={rowKey}
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                          >
                            {p.product.productName}
                          </th>
                          <td className="px-6 py-4">{p.demand_score}</td>
                          <td className="px-6 py-4">
                            {p.product.quantitySold}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              className="edit cursor-pointer"
                              onClick={() => setEditingRow(Number(p.id))}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 -960 960 960"
                                width="24px"
                                fill="#afafaf"
                              >
                                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <DashForm region={region} onUpdate={onUpdate} />
            </>
          ) : (
            <>
              {/* <h1 className="font-bold text-3xl mb-1">Create Region</h1>
                <h1 className="font-bold text-xl mb-4 ml-6">{tileKey}</h1>
                <div className="flex flex-col gap-4">
                  <input
                    className="p-2 rounded-xl bg-black/40 border border-white/20"
                    placeholder="Region Name"
                    name="name"
                    onChange={(e) =>
                      setForm((s) => ({ ...s, name: e.target.value }))
                    }
                  />

                  <input
                    className="p-2 rounded-xl bg-black/40 border border-white/20"
                    placeholder="Population"
                    name="population"
                    onChange={(e) =>
                      setForm((s) => ({
                        ...s,
                        population: Number(e.target.value),
                      }))
                    }
                  />

                  <button
                    onClick={handleCreate}
                    className="p-2 bg-purple-700 rounded-xl font-bold hover:bg-purple-900 transition"
                  >
                    Create Region
                  </button>
                </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
function async() {
  throw new Error("Function not implemented.");
}
