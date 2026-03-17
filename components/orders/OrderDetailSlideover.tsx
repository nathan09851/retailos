"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";

const OrderDetailSlideover = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Order Details</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          {/* Order details content goes here */}
          <p>Order ID: #1234</p>
          <p>Customer: John Doe</p>
          {/* Timeline of status changes */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OrderDetailSlideover;
