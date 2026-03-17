"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const steps = [
  { id: 1, title: "Select Customer" },
  { id: 2, title: "Add Products" },
  { id: 3, title: "Set Discount & Confirm" },
];

const NewOrderModal = () => {
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, steps.length));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>New Order</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Order</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <div className="flex items-center">
            {steps.map((s, index) => (
              <>
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    step >= s.id ? "bg-primary text-white" : "bg-secondary"
                  }`}
                >
                  {s.id}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 ${
                      step > s.id ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                )}
              </>
            ))}
          </div>
        </div>
        <div>
          {step === 1 && <div>Customer Selection Content</div>}
          {step === 2 && <div>Product Addition Content</div>}
          {step === 3 && <div>Discount & Confirmation Content</div>}
        </div>
        <div className="flex justify-between">
          {step > 1 && (
            <Button onClick={handlePrev} variant="outline">
              Previous
            </Button>
          )}
          {step < steps.length ? (
            <Button onClick={handleNext} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button type="submit" className="ml-auto">
              Create Order
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderModal;
