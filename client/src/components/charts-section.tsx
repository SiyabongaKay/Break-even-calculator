import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine } from "recharts";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { type ProjectionMonth, type Metrics } from "@/lib/calculations";

interface ChartsSectionProps {
  projection: ProjectionMonth[];
  fixedCosts: number;
  metrics: Metrics;
}

export function ChartsSection({ projection, fixedCosts, metrics }: ChartsSectionProps) {
  // Find break-even month
  const breakEvenMonth = projection.findIndex(month => month.mrr >= fixedCosts) + 1;
  
  // Format data for charts
  const chartData = projection.map((month, index) => ({
    month: `Month ${index + 1}`,
    monthShort: `M${index + 1}`,
    mrr: month.mrr,
    learners: month.learners,
    breakEvenLine: fixedCosts,
  }));

  const formatCurrency = (value: number) => `R${value.toLocaleString()}`;
  
  const finalProjection = projection[11];
  const arr = finalProjection.mrr * 12;
  const netGrowthRate = metrics.monthlyGrowthRate - metrics.monthlyChurnRate;

  return (
    <div className="space-y-8">
      {/* Charts Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR Forecast Chart */}
        <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:bg-white/80 transition-all duration-300">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                12-Month MRR Forecast
              </CardTitle>
              <div className="flex items-center space-x-3 text-xs">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-1"></div>
                  <span className="text-slate-600">MRR</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-destructive rounded-full mr-1"></div>
                  <span className="text-slate-600">Break-even</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthShort" fontSize={12} />
                  <YAxis tickFormatter={formatCurrency} fontSize={12} />
                  <Tooltip formatter={(value: number) => [formatCurrency(value)]} />
                  <ReferenceLine y={fixedCosts} stroke="#dc2626" strokeDasharray="5 5" />
                  <Line 
                    type="monotone" 
                    dataKey="mrr" 
                    stroke="hsl(207, 90%, 54%)" 
                    strokeWidth={3}
                    dot={{ fill: "hsl(207, 90%, 54%)", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Break-even Indicator */}
            <div className="mt-4">
              {breakEvenMonth > 0 && breakEvenMonth <= 12 ? (
                <div className="p-3 bg-secondary/10 border-l-4 border-secondary rounded-r-lg">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-secondary mr-2" />
                    <span className="font-semibold text-secondary text-sm">Break-even in Month {breakEvenMonth}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    MRR: <span className="font-semibold">R {projection[breakEvenMonth - 1].mrr.toLocaleString()}</span> | 
                    Learners: <span className="font-semibold">{projection[breakEvenMonth - 1].learners.toLocaleString()}</span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />
                    <span className="font-semibold text-amber-600 text-sm">Break-even not reached in 12 months</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Learner Growth Chart */}
        <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:bg-white/80 transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Active Learner Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="monthShort" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="learners" fill="hsl(159, 64%, 43%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Year-End Summary */}
      <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:bg-white/80 transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            12-Month Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-primary to-teal-600 text-white rounded-lg p-4">
              <div className="text-sm opacity-90">Final MRR (Month 12)</div>
              <div className="text-2xl font-bold">R {finalProjection.mrr.toLocaleString()}</div>
            </div>
            
            <div className="bg-gradient-to-r from-secondary to-emerald-600 text-white rounded-lg p-4">
              <div className="text-sm opacity-90">Final Active Learners</div>
              <div className="text-2xl font-bold">{finalProjection.learners.toLocaleString()}</div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-4">
              <div className="text-sm opacity-90">Annual Recurring Revenue</div>
              <div className="text-2xl font-bold">R {arr.toLocaleString()}</div>
            </div>
            
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg p-4">
              <div className="text-sm opacity-90">Net Growth Rate</div>
              <div className="text-2xl font-bold">+{netGrowthRate.toFixed(1)}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
