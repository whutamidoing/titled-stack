import { Region } from "@/app/types/Region";
import GroupIcon from "../assets/icons/group.svg";

interface CardGridProps {
  region: Region;
}

export default function CardGrid({ region }: CardGridProps) {
  const totalDemandScore = () => {
    let total = 0;
    region?.demands.forEach((element) => {
      total += element.demand_score;
    });
    return total;
  };
  return (
    <div className="container px-6 py-12 mx-auto text-white">
      <div className="flex flex-wrap -m-4 text-center flex-col">
        <div className="p-2 w-full">
          <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 hover:bg-purple-900/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="oklch(58.5% 0.233 277.117)"
              className="text-indigo-500 w-12 h-12 mb-3 inline-block"
            >
              <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
            </svg>
            <h2 className="title-font font-medium text-3xl text-white">
              {region.population}
            </h2>
            <p className="leading-relaxed">Population</p>
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 hover:bg-purple-900/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="oklch(58.5% 0.233 277.117)"
              className="text-indigo-500 w-12 h-12 mb-3 inline-block"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" />
            </svg>
            <h2 className="title-font font-medium text-3xl text-white">
              {region.demands.length}
            </h2>
            <p className="leading-relaxed">Number of Tracked Products</p>
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110 hover:bg-purple-900/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="oklch(58.5% 0.233 277.117)"
              className="text-indigo-500 w-12 h-12 mb-3 inline-block"
            >
              <path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
            </svg>
            <h2 className="title-font font-medium text-3xl text-white">
              {totalDemandScore()}
            </h2>
            <p className="leading-relaxed">Total Demand Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}
