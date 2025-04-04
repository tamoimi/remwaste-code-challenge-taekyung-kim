import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const API_URL =
  "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft";

interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number | null;
  vat: number;
  postcode: string;
  area: string | null;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

function fetchSkips(): Promise<Skip[]> {
  return axios.get<Skip[]>(API_URL).then((res) => res.data);
}

function SkipCard() {
  const {
    data: skips,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skips"],
    queryFn: fetchSkips,
  });

  // 선택된 카드의 ID를 관리하는 상태
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  if (isLoading)
    return (
      <p className="text-center text-lg font-semibold">Loading skips...</p>
    );
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  if (!skips || skips.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No skips available at the moment.
      </p>
    );
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skips.map((skip) => (
          <div
            key={skip.id}
            className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 bg-white"
          >
            <img src="./card-image.jpg" alt="Skip" />
            <h3 className="text-xl font-semibold">
              Size: {skip.size} cubic yards
            </h3>
            <p className="text-gray-700">
              Price:{" "}
              {skip.price_before_vat !== null ? (
                <span className="font-bold text-blue-600">
                  £{skip.price_before_vat.toFixed(2)}
                </span>
              ) : (
                <span className="text-gray-500">Price not available</span>
              )}
            </p>
            <p className="text-gray-700">
              Hire Period: {skip.hire_period_days} days
            </p>

            {/* 도로 위 허용 여부에 따른 UI 변경 */}
            <p
              className={`mt-2 font-semibold ${
                skip.allowed_on_road ? "text-green-600" : "text-red-500"
              }`}
            >
              {skip.allowed_on_road
                ? "✅ Allowed on Road"
                : "❌ Not Allowed on Road"}
            </p>

            {/* 무거운 폐기물 허용 여부 */}
            <p
              className={`mt-1 font-semibold ${
                skip.allows_heavy_waste ? "text-green-600" : "text-red-500"
              }`}
            >
              {skip.allows_heavy_waste
                ? "✔️ Heavy Waste Allowed"
                : "❌ No Heavy Waste"}
            </p>

            {/* 선택 버튼 */}
            <button
              className={`mt-4 px-4 py-2 rounded ${
                selectedCardId === skip.id
                  ? "bg-green-500 text-white cursor-default"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
              disabled={selectedCardId !== null && selectedCardId !== skip.id}
              onClick={() => setSelectedCardId(skip.id)}
            >
              {selectedCardId === skip.id ? "Selected" : "Select This Skip"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkipCard;
