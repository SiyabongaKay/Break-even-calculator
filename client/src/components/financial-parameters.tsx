import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { type FinancialParams } from "@/lib/calculations";

interface FinancialParametersProps {
  params: FinancialParams;
  setParams: (params: FinancialParams) => void;
}

export function FinancialParameters({ params, setParams }: FinancialParametersProps) {
  const updateParam = (field: keyof FinancialParams, value: number) => {
    setParams({ ...params, [field]: value });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">
          Financial Parameters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="pricePerLearner" className="text-sm font-medium text-slate-700">
                Price per Learner (ZAR/month)
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Monthly subscription fee per active learner</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Input
              id="pricePerLearner"
              type="number"
              value={params.pricePerLearner}
              onChange={(e) => updateParam("pricePerLearner", parseFloat(e.target.value) || 0)}
              className="focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Label htmlFor="variableCost" className="text-sm font-medium text-slate-700">
                Total Variable Cost per Learner (ZAR/month)
              </Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Calculated from variable cost table above</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="bg-muted border border-border rounded-md px-3 py-2 font-medium">
              R {params.variableCostPerLearner.toFixed(2)}
            </div>
          </div>
          
          <div>
            <Label htmlFor="initialLearners" className="block text-sm font-medium text-slate-700 mb-2">
              Initial Learner Count
            </Label>
            <Input
              id="initialLearners"
              type="number"
              value={params.initialLearnerCount}
              onChange={(e) => updateParam("initialLearnerCount", parseInt(e.target.value) || 0)}
              className="focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <Label className="block text-sm font-medium text-slate-700 mb-2">
              Monthly Growth Rate (%)
              <span className="text-primary font-semibold ml-2">{params.monthlyGrowthRate}%</span>
            </Label>
            <Slider
              value={[params.monthlyGrowthRate]}
              onValueChange={(value) => updateParam("monthlyGrowthRate", value[0])}
              max={50}
              min={0}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div className="sm:col-span-2">
            <Label className="block text-sm font-medium text-slate-700 mb-2">
              Monthly Churn Rate (%)
              <span className="text-destructive font-semibold ml-2">{params.monthlyChurnRate}%</span>
            </Label>
            <Slider
              value={[params.monthlyChurnRate]}
              onValueChange={(value) => updateParam("monthlyChurnRate", value[0])}
              max={25}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
