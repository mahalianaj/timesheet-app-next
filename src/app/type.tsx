
type User = {
  Id: number;
  consultant: string;
  customer: string;
  contract_number: string;
  start_period: string;
  end_period: string;
  company: string;
  role: string;
};

type Entry = {
  Id: number;
  date: string;
  taskDescription: string;
  taskType: string;
  project: string;
  hours: string;
};

type BurndownData = {
  month: string;       
  idealHours: number;  
  consumedHours: number;
};