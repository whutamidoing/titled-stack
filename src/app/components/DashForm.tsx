export default function DashForm() {
  return (
    <>
      <form>
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
                    name="name"
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
                    name="price"
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
                    name="quantity-sold"
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
                    name="demand"
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
            type="button"
            className="text-sm/6 font-semibold text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-500 hover:bg-indigo-400 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 cursor-pointer transition-colors"
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
