import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { loadTasks, saveTasks, resetTasks } from "@/utils/storage";
import { CleaningTask } from "@/types/cleaning";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  const handleTaskChange = (id: string, field: 'name' | 'pricePerSqm' | 'durationPerSqm', value: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        if (field === 'name') {
          return { ...task, [field]: value };
        } else {
          const numValue = parseFloat(value) || 0;
          return { ...task, [field]: numValue };
        }
      }
      return task;
    }));
  };

  const handleSave = () => {
    saveTasks(tasks);
    toast({
      title: "Settings Saved",
      description: "Your task settings have been saved successfully.",
    });
  };

  const handleReset = () => {
    setTasks(resetTasks());
    toast({
      title: "Settings Reset",
      description: "Task settings have been reset to defaults.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Button onClick={() => navigate('/')} variant="default">
            Work Order
          </Button>
          <Button variant="secondary">
            Settings
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Task Settings</h2>
          <p className="text-muted-foreground mb-6">Configure your cleaning tasks, prices, and durations</p>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-secondary-foreground">Task</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-secondary-foreground">Price ($/sq ft)</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-secondary-foreground">Duration (min/sq ft)</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                    <td className="px-4 py-3">
                      <Input
                        value={task.name}
                        onChange={(e) => handleTaskChange(task.id, 'name', e.target.value)}
                        className="w-full"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="number"
                        step="0.01"
                        value={task.pricePerSqm}
                        onChange={(e) => handleTaskChange(task.id, 'pricePerSqm', e.target.value)}
                        className="w-32"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="number"
                        step="1"
                        value={task.durationPerSqm}
                        onChange={(e) => handleTaskChange(task.id, 'durationPerSqm', e.target.value)}
                        className="w-32"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleSave} size="lg">
              Save Settings
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              Reset to Defaults
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
