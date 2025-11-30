import { useState, useEffect } from "react";
import { Region } from "@/app/types/Region";
import { Product } from "@/app/types/Region";

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
  const [form, setForm] = useState<{ name: string; population: number }>({
    name: "",
    population: 0,
  });

  useEffect(() => {
    if (region) {
      setForm({ name: region.name, population: region.population });
    } else {
      setForm({ name: "", population: 0 });
    }
  }, [region]);

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
        products: [],
      }),
    });

    const newRegion: Region = await res.json();
    onCreate(newRegion);
  };

  const handleUpdate = async () => {
    if (!form.name || !form.population) return;

    const res = await fetch("/api/regions${region.id}", {
      method: "PUT",
      body: JSON.stringify({
        id: region?.id,
        xTile: region?.xTile!,
        zTile: region?.zTile!,
        name: form.name,
        population: form.population,
        products: region?.products ?? [],
      }),
    });

    if (!res.ok) {
      console.error("Failed to update region");
      return;
    }

    const thisRegion: Region = await res.json();
    onUpdate(thisRegion);
  };

  // region or null
  const isOccupied = region;

  const totalDemandScore = () => {
    let total = 0;
    region?.products.forEach((element) => {
      total += element.demand;
    });
    return total;
  };

  return (
    <>
      <div className="dashboard bg-[linear-gradient(120deg,#020013,#3f0834)] right-0 pt-20 p-6">
        <div className="normalize">
          {/* if region is not utilized display creation form */}
          {isOccupied ? (
            <>
              <h1 className="font-bold text-4xl">{region?.name}</h1>
              <div className="stats m-4 flex flex-col gap-4 mb-12 bg-[linear-gradient(45deg,#020013,#1f0214)] p-4 rounded-4xl  border-2 border-black">
                <div>
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
                </div>
              </div>
              <div className="stats m-4 flex flex-col gap-4 mb-12 bg-[linear-gradient(45deg,#020013,#1f0214)] p-4 rounded-4xl  border-2 border-black">
                <div>
                  <h1 className="font-bold text-2xl">Top Products</h1>
                  {(region?.products ?? [])
                    .sort((a: Product, b: Product) => b.demand - a.demand)
                    .slice(0, 3)
                    .map((p: Product, i: number) => (
                      <div key={i}>
                        <h2 className="text-xl">
                          {i}.{p.name} - {p.demand}
                        </h2>
                      </div>
                    ))}
                </div>
                <div>{/* Bar chart thing */}</div>
              </div>
              <div className="stats m-4 flex flex-col gap-4 mb-12 bg-[linear-gradient(45deg,#020013,#1f0214)] p-4 rounded-4xl  border-2 border-black">
                <h1 className="font-bold text-2xl">All Products</h1>
                {(region?.products ?? []).map((p: Product, i: number) => (
                  <div key={i}>
                    <h2 className="text-xl">
                      {i}.{p.name} - {p.demand}
                    </h2>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h1 className="font-bold text-3xl mb-1">Create Region</h1>
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
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
