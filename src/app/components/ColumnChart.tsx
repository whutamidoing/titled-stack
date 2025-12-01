import { useEffect, useState } from "react";
import { Region } from "@/app/types/Region";
import { CartesianGrid, Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";
interface ChartGridProps {
  region: Region;
}
export default function ColumnChart({ region }: ChartGridProps) {
  const topRegionDemands = region.demands
    .slice()
    .sort((a, b) => b.demand_score - a.demand_score)
    .slice(0, 3);
  const chartData = topRegionDemands.map((region) => ({
    name: region.product.productName,
    price: region.product.price,
    demand_score: region.demand_score,
    quantity_sold: region.product.quantitySold,
  }));
  return (
    <div className="max-w-sm w-full bg-neutral-primary-soft border border-white rounded-base shadow-xs p-4 md:p-6 bg-white/10">
      <div className="flex justify-between pb-4 mb-4 border-b border-amber-50/40">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-neutral-primary-medium border border-default-medium flex items-center justify-center rounded-full me-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#ffffff"
            >
              <path d="M856-390 570-104q-12 12-27 18t-30 6q-15 0-30-6t-27-18L103-457q-11-11-17-25.5T80-513v-287q0-33 23.5-56.5T160-880h287q16 0 31 6.5t26 17.5l352 353q12 12 17.5 27t5.5 30q0 15-5.5 29.5T856-390ZM513-160l286-286-353-354H160v286l353 354ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Zm220 160Z" />
            </svg>
          </div>
          <div>
            <h5 className="text-2xl font-semibold text-heading">
              {chartData.reduce((total, e) => total + e.quantity_sold, 0) ?? 0}
            </h5>
            <p className="text-sm text-body">Items sold per week</p>
          </div>
        </div>
        <div>
          <span className="inline-flex items-center bg-success-soft border border-success-subtle text-fg-success-strong text-xs font-medium px-1.5 py-0.5 rounded">
            <svg
              className="w-4 h-4 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v13m0-13 4 4m-4-4-4 4"
              />
            </svg>
            {(() => {
              const totalQuantitySold = chartData.reduce(
                (total, e) => total + e.quantity_sold,
                0
              );
              const overallQuantitySold = region.demands.reduce(
                (total, e) => total + e.product.quantitySold,
                0
              );
              const percent =
                overallQuantitySold === 0
                  ? 0
                  : (totalQuantitySold / overallQuantitySold) * 100;
              return `${percent.toFixed(1)}%`;
            })()}
          </span>
        </div>
      </div>
      <div className="">
        <BarChart
          data={chartData}
          width={300}
          height={200}
          baseValue={10}
          barGap={2}
          barCategoryGap={2}
        >
          <Bar yAxisId="left" dataKey="quantity_sold" fill="#4102ff" />
          <Bar yAxisId="right" dataKey="demand_score" fill="#23ffab" />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" /> {/* for demand_score */}
          <YAxis yAxisId="right" orientation="right" /> {/* for quantitySold */}
          <Tooltip />
        </BarChart>
      </div>
      <div className="grid grid-cols-2">
        <dl className="flex items-center">
          <dt className="text-body text-sm font-normal me-1">Money spent:</dt>
          <dd className="text-heading text-sm font-semibold">
            $
            {chartData.reduce(
              (totalPrice, e) => totalPrice + e.quantity_sold * e.price,
              0
            )}
          </dd>
        </dl>
        {/* <dl className="flex items-center justify-end">
          <dt className="text-body text-sm font-normal me-1">Conversion:</dt>
          <dd className="text-heading text-sm font-semibold">1.2%</dd>
        </dl> */}
      </div>
      <div id="column-chart"></div>
    </div>
  );
}
