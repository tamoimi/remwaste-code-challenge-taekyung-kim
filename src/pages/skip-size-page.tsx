import SkipCard from "./skip-size/components/skip-card";
import SkipStepper from "./skip-size/components/skip-stepper";

function SkipSizePage() {
  return (
    <>
      <SkipStepper />
      <div className="py-3 md:py-6">
        <h2 className="font-bold text-xl md:pb-4 md:text-3xl">
          Choose Your Skip Size
        </h2>
        <h2 className="text-sm md:text-xl">
          Select the skip size that best suits your needs
        </h2>
      </div>

      <SkipCard />
    </>
  );
}

export default SkipSizePage;
