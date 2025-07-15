import React, { useState,useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CostTable } from "@/components/cost-table";
import { FinancialParameters } from "@/components/financial-parameters";
import { ChartsSection } from "@/components/charts-section";
import { calculateMetrics, calculateProjection, type CostItem, type FinancialParams } from "@/lib/calculations";
import "./calculator.css";

function useSessionStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const stored = sessionStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default function Calculator() {
  const [costItems, setCostItems] = useSessionStorage<CostItem[]>("fixedCosts", []);
  const [variableCostItems, setVariableCostItems] = useSessionStorage<CostItem[]>("variableCosts", []);
  const [financialParams, setFinancialParams] = useSessionStorage<FinancialParams>("financialParams", {
    pricePerLearner: 0,
    variableCostPerLearner: 0,
    initialLearnerCount: 0,
    monthlyGrowthRate: 0,
    monthlyChurnRate: 0,
  });

  const totalFixedCosts = costItems.reduce((sum, item) => sum + item.amount, 0);
  const totalVariableCosts = variableCostItems.reduce((sum, item) => sum + item.amount, 0);
  const updatedFinancialParams = {
    ...financialParams,
    variableCostPerLearner: totalVariableCosts
  };

  const metrics = calculateMetrics(totalFixedCosts, updatedFinancialParams);
  const projection = calculateProjection(updatedFinancialParams);

  return (
      <div className="calculator-container">
        {/* Header */}
        <header className="calculator-header">
          <div className="header-inner">
            <div className="header-title-group">
              <h1 className="app-title">NextClass Break-Even Calculator</h1>
              <p className="app-subtitle">EdTech Platform Financial Planning Tool for South Africa</p>
            </div>
          </div>
        </header>

        <div className="main-content">
          <div className="grid-layout">
            <div className="input-section">
              <div className="input-grid">
                <div className="cost-table-wrapper">
                  <CostTable costItems={costItems} setCostItems={setCostItems} costType="Fixed" />
                </div>
                <div className="variable-cost-table-wrapper">
                  <CostTable costItems={variableCostItems} setCostItems={setVariableCostItems} costType="Variable" />
                </div>
              </div>
              <div className="financial-params-wrapper">
                <FinancialParameters params={updatedFinancialParams} setParams={setFinancialParams} />
              </div>
            </div>

            <div className="sidebar">
              <Card className="metrics-card">
                <CardHeader className="card-header">
                  <CardTitle className="metrics-title">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="metrics-container">
                    <div className="metric metric-highlight">
                      <div className="metric-label">Contribution Margin</div>
                      <div className="metric-value">R {metrics.contributionMargin.toLocaleString()}</div>
                    </div>
                    <div className="metric">
                      <div className="metric-label">CM Ratio</div>
                      <div className="metric-value">{metrics.cmRatio.toFixed(1)}%</div>
                    </div>
                    <div className="metric">
                      <div className="metric-label">Break-even Learners</div>
                      <div className="metric-value">{metrics.breakEvenLearners.toLocaleString()}</div>
                    </div>
                    <div className="metric">
                      <div className="metric-label">Break-even MRR</div>
                      <div className="metric-value">R {metrics.breakEvenMRR.toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="charts-section">
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
