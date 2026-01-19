import StepIndicator from "@/components/order-form/StepIndicator";
import FormStep from "@/components/order-form/FormStep";
import { useOrderForm } from "@/components/order-form/useOrderForm";
import SuccessModal from "@/components/SuccessModal";

const OrderFormSection = () => {
  const {
    step,
    setStep,
    material,
    setMaterial,
    length,
    setLength,
    width,
    setWidth,
    partitionsLength,
    setPartitionsLength,
    floors,
    setFloors,
    foundation,
    setFoundation,
    location,
    setLocation,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    messenger,
    setMessenger,
    comment,
    setComment,
    isSubmitting,
    showSuccess,
    setShowSuccess,
    handleSubmit
  } = useOrderForm();

  return (
    <section id="order" className="py-20 px-4 sm:px-6 w-full overflow-x-hidden bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 px-2">
          Калькулятор стоимости бани
        </h2>

        <StepIndicator currentStep={step} />

        <FormStep
          step={step}
          foundation={foundation}
          setFoundation={setFoundation}
          material={material}
          setMaterial={setMaterial}
          length={length}
          setLength={setLength}
          width={width}
          setWidth={setWidth}
          partitionsLength={partitionsLength}
          setPartitionsLength={setPartitionsLength}
          floors={floors}
          setFloors={setFloors}
          location={location}
          setLocation={setLocation}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          messenger={messenger}
          setMessenger={setMessenger}
          comment={comment}
          setComment={setComment}
          isSubmitting={isSubmitting}
          setStep={setStep}
          handleSubmit={handleSubmit}
        />
        <SuccessModal open={showSuccess} onClose={() => setShowSuccess(false)} />
      </div>
    </section>
  );
};

export default OrderFormSection;