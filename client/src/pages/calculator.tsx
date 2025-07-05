import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { CostTable } from "@/components/cost-table";
import { VariableCostTable } from "@/components/variable-cost-table";
import { FinancialParameters } from "@/components/financial-parameters";
import { ChartsSection } from "@/components/charts-section";
import { calculateMetrics, calculateProjection, type CostItem, type FinancialParams } from "@/lib/calculations";

export default function Calculator() {
  const [costItems, setCostItems] = useState<CostItem[]>([
    { id: "1", description: "Staff Salaries", amount: 45000 },
    { id: "2", description: "Cloud Infrastructure", amount: 8500 },
    { id: "3", description: "Marketing & Sales", amount: 12000 },
  ]);

  const [variableCostItems, setVariableCostItems] = useState<CostItem[]>([
    { id: "1", description: "Cloud hosting per learner", amount: 15 },
    { id: "2", description: "Customer support", amount: 12 },
    { id: "3", description: "SMS notifications", amount: 8 },
    { id: "4", description: "Content delivery", amount: 10 },
  ]);

  const [financialParams, setFinancialParams] = useState<FinancialParams>({
    pricePerLearner: 299,
    variableCostPerLearner: 45,
    initialLearnerCount: 150,
    monthlyGrowthRate: 8.5,
    monthlyChurnRate: 5.2,
  });

  const totalFixedCosts = costItems.reduce((sum, item) => sum + item.amount, 0);
  const totalVariableCosts = variableCostItems.reduce((sum, item) => sum + item.amount, 0);
  
  // Update financial params when variable costs change
  const updatedFinancialParams = {
    ...financialParams,
    variableCostPerLearner: totalVariableCosts
  };
  
  const metrics = calculateMetrics(totalFixedCosts, updatedFinancialParams);
  const projection = calculateProjection(updatedFinancialParams);

  const handleExportPDF = () => {
    // Implementation for PDF export would go here
    console.log("Exporting to PDF...");
  };

  const handleShare = () => {
    // Implementation for sharing would go here
    console.log("Sharing scenario...");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/30">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                SaaS Break-Even Calculator
              </h1>
              <p className="text-slate-600 mt-2 text-lg">EdTech Platform Financial Planning Tool for South Africa</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleExportPDF} className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={handleShare} variant="secondary" className="bg-gradient-to-r from-secondary to-emerald-600 text-white hover:from-secondary/90 hover:to-emerald-600/90 shadow-lg">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-8 animate-fadeInUp">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                <CostTable costItems={costItems} setCostItems={setCostItems} />
              </div>
              <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                <VariableCostTable variableCostItems={variableCostItems} setVariableCostItems={setVariableCostItems} />
              </div>
            </div>
            <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <FinancialParameters params={updatedFinancialParams} setParams={setFinancialParams} />
            </div>
          </div>

          {/* Sidebar with Key Metrics */}
          <div className="lg:col-span-1 space-y-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            {/* Quick Metrics */}
            <Card className="bg-white/60 backdrop-blur-sm shadow-xl border-0 sticky top-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                  Key Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-secondary/10 to-emerald-500/10 rounded-xl p-4 border border-secondary/20 hover:shadow-md transition-all duration-300 animate-pulse-gentle">
                    <div className="text-sm text-slate-600 mb-1">Contribution Margin</div>
                    <div className="text-2xl font-bold text-secondary">R {metrics.contributionMargin.toLocaleString()}</div>
                  </div>
                  <div className="bg-gradient-to-r from-secondary/10 to-emerald-500/10 rounded-xl p-4 border border-secondary/20 hover:shadow-md transition-all duration-300">
                    <div className="text-sm text-slate-600 mb-1">CM Ratio</div>
                    <div className="text-2xl font-bold text-secondary">{metrics.cmRatio.toFixed(1)}%</div>
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-4 border border-primary/20 hover:shadow-md transition-all duration-300">
                    <div className="text-sm text-slate-600 mb-1">Break-even Learners</div>
                    <div className="text-2xl font-bold text-primary">{metrics.breakEvenLearners.toLocaleString()}</div>
                  </div>
                  <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-4 border border-primary/20 hover:shadow-md transition-all duration-300">
                    <div className="text-sm text-slate-600 mb-1">Break-even MRR</div>
                    <div className="text-2xl font-bold text-primary">R {metrics.breakEvenMRR.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section - Full Width */}
          <div className="lg:col-span-3 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <ChartsSection 
              projection={projection} 
              fixedCosts={totalFixedCosts}
              metrics={metrics}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
