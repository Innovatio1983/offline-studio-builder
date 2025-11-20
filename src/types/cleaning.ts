export interface CleaningTask {
  id: string;
  name: string;
  pricePerSqm: number;
  durationPerSqm: number;
}

export interface SelectedService extends CleaningTask {
  area: number;
  quantity: number;
  totalPrice: number;
  totalDuration: number;
}

export interface WorkOrder {
  clientName: string;
  address: string;
  serviceDate: string;
  time: string;
  cleanerName: string;
  services: SelectedService[];
  totalCost: number;
  totalDuration: number;
  clientSignature?: string;
  cleanerSignature?: string;
}

export const DEFAULT_TASKS: CleaningTask[] = [
  { id: '1', name: 'Vacuum Living Room', pricePerSqm: 2, durationPerSqm: 5 },
  { id: '2', name: 'Mop Floors', pricePerSqm: 1.5, durationPerSqm: 3 },
  { id: '3', name: 'Clean Bathrooms', pricePerSqm: 5, durationPerSqm: 10 },
  { id: '4', name: 'Dust Furniture', pricePerSqm: 1, durationPerSqm: 2 },
  { id: '5', name: 'Wash Windows', pricePerSqm: 3, durationPerSqm: 8 },
  { id: '6', name: 'Kitchen Deep Clean', pricePerSqm: 4, durationPerSqm: 12 },
  { id: '7', name: 'Bedroom Cleaning', pricePerSqm: 2.5, durationPerSqm: 6 },
  { id: '8', name: 'Laundry Service', pricePerSqm: 1, durationPerSqm: 1 },
  { id: '9', name: 'Trash Removal', pricePerSqm: 0.5, durationPerSqm: 1 },
  { id: '10', name: 'Mirror Cleaning', pricePerSqm: 1.5, durationPerSqm: 2 },
  { id: '11', name: 'Baseboard Cleaning', pricePerSqm: 1, durationPerSqm: 1 },
  { id: '12', name: 'Carpet Stain Removal', pricePerSqm: 3, durationPerSqm: 5 },
  { id: '13', name: 'Refrigerator Clean', pricePerSqm: 3, durationPerSqm: 8 },
  { id: '14', name: 'Oven Cleaning', pricePerSqm: 4, durationPerSqm: 10 },
  { id: '15', name: 'Blind Cleaning', pricePerSqm: 2, durationPerSqm: 4 },
  { id: '16', name: 'Cabinet Wiping', pricePerSqm: 1.5, durationPerSqm: 3 },
  { id: '17', name: 'Door Cleaning', pricePerSqm: 1, durationPerSqm: 2 },
  { id: '18', name: 'Light Fixture Cleaning', pricePerSqm: 2, durationPerSqm: 3 },
  { id: '19', name: 'Fan Cleaning', pricePerSqm: 2, durationPerSqm: 3 },
  { id: '20', name: 'Balcony Cleaning', pricePerSqm: 2.5, durationPerSqm: 6 },
  { id: '21', name: 'Carpet Shampooing', pricePerSqm: 4, durationPerSqm: 15 },
  { id: '22', name: 'Upholstery Cleaning', pricePerSqm: 6, durationPerSqm: 20 },
  { id: '23', name: 'Grout Cleaning', pricePerSqm: 5, durationPerSqm: 12 },
  { id: '24', name: 'Tile Cleaning', pricePerSqm: 3.5, durationPerSqm: 8 },
  { id: '25', name: 'Garage Cleaning', pricePerSqm: 3, durationPerSqm: 10 },
  { id: '26', name: 'Deck Cleaning', pricePerSqm: 4.5, durationPerSqm: 15 },
  { id: '27', name: 'Patio Cleaning', pricePerSqm: 3, durationPerSqm: 10 },
  { id: '28', name: 'Interior Window Cleaning', pricePerSqm: 2.5, durationPerSqm: 5 },
  { id: '29', name: 'Exterior Window Cleaning', pricePerSqm: 4, durationPerSqm: 10 },
  { id: '30', name: 'Chimney Cleaning', pricePerSqm: 8, durationPerSqm: 30 },
];
