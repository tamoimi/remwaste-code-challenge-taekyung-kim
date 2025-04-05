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
    <div className="py-4 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
        {skips.map((skip) => (
          <div
            key={skip.id}
            className={`border rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 bg-white ${
              selectedCardId === skip.id ? "border-blue-500" : "border-gray-300"
            }`}
          >
            <img src="./card-image.jpg" alt="Skip" className="rounded-lg" />
            <h3 className="text-xl font-semibold pt-4">
              {skip.size} Yards Skip
            </h3>

            <p className="text-gray-700">
              {skip.hire_period_days} days hire period
            </p>
            <p className="text-gray-700">
              {skip.price_before_vat !== null ? (
                <span className="font-bold text-blue-600">
                  £{skip.price_before_vat.toFixed(2)} per week
                </span>
              ) : (
                <span className="text-gray-500">Price not available</span>
              )}
            </p>

            {/* <p
              className={`mt-2 font-semibold ${
                skip.allowed_on_road ? "text-blue-600" : "text-red-500"
              }`}
            >
              {skip.allowed_on_road
                ? "✅ Allowed on Road"
                : "❌ Not Allowed on Road"}
            </p>

            <p
              className={`mt-1 font-semibold ${
                skip.allows_heavy_waste ? "text-blue-600" : "text-red-500"
              }`}
            >
              {skip.allows_heavy_waste
                ? "✔️ Heavy Waste Allowed"
                : "❌ No Heavy Waste"}
            </p> */}

            <button
              className={`mt-4 rounded-xl w-full py-2 ${
                selectedCardId === skip.id
                  ? "bg-blue-600 text-white cursor-default"
                  : "bg-blue-600 text-white hover:bg-blue-600"
              }`}
              onClick={() => {
                // 현재 선택된 카드가 다른 카드라면 그 카드를 선택하고, 그렇지 않으면 비선택 상태로 바꿉니다.
                setSelectedCardId(selectedCardId === skip.id ? null : skip.id);
              }}
            >
              {selectedCardId === skip.id ? "Selected" : "Select This Skip"}
            </button>
          </div>
        ))}
      </div>

      {/* 선택된 카드의 합계 영역 (Sticky) */}
      {selectedCardId !== null && (
        <div className="sticky bottom-0 bg-white backdrop-blur-md border-b border-gray-300 p-4 shadow-lg z-10">
          <h3 className="text-xl font-semibold">Selected Skip Summary</h3>
          <div className="mt-2">
            <p>
              <strong>Size:</strong>{" "}
              {skips.find((skip) => skip.id === selectedCardId)?.size} Yards
            </p>
            
            <p>
              <strong>Total Price (before VAT):</strong>{" "}
              {skips.find((skip) => skip.id === selectedCardId)
                ?.price_before_vat !== null
                ? `£${(
                    skips.find((skip) => skip.id === selectedCardId)
                      ?.price_before_vat || 0
                  ).toFixed(2)}`
                : "Price not available"}
            </p>
            <p>
              <strong>VAT:</strong>{" "}
              {skips.find((skip) => skip.id === selectedCardId)?.vat !== null
                ? `£${(
                    skips.find((skip) => skip.id === selectedCardId)?.vat || 0
                  ).toFixed(2)}`
                : "VAT not available"}
            </p>
            <p className="mt-2 font-bold text-blue-600">
              <strong>Total (including VAT):</strong> £
              {selectedCardId !== null &&
              skips.find((skip) => skip.id === selectedCardId)?.price_before_vat
                ? (skips.find((skip) => skip.id === selectedCardId)
                    ?.price_before_vat || 0) +
                  (skips.find((skip) => skip.id === selectedCardId)?.vat || 0)
                : "Price not available"}
            </p>
            <div className="flex gap-6">
              <button className="mt-4 rounded-xl w-full bg-gray-500 text-white py-2">
                Back
              </button>
              <button className="mt-4 rounded-xl w-full bg-blue-600 text-white py-2">
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SkipCard;
