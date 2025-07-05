import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, FolderOpen, Trash2, Copy, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface ScenarioData {
  id?: number;
  name: string;
  costItems: any[];
  variableCostItems: any[];
  financialParams: any;
  enhancements: any;
}

interface ScenarioManagementProps {
  currentScenario: ScenarioData;
  onLoadScenario: (scenario: ScenarioData) => void;
}

export function ScenarioManagement({ currentScenario, onLoadScenario }: ScenarioManagementProps) {
  const [scenarioName, setScenarioName] = useState("");
  const [savedScenarios, setSavedScenarios] = useState<ScenarioData[]>([
    {
      id: 1,
      name: "Conservative Growth",
      costItems: [],
      variableCostItems: [],
      financialParams: {},
      enhancements: {}
    },
    {
      id: 2,
      name: "Aggressive Expansion",
      costItems: [],
      variableCostItems: [],
      financialParams: {},
      enhancements: {}
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const saveScenario = () => {
    if (!scenarioName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a scenario name",
        variant: "destructive"
      });
      return;
    }

    const newScenario: ScenarioData = {
      id: Date.now(),
      name: scenarioName,
      costItems: currentScenario.costItems,
      variableCostItems: currentScenario.variableCostItems,
      financialParams: currentScenario.financialParams,
      enhancements: currentScenario.enhancements
    };

    setSavedScenarios([...savedScenarios, newScenario]);
    setScenarioName("");
    setIsOpen(false);
    
    toast({
      title: "Success",
      description: `Scenario "${newScenario.name}" saved successfully`,
    });
  };

  const loadScenario = (scenario: ScenarioData) => {
    onLoadScenario(scenario);
    toast({
      title: "Scenario Loaded",
      description: `"${scenario.name}" has been loaded`,
    });
  };

  const deleteScenario = (id: number) => {
    setSavedScenarios(savedScenarios.filter(s => s.id !== id));
    toast({
      title: "Scenario Deleted",
      description: "Scenario has been removed",
    });
  };

  const duplicateScenario = (scenario: ScenarioData) => {
    const duplicate = {
      ...scenario,
      id: Date.now(),
      name: `${scenario.name} (Copy)`
    };
    setSavedScenarios([...savedScenarios, duplicate]);
    toast({
      title: "Scenario Duplicated",
      description: `Created copy of "${scenario.name}"`,
    });
  };

  const shareScenario = (scenario: ScenarioData) => {
    // In a real implementation, this would generate a shareable link
    const shareUrl = `${window.location.origin}?scenario=${encodeURIComponent(JSON.stringify(scenario))}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Share Link Copied",
      description: "Scenario link copied to clipboard",
    });
  };

  return (
    <Card className="bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:bg-white/80 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
          Scenario Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Save Current Scenario */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Current Scenario
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Scenario</DialogTitle>
                <DialogDescription>
                  Give your scenario a descriptive name to save it for later use.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="scenario-name">Scenario Name</Label>
                  <Input
                    id="scenario-name"
                    value={scenarioName}
                    onChange={(e) => setScenarioName(e.target.value)}
                    placeholder="e.g., Q2 2024 Projections"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveScenario}>Save Scenario</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Load Saved Scenarios */}
          <div>
            <Label className="text-sm font-medium text-slate-700 mb-2 block">
              Load Saved Scenario
            </Label>
            <Select onValueChange={(value) => {
              const scenario = savedScenarios.find(s => s.id === parseInt(value));
              if (scenario) loadScenario(scenario);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select a scenario..." />
              </SelectTrigger>
              <SelectContent>
                {savedScenarios.map((scenario) => (
                  <SelectItem key={scenario.id} value={scenario.id!.toString()}>
                    {scenario.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Scenario List */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-slate-700">Saved Scenarios</Label>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {savedScenarios.map((scenario) => (
                <div key={scenario.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">{scenario.name}</span>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => loadScenario(scenario)}
                      className="h-6 w-6 p-0"
                    >
                      <FolderOpen className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => duplicateScenario(scenario)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => shareScenario(scenario)}
                      className="h-6 w-6 p-0"
                    >
                      <Share2 className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteScenario(scenario.id!)}
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}