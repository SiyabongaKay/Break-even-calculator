import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Plus, Trash2} from "lucide-react";
import {type CostItem} from "@/lib/calculations";

interface CostTableProps {
    costItems: CostItem[],
    setCostItems: (items: CostItem[]) => void,
    costType?: "Fixed" | "Variable";
}

export function CostTable({costItems, setCostItems, costType}: CostTableProps) {
    const addCostItem = () => {
        const newItem: CostItem = {
            id: Date.now().toString(),
            description: "",
            amount: 0,
        };
        setCostItems([...costItems, newItem]);
    };

    const removeCostItem = (id: string) => {
        setCostItems(costItems.filter(item => item.id !== id));
    };

    const updateCostItem = (id: string, field: keyof CostItem, value: string | number) => {
        setCostItems(costItems.map(item =>
            item.id === id ? {...item, [field]: value} : item
        ));
    };

    const totalFixedCosts = costItems.reduce((sum, item) => sum + item.amount, 0);

    return (
        <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:bg-white/80 transition-all duration-300">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle
                        className="text-xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                        {costType === "Fixed" ? "Fixed Monthly" : "Variable"} Costs per Learner
                    </CardTitle>
                    <Button onClick={addCostItem} size="sm"
                            className="bg-gradient-to-r from-secondary to-emerald-600 hover:from-secondary/90 hover:to-emerald-600/90 shadow-lg text-white">
                        <Plus className="w-4 h-4 mr-2"/>
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
                                    >
                                        <Trash2 className="w-4 h-4"/>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/50">
                    <div
                        className="flex justify-between items-center bg-gradient-to-r from-primary/5 to-blue-500/5 rounded-lg p-4 border border-primary/20">
                        <span
                            className="font-semibold text-slate-800">Total {costType === "Fixed" ? "Fixed Monthly" : "Variable"} Costs:</span>
                        <span className="font-bold text-2xl text-primary">R {totalFixedCosts.toLocaleString()}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
