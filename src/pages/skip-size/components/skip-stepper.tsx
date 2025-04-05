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
    icon: <HiOutlineLocationMarker size={20} />,
    checkedIcon: <HiOutlineCheck size={20} />,
    label: "Postcode",
    completed: true,
  },
  {
    icon: <HiOutlineTrash size={20} />,
    checkedIcon: <HiOutlineCheck size={20} />,
    label: "Waste Type",
    completed: true,
  },
  {
    icon: <HiOutlineTruck size={20} />,
    checkedIcon: <HiOutlineCheck size={20} />,
    label: "Select Skip",
    completed: false,
    current: true,
  },
  {
    icon: <HiOutlineShieldCheck size={20} />,
    checkedIcon: <HiOutlineCheck size={20} />,
    label: "Permit Check",
    completed: false,
  },
  {
    icon: <HiOutlineCalendar size={20} />,
    checkedIcon: <HiOutlineCheck size={20} />,
    label: "Choose Date",
    completed: false,
  },
  {
    icon: <HiOutlineCreditCard size={20} />,
    checkedIcon: <HiOutlineCheck size={20} />,
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
                    ? `after:content-[''] after:w-full after:h-0.5 after:inline-block after:absolute lg:after:top-5 after:top-3 after:left-4 ${
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
                  {step.completed ? step.checkedIcon : step.icon}
                </span>
                {/* 모바일에서는 텍스트 숨기고 데스크탑에서만 표시 */}
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
