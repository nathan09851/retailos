"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/orders/DataTable";
import { columns, Order } from "@/components/orders/columns";
import TableFilters from "@/components/orders/TableFilters";

async function getData(): Promise<Order[]> {
  const res = await fetch("/api/orders");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const OrdersPage = () => {
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={data}>
        {(table) => <TableFilters table={table} />}
      </DataTable>
    </div>
  );
};

export default OrdersPage;
