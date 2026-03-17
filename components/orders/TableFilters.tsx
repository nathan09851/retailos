"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { addDays, format } from "date-fns";

import { Table } from "@tanstack/react-table";

interface TableFiltersProps<TData> {
  table: Table<TData>;
}

const TableFilters = <TData,>({ table }: TableFiltersProps<TData>) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const isFiltered = table.getState().rowSelection && Object.keys(table.getState().rowSelection).length > 0;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute w-5 h-5 text-muted-foreground left-3 top-1/2 -translate-y-1/2" />
          <Input placeholder="Search by customer or order..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className="w-[300px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        {isFiltered && (
            <div className="flex items-center gap-2">
                <Button
                variant="outline"
                size="sm"
                >
                Mark as Shipped
                </Button>
                <Button
                variant="outline"
                size="sm"
                >
                Export Selected
                </Button>
            </div>
        )}
      </div>
      <Button>New Order</Button>
    </div>
  );
};

export default TableFilters;
