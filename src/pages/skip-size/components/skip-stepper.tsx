import {
  HiOutlineCalendar,
  HiOutlineCreditCard,
  HiOutlineShieldCheck,
  HiOutlineTrash,
  HiOutlineTruck,
  HiOutlineCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";

const steps = [
  {
    icon: <HiOutlineLocationMarker />,
    checkedIcon: <HiOutlineCheck />,
    label: "Postcode",
    completed: true,
  },
  {
    icon: <HiOutlineTrash />,
    checkedIcon: <HiOutlineCheck />,
    label: "Waste Type",
    completed: true,
  },
  {
    icon: <HiOutlineTruck />,
    checkedIcon: <HiOutlineCheck />,
    label: "Select Skip",
    completed: false,
    current: true,
  },
  {
    icon: <HiOutlineShieldCheck />,
    checkedIcon: <HiOutlineCheck />,
    label: "Permit Check",
    completed: false,
  },
  {
    icon: <HiOutlineCalendar />,
    checkedIcon: <HiOutlineCheck />,
    label: "Choose Date",
    completed: false,
  },
  {
    icon: <HiOutlineCreditCard />,
    checkedIcon: <HiOutlineCheck />,
    label: "Payment",
    completed: false,
  },
];

function SkipStepper() {
  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center">
        <ol className="flex w-full text-xs text-gray-900 font-medium sm:text-base">
          {steps.map((step, index) => (
            <li
              key={index}
              className={`
                flex 
                ${index < steps.length - 1 ? "w-full" : ""} 
                relative 
                ${step.completed ? "text-blue-600" : "text-gray-900"} 
                ${
                  index < steps.length - 1
                    ? `after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-6 ${
                        step.completed || (index === 0 && steps[1].completed)
                          ? "after:bg-blue-600"
                          : "after:bg-gray-200"
                      }`
                    : ""
                }
              `}
            >
              <div className="block whitespace-nowrap z-10">
                <span
                  className={`
                    w-6 h-6 
                    sm:w-8 sm:h-8 
                    lg:w-10 lg:h-10 
                    rounded-full 
                    flex justify-center items-center 
                    mx-auto mb-3 
                    text-sm 
                    ${
                      step.completed
                        ? "bg-blue-600 border-2 border-transparent text-white"
                        : step.current
                        ? "bg-indigo-50 border-2 border-blue-600 text-blue-600"
                        : "bg-gray-50 border-2 border-gray-200"
                    }
                  `}
                >
                  {step.completed ? (
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                      {step.checkedIcon}
                    </span>
                  ) : (
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl">
                      {step.icon}
                    </span>
                  )}
                </span>

                <span className="hidden sm:inline">{step.label}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SkipStepper;
