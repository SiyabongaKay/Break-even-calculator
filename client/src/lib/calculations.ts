export interface CostItem {
  id: string;
  description: string;
  amount: number;
}

export interface FinancialParams {
  pricePerLearner: number;
  variableCostPerLearner: number;
  initialLearnerCount: number;
  monthlyGrowthRate: number;
  monthlyChurnRate: number;
}

export interface Metrics {
  contributionMargin: number;
  cmRatio: number;
  breakEvenLearners: number;
  breakEvenMRR: number;
  monthlyGrowthRate: number;
  monthlyChurnRate: number;
}

export interface ProjectionMonth {
  month: number;
  learners: number;
  mrr: number;
}

export function calculateMetrics(fixedCosts: number, params: FinancialParams): Metrics {
  const contributionMargin = params.pricePerLearner - params.variableCostPerLearner;
  const cmRatio = params.pricePerLearner
      ? (contributionMargin / params.pricePerLearner) * 100
      : 0;
  const breakEvenLearners = contributionMargin > 0
      ? Math.ceil(fixedCosts / contributionMargin)
      : 0;

  const breakEvenMRR = breakEvenLearners * (params.pricePerLearner || 0);


  return {
    contributionMargin,
    cmRatio,
    breakEvenLearners,
    breakEvenMRR,
    monthlyGrowthRate: params.monthlyGrowthRate,
    monthlyChurnRate: params.monthlyChurnRate,
  };
}

export function calculateProjection(params: FinancialParams): ProjectionMonth[] {
  const projection: ProjectionMonth[] = [];
  let currentLearners = params.initialLearnerCount;
  
  for (let month = 1; month <= 12; month++) {
    if (month > 1) {
      const growth = currentLearners * (params.monthlyGrowthRate / 100);
      const churn = currentLearners * (params.monthlyChurnRate / 100);
      currentLearners = Math.max(0, currentLearners + growth - churn);
    }
    
    const mrr = currentLearners * params.pricePerLearner;
    projection.push({
      month,
      learners: Math.round(currentLearners),
      mrr: Math.round(mrr)
    });
  }
  
  return projection;
}
