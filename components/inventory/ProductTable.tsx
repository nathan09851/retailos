"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Edit3, Check, X } from "lucide-react";
import { Product, StockStatus, SortOption } from "./types";

const STATUS_PILL: Record<StockStatus, string> = {
  Critical:    "bg-red-500/20 text-red-400 border border-red-500/40",
  Low:         "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40",
  Good:        "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
  Overstocked: "bg-blue-500/20 text-blue-400 border border-blue-500/40",
};

interface ProductTableProps {
  products: Product[];
  onStockUpdate: (id: string, newStock: number) => void;
  sortBy: SortOption;
  onSortChange: (s: SortOption) => void;
}

interface InlineEditProps {
  value: number;
  onSave: (v: number) => void;
}

function InlineStockEdit({ value, onSave }: InlineEditProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const commit = () => {
    const n = parseInt(draft, 10);
    if (!isNaN(n) && n >= 0) onSave(n);
    setEditing(false);
  };
  const cancel = () => { setDraft(String(value)); setEditing(false); };

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <input
          autoFocus
          type="number"
          min={0}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") cancel(); }}
          className="w-16 text-sm text-right bg-input border border-primary rounded px-1 py-0.5 focus:outline-none"
        />
        <button onClick={commit} className="text-emerald-400 hover:text-emerald-300"><Check size={13} /></button>
        <button onClick={cancel} className="text-red-400 hover:text-red-300"><X size={13} /></button>
      </div>
    );
  }

  return (
    <button
      onClick={() => { setEditing(true); setDraft(String(value)); }}
      className="flex items-center gap-1 font-semibold hover:text-primary transition-colors group"
    >
      {value}
      <Edit3 size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}

type ColKey = "stock" | "value" | "margin";

const COL_MAP: Record<ColKey, SortOption[]> = {
  stock:  ["stock-asc", "stock-desc"],
  value:  ["value-desc", "stock-asc"],
  margin: ["margin-desc", "stock-asc"],
};

export default function ProductTable({ products, onStockUpdate, sortBy, onSortChange }: ProductTableProps) {
  const handleColSort = (col: ColKey) => {
    const [primary, secondary] = COL_MAP[col];
    onSortChange(sortBy === primary ? secondary : primary);
  };

  const SortIcon = ({ col }: { col: ColKey }) => {
    const active = COL_MAP[col].includes(sortBy);
    if (!active) return <ChevronDown size={13} className="opacity-30" />;
    return sortBy === COL_MAP[col][0]
      ? <ChevronDown size={13} className="text-primary" />
      : <ChevronUp size={13} className="text-primary" />;
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-3">
        <span className="text-5xl">📦</span>
        <p className="text-lg font-semibold">No products found</p>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold text-muted-foreground w-12"></th>
            <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Product</th>
            <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Category</th>
            <th
              className="px-4 py-3 text-right font-semibold text-muted-foreground cursor-pointer hover:text-foreground select-none"
              onClick={() => handleColSort("stock")}
            >
              <span className="flex items-center justify-end gap-1">Stock <SortIcon col="stock" /></span>
            </th>
            <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Reorder Pt</th>
            <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Price</th>
            <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Cost</th>
            <th
              className="px-4 py-3 text-right font-semibold text-muted-foreground cursor-pointer hover:text-foreground select-none"
              onClick={() => handleColSort("margin")}
            >
              <span className="flex items-center justify-end gap-1">Margin <SortIcon col="margin" /></span>
            </th>
            <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence mode="popLayout">
            {products.map((p, idx) => (
              <motion.tr
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${idx % 2 === 0 ? "" : "bg-muted/10"}`}
              >
                <td className="px-4 py-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-9 h-9 rounded-lg object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/36x36/1a1a2e/ffffff?text=?"; }}
                  />
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium leading-snug">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.sku}</p>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                <td className="px-4 py-3 text-right">
                  <InlineStockEdit value={p.stock} onSave={(v) => onStockUpdate(p.id, v)} />
                </td>
                <td className="px-4 py-3 text-right text-muted-foreground">{p.reorderPoint}</td>
                <td className="px-4 py-3 text-right">${p.price.toFixed(2)}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">${p.cost.toFixed(2)}</td>
                <td className={`px-4 py-3 text-right font-semibold ${p.margin > 50 ? "text-emerald-400" : p.margin > 30 ? "text-yellow-400" : "text-red-400"}`}>
                  {p.margin}%
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${STATUS_PILL[p.status]}`}>{p.status}</span>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
