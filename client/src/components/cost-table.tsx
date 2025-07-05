import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { type CostItem } from "@/lib/calculations";

interface CostTableProps {
  costItems: CostItem[];
  setCostItems: (items: CostItem[]) => void;
}

export function CostTable({ costItems, setCostItems }: CostTableProps) {
  const addCostItem = () => {
    const newItem: CostItem = {
      id: Date.now().toString(),
      description: "",
      amount: 0,
    };
    setCostItems([...costItems, newItem]);
  };

  const removeCostItem = (id: string) => {
    if (costItems.length > 1) {
      setCostItems(costItems.filter(item => item.id !== id));
    }
  };

  const updateCostItem = (id: string, field: keyof CostItem, value: string | number) => {
    setCostItems(costItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totalFixedCosts = costItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Fixed Monthly Costs</CardTitle>
          <Button onClick={addCostItem} size="sm" className="bg-secondary hover:bg-secondary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Cost Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-slate-600 font-medium">Description</th>
                <th className="text-right py-2 text-slate-600 font-medium">Amount (ZAR)</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {costItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-3">
                    <Input
                      value={item.description}
                      onChange={(e) => updateCostItem(item.id, "description", e.target.value)}
                      placeholder="Cost Description"
                      className="focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </td>
                  <td className="py-3">
                    <Input
                      type="number"
                      value={item.amount || ""}
                      onChange={(e) => updateCostItem(item.id, "amount", parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="text-right focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </td>
                  <td className="py-3 text-center">
                    <Button
                      onClick={() => removeCostItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive/80"
                      disabled={costItems.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-slate-800">Total Fixed Costs:</span>
            <span className="font-bold text-xl text-primary">R {totalFixedCosts.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
