interface StepIndicatorProps {
  currentStep: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const stepLabels = [
    'Шаг 1: Выбор фундамента',
    'Шаг 2: Материал стен',
    'Шаг 3: Размеры бани',
    'Шаг 4: Место строительства',
    'Шаг 5: Контактные данные'
  ];

  return (
    <div className="mb-8 overflow-x-hidden w-full">
      <div className="flex justify-center items-center space-x-1 md:space-x-4 px-4 max-w-full">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="flex items-center flex-shrink-0">
            <div className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-base flex-shrink-0 ${
              s === currentStep ? 'bg-yellow-400 text-black' : s < currentStep ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {s}
            </div>
            {s < 5 && <div className={`w-6 md:w-16 h-1 flex-shrink-0 ${s < currentStep ? 'bg-green-500' : 'bg-gray-300'}`} />}
          </div>
        ))}
      </div>
      <div className="text-center mt-4 text-xs md:text-sm text-gray-600">
        {stepLabels[currentStep - 1]}
      </div>
    </div>
  );
};

export default StepIndicator;
