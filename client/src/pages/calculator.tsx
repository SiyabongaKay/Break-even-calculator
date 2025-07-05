import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from "lucide-react";
import { CostTable } from "@/components/cost-table";
import { FinancialParameters } from "@/components/financial-parameters";
import { ChartsSection } from "@/components/charts-section";
import { calculateMetrics, calculateProjection, type CostItem, type FinancialParams } from "@/lib/calculations";

export default function Calculator() {
  const [costItems, setCostItems] = useState<CostItem[]>([
    { id: "1", description: "Staff Salaries", amount: 45000 },
    { id: "2", description: "Cloud Infrastructure", amount: 8500 },
    { id: "3", description: "Marketing & Sales", amount: 12000 },
  ]);

  const [financialParams, setFinancialParams] = useState<FinancialParams>({
    pricePerLearner: 299,
    variableCostPerLearner: 45,
    initialLearnerCount: 150,
    monthlyGrowthRate: 8.5,
    monthlyChurnRate: 5.2,
  });

  const totalFixedCosts = costItems.reduce((sum, item) => sum + item.amount, 0);
  const metrics = calculateMetrics(totalFixedCosts, financialParams);
  const projection = calculateProjection(financialParams);

  const handleExportPDF = () => {
    // Implementation for PDF export would go here
    console.log("Exporting to PDF...");
  };

  const handleShare = () => {
    // Implementation for sharing would go here
    console.log("Sharing scenario...");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">SaaS Break-Even Calculator</h1>
              <p className="text-slate-600 mt-1">EdTech Platform Financial Planning Tool for South Africa</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleExportPDF} className="bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={handleShare} variant="secondary">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <CostTable costItems={costItems} setCostItems={setCostItems} />
            <FinancialParameters params={financialParams} setParams={setFinancialParams} />

            {/* Quick Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm text-slate-600">Contribution Margin</div>
                    <div className="text-2xl font-bold text-secondary">R {metrics.contributionMargin.toLocaleString()}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm text-slate-600">CM Ratio</div>
                    <div className="text-2xl font-bold text-secondary">{metrics.cmRatio.toFixed(1)}%</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm text-slate-600">Break-even Learners</div>
                    <div className="text-2xl font-bold text-primary">{metrics.breakEvenLearners.toLocaleString()}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="text-sm text-slate-600">Break-even MRR</div>
                    <div className="text-2xl font-bold text-primary">R {metrics.breakEvenMRR.toLocaleString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <ChartsSection 
            projection={projection} 
            fixedCosts={totalFixedCosts}
            metrics={metrics}
          />
        </div>
      </div>
    </div>
  );
}
