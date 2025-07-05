import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Info, TrendingUp, Users, Target } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EnhancementSettings {
  addOnRevenue: {
    enabled: boolean;
    price: number;
    penetrationRate: number;
  };
  freemiumModel: {
    enabled: boolean;
    freeUserBase: number;
    conversionRate: number;
  };
  sensitivityAnalysis: {
    churnVariation: number;
    growthVariation: number;
  };
}

interface EnhancementsPanelProps {
  settings: EnhancementSettings;
  setSettings: (settings: EnhancementSettings) => void;
}

export function EnhancementsPanel({ settings, setSettings }: EnhancementsPanelProps) {
  const updateSetting = (category: keyof EnhancementSettings, field: string, value: any) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [field]: value
      }
    });
  };

  const runSensitivityAnalysis = () => {
    console.log("Running sensitivity analysis with variations:", settings.sensitivityAnalysis);
    // Implementation would calculate scenarios with different churn/growth rates
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:bg-white/80 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
          Advanced Modeling
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="addons" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="addons" className="text-xs">Add-ons</TabsTrigger>
            <TabsTrigger value="freemium" className="text-xs">Freemium</TabsTrigger>
            <TabsTrigger value="sensitivity" className="text-xs">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="addons" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <Label htmlFor="addon-toggle" className="text-sm font-medium">Enable Add-on Revenue</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Additional revenue from premium features</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                id="addon-toggle"
                checked={settings.addOnRevenue.enabled}
                onCheckedChange={(checked) => updateSetting('addOnRevenue', 'enabled', checked)}
              />
            </div>
            
            {settings.addOnRevenue.enabled && (
              <div className="space-y-4 pl-6 border-l-2 border-primary/20">
                <div>
                  <Label className="text-sm text-slate-600">Add-on Price (ZAR/month)</Label>
                  <Input
                    type="number"
                    value={settings.addOnRevenue.price}
                    onChange={(e) => updateSetting('addOnRevenue', 'price', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                    placeholder="499"
                  />
                </div>
                <div>
                  <Label className="text-sm text-slate-600">
                    Penetration Rate: {settings.addOnRevenue.penetrationRate}%
                  </Label>
                  <Slider
                    value={[settings.addOnRevenue.penetrationRate]}
                    onValueChange={(value) => updateSetting('addOnRevenue', 'penetrationRate', value[0])}
                    max={50}
                    min={0}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="freemium" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary" />
                <Label htmlFor="freemium-toggle" className="text-sm font-medium">Enable Freemium Model</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-slate-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Convert free users to paid subscriptions</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                id="freemium-toggle"
                checked={settings.freemiumModel.enabled}
                onCheckedChange={(checked) => updateSetting('freemiumModel', 'enabled', checked)}
              />
            </div>
            
            {settings.freemiumModel.enabled && (
              <div className="space-y-4 pl-6 border-l-2 border-secondary/20">
                <div>
                  <Label className="text-sm text-slate-600">Initial Free User Base</Label>
                  <Input
                    type="number"
                    value={settings.freemiumModel.freeUserBase}
                    onChange={(e) => updateSetting('freemiumModel', 'freeUserBase', parseInt(e.target.value) || 0)}
                    className="mt-1"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label className="text-sm text-slate-600">
                    Monthly Conversion Rate: {settings.freemiumModel.conversionRate}%
                  </Label>
                  <Slider
                    value={[settings.freemiumModel.conversionRate]}
                    onValueChange={(value) => updateSetting('freemiumModel', 'conversionRate', value[0])}
                    max={20}
                    min={0}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sensitivity" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-purple-600" />
              <Label className="text-sm font-medium">Sensitivity Analysis</Label>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-slate-600">
                  Churn Rate Variation: ±{settings.sensitivityAnalysis.churnVariation}%
                </Label>
                <Slider
                  value={[settings.sensitivityAnalysis.churnVariation]}
                  onValueChange={(value) => updateSetting('sensitivityAnalysis', 'churnVariation', value[0])}
                  max={15}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label className="text-sm text-slate-600">
                  Growth Rate Variation: ±{settings.sensitivityAnalysis.growthVariation}%
                </Label>
                <Slider
                  value={[settings.sensitivityAnalysis.growthVariation]}
                  onValueChange={(value) => updateSetting('sensitivityAnalysis', 'growthVariation', value[0])}
                  max={15}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <Button 
                onClick={runSensitivityAnalysis}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white"
                size="sm"
              >
                Run Analysis
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}