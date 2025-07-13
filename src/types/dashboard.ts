export interface StockByType {
  species: string;
  totalQuantity: number;
}

export interface ProfitOverTime {
  date: string;
  profit: number;
}

export interface DashboardStats {
  stockByType: StockByType[];
  profitOverTime: ProfitOverTime[];
  recentProjects: { id: string; title: string; completed: boolean; date: string }[];
  recentOrders: { id: string; customer: string; total: number; date: string }[];
}
