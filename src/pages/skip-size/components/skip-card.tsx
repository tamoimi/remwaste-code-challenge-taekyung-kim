import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchSkips } from "../../lib/api";
import { Skip } from "../../types/skip-type";
import LoadingSkeletonCard from "./skip-skeleton";
import { HiOutlineX } from "react-icons/hi";

function SkipCard() {
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);
  const {
    data: skips,
    isLoading,
    error,
  } = useQuery<Skip[], Error>({
    queryKey: ["skips"],
    queryFn: fetchSkips,
  });

  const skeletonCount = !isLoading && skips ? skips.length : 12;

  if (isLoading) {
    return (
      <div className="py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
        {[...Array(skeletonCount)].map((_, index) => (
          <LoadingSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error)
    return (
      <p className="text-center text-red-500">
        Error: {(error as Error).message}
      </p>
    );

  if (!skips || skips.length === 0) {
    return (
      <p className="text-center text-gray-600">
        No skips available at the moment.
      </p>
    );
  }

  const selectedSkip = skips.find((skip) => skip.id === selectedCardId);

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 text-left">
        {skips.map((skip) => (
          <div
            key={skip.id}
            className={`border-1 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 bg-white hover:bg-neutral-200 ${
              selectedCardId === skip.id
                ? "border-blue-500 border-2"
                : "border-neutral-300"
            } `}
          >
            <img src="./card-image.jpg" alt="Skip" className="rounded-lg" />
            <h3 className="text-xl font-bold pt-4">{skip.size} Yards Skip</h3>
            <p className="text-neutral-700 pb-3">
              {skip.hire_period_days} days hire period
            </p>
            <p className="text-neutral-700">
              {skip.price_before_vat !== null ? (
                <>
                  <span className="font-bold text-blue-600 text-xl">
                    £{skip.price_before_vat.toFixed(2)}
                  </span>
                  <span className="text-sm"> per week</span>
                </>
              ) : (
                <span className="text-neutral-500">Price not available</span>
              )}
            </p>

            <button
              className={`mt-4 rounded-xl w-full py-2 cursor-pointer ${
                selectedCardId === skip.id
                  ? "bg-blue-600 text-white cursor-default"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={() =>
                setSelectedCardId(selectedCardId === skip.id ? null : skip.id)
              }
            >
              {selectedCardId === skip.id ? "Selected" : "Select This Skip"}
            </button>
          </div>
        ))}
      </div>

      {selectedSkip && (
        <div
          className="fixed bottom-0 left-0 right-0 bg-white border-neutral-400 p-4 z-10 transition-all duration-500 ease-in-out"
          style={{
            transform: selectedCardId ? "translateY(0)" : "translateY(100%)",
            boxShadow: "0 -4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="flex justify-between items-center">
            <h3 className="lg:text-xl font-semibold">Selected Skip Summary</h3>

            <HiOutlineX onClick={() => setSelectedCardId(null)} size={20} />
          </div>
          <div className="mt-2">
            <p className="text-sm md:text-lg">
              <strong>Size:</strong> {selectedSkip.size} Yards
            </p>
            <p className="text-sm md:text-lg">
              <strong>Total Price (before VAT):</strong>{" "}
              {selectedSkip.price_before_vat !== null
                ? `£${selectedSkip.price_before_vat.toFixed(2)}`
                : "Price not available"}
            </p>
            <p className="text-sm md:text-lg">
              <strong>VAT:</strong> £{selectedSkip.vat.toFixed(2)}
            </p>
            <p className=" text-blue-600 text-sm md:text-lg">
              <strong>Total (including VAT):</strong> £
              {(
                (selectedSkip.price_before_vat || 0) + selectedSkip.vat
              ).toFixed(2)}
            </p>
            <div className="flex gap-6">
              <button
                className="mt-4 rounded-xl w-full bg-neutral-500 text-white py-2 cursor-pointer"
                onClick={() => setSelectedCardId(null)}
              >
                Back
              </button>
              <button className="mt-4 rounded-xl w-full bg-blue-600 text-white py-2 cursor-pointer">
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
