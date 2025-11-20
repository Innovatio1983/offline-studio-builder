import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { loadTasks } from "@/utils/storage";
import { CleaningTask, SelectedService } from "@/types/cleaning";
import { useNavigate } from "react-router-dom";

const WorkOrder = () => {
  const [tasks, setTasks] = useState<CleaningTask[]>([]);
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [time, setTime] = useState("");
  const [cleanerName, setCleanerName] = useState("");
  const [selectedServices, setSelectedServices] = useState<Map<string, { area: number; quantity: number }>>(new Map());
  const [totalCost, setTotalCost] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [selectedServices, tasks]);

  const handleServiceToggle = (taskId: string, checked: boolean) => {
    const newSelected = new Map(selectedServices);
    if (checked) {
      newSelected.set(taskId, { area: 0, quantity: 1 });
    } else {
      newSelected.delete(taskId);
    }
    setSelectedServices(newSelected);
  };

  const handleAreaChange = (taskId: string, value: string) => {
    const newSelected = new Map(selectedServices);
    const service = newSelected.get(taskId);
    if (service) {
      service.area = parseFloat(value) || 0;
      newSelected.set(taskId, service);
      setSelectedServices(newSelected);
    }
  };

  const handleQuantityChange = (taskId: string, value: string) => {
    const newSelected = new Map(selectedServices);
    const service = newSelected.get(taskId);
    if (service) {
      service.quantity = parseInt(value) || 1;
      newSelected.set(taskId, service);
      setSelectedServices(newSelected);
    }
  };

  const calculateTotals = () => {
    let cost = 0;
    let duration = 0;

    selectedServices.forEach((service, taskId) => {
      const task = tasks.find(t => t.id === taskId);
      if (task && service.area > 0) {
        const serviceTotal = task.pricePerSqm * service.area * service.quantity;
        const serviceDuration = task.durationPerSqm * service.area * service.quantity;
        cost += serviceTotal;
        duration += serviceDuration;
      }
    });

    setTotalCost(cost);
    setTotalDuration(duration);
  };

  const getServiceCalculations = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    const service = selectedServices.get(taskId);
    
    if (!task || !service) return { totalPrice: 0, totalDuration: 0 };
    
    const totalPrice = task.pricePerSqm * service.area * service.quantity;
    const totalDuration = task.durationPerSqm * service.area * service.quantity;
    
    return { totalPrice, totalDuration };
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateTotal = () => {
    toast({
      title: "Total Generated",
      description: `Total Cost: $${totalCost.toFixed(2)} | Duration: ${totalDuration} minutes`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8 print:py-4">
        <div className="flex gap-4 mb-6 print:hidden">
          <Button onClick={() => navigate('/')} variant="secondary">
            Work Order
          </Button>
          <Button onClick={() => navigate('/settings')} variant="default">
            Settings
          </Button>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6 print:shadow-none print:border-0">
          <h2 className="text-2xl font-bold text-foreground mb-6">Cleaning Work Order</h2>

          {/* Client Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Client Name:</label>
              <Input
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Address:</label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter client address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Service Date:</label>
              <Input
                type="date"
                value={serviceDate}
                onChange={(e) => setServiceDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Time:</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Cleaner Name:</label>
              <Input
                value={cleanerName}
                onChange={(e) => setCleanerName(e.target.value)}
                placeholder="Enter cleaner name"
              />
            </div>
          </div>

          {/* Services Table */}
          <h3 className="text-xl font-semibold text-foreground mb-4">Select Services:</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary">
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">Select</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">#</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">Task</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">Price ($)</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">Duration</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">Area (sq ft)</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">Qty</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">Total Price</th>
                  <th className="px-2 py-2 text-left text-xs font-semibold text-secondary-foreground">Total Duration</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => {
                  const isSelected = selectedServices.has(task.id);
                  const service = selectedServices.get(task.id);
                  const { totalPrice, totalDuration } = getServiceCalculations(task.id);
                  
                  return (
                    <tr key={task.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                      <td className="px-2 py-2">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleServiceToggle(task.id, checked as boolean)}
                        />
                      </td>
                      <td className="px-2 py-2 text-muted-foreground">{index + 1}</td>
                      <td className="px-2 py-2 font-medium">{task.name}</td>
                      <td className="px-2 py-2">${task.pricePerSqm.toFixed(2)}/sq ft</td>
                      <td className="px-2 py-2">{task.durationPerSqm} min/sq ft</td>
                      <td className="px-2 py-2">
                        <Input
                          type="number"
                          step="0.1"
                          value={service?.area || 0}
                          onChange={(e) => handleAreaChange(task.id, e.target.value)}
                          disabled={!isSelected}
                          className="w-20 h-8 text-xs"
                        />
                      </td>
                      <td className="px-2 py-2">
                        <Input
                          type="number"
                          min="1"
                          value={service?.quantity || 1}
                          onChange={(e) => handleQuantityChange(task.id, e.target.value)}
                          disabled={!isSelected}
                          className="w-16 h-8 text-xs"
                        />
                      </td>
                      <td className="px-2 py-2 font-semibold">${totalPrice.toFixed(2)}</td>
                      <td className="px-2 py-2">{totalDuration.toFixed(0)} min</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Button onClick={handleGenerateTotal} className="mb-6 print:hidden">
            Generate Total
          </Button>

          {/* Totals */}
          <div className="bg-accent/20 rounded-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <h3 className="text-2xl font-bold text-foreground">Total Cost: ${totalCost.toFixed(2)}</h3>
              </div>
              <div className="text-center sm:text-right">
                <h3 className="text-2xl font-bold text-foreground">Total Duration: {totalDuration.toFixed(0)} minutes</h3>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="border border-border rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">Signatures</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Client Signature:</label>
                <div className="border-b-2 border-border h-20"></div>
                <p className="text-xs text-muted-foreground mt-2">Date: _______________</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Cleaner Signature:</label>
                <div className="border-b-2 border-border h-20"></div>
                <p className="text-xs text-muted-foreground mt-2">Date: _______________</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 print:hidden">
            <Button onClick={handlePrint} size="lg">
              Print Work Order
            </Button>
            <Button onClick={handlePrint} variant="outline" size="lg">
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkOrder;
