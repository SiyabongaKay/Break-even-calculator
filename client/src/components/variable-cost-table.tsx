import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type CostItem } from "@/lib/calculations";

interface VariableCostTableProps {
  variableCostItems: CostItem[];
  setVariableCostItems: (items: CostItem[]) => void;
}

export function VariableCostTable({ variableCostItems, setVariableCostItems }: VariableCostTableProps) {
  const addVariableCostItem = () => {
    const newItem: CostItem = {
      id: Date.now().toString(),
      description: "",
      amount: 0,
    };
    setVariableCostItems([...variableCostItems, newItem]);
  };

  const removeVariableCostItem = (id: string) => {
    if (variableCostItems.length > 1) {
      setVariableCostItems(variableCostItems.filter(item => item.id !== id));
    }
  };

  const updateVariableCostItem = (id: string, field: keyof CostItem, value: string | number) => {
    setVariableCostItems(variableCostItems.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const totalVariableCosts = variableCostItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold">
              Variable Costs per Learner
            </CardTitle>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Costs that scale with each learner (hosting, support, SMS, etc.)</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Button onClick={addVariableCostItem} size="sm" className="bg-gradient-to-r from-secondary to-emerald-600 hover:from-secondary/90 hover:to-emerald-600/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Variable Cost
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 text-slate-600 font-medium">Description</th>
                <th className="text-right py-2 text-slate-600 font-medium">Cost per Learner (ZAR)</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody>
              {variableCostItems.map((item) => (
                <tr key={item.id}>
                  <td className="py-3">
                    <Input
                      value={item.description}
                      onChange={(e) => updateVariableCostItem(item.id, "description", e.target.value)}
                      placeholder="e.g., Cloud hosting per learner"
                      className="focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </td>
                  <td className="py-3">
                    <Input
                      type="number"
                      value={item.amount || ""}
                      onChange={(e) => updateVariableCostItem(item.id, "amount", parseFloat(e.target.value) || 0)}
                      placeholder="0"
                      className="text-right focus:ring-2 focus:ring-primary focus:border-transparent"
                      step="0.01"
                    />
                  </td>
                  <td className="py-3 text-center">
                    <Button
                      onClick={() => removeVariableCostItem(item.id)}
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive/80"
                      disabled={variableCostItems.length <= 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex justify-between items-center bg-secondary/10 dark:bg-secondary/20 rounded-lg p-4 border border-secondary/20">
            <span className="font-semibold">Total Variable Cost per Learner:</span>
            <span className="font-bold text-2xl text-secondary">R {totalVariableCosts.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}