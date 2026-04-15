import type { TurnoverByProductResponse } from '~/types/turnoverByProduct'

export const turnoverMock: TurnoverByProductResponse = {
  metric: 'turnover',
  data: [
    { month: '2025-03', casino: 7500000,  sports: 3000000 },
    { month: '2025-04', casino: 9500000,  sports: 3500000 },
    { month: '2025-05', casino: 11000000, sports: 4000000 },
    { month: '2025-06', casino: 10000000, sports: 4200000 },
    { month: '2025-07', casino: 9000000,  sports: 5500000 },
    { month: '2025-08', casino: 7000000,  sports: 4200000 },
    { month: '2025-09', casino: 10500000, sports: 5000000 },
    { month: '2025-10', casino: 9500000,  sports: 5000000 },
    { month: '2025-11', casino: 11500000, sports: 7500000 },
    { month: '2025-12', casino: 12000000, sports: 9000000 },
    { month: '2026-01', casino: 10500000, sports: 7000000 },
    { month: '2026-02', casino: 10000000, sports: 6500000 },
  ],
}

export const ggrMock: TurnoverByProductResponse = {
  metric: 'ggr',
  data: [
    { month: '2025-03', casino: 2500000, sports: 1500000 },
    { month: '2025-04', casino: 3000000, sports: 1800000 },
    { month: '2025-05', casino: 3800000, sports: 2200000 },
    { month: '2025-06', casino: 3500000, sports: 2500000 },
    { month: '2025-07', casino: 3200000, sports: 3200000 },
    { month: '2025-08', casino: 2800000, sports: 2200000 },
    { month: '2025-09', casino: 3700000, sports: 2500000 },
    { month: '2025-10', casino: 3500000, sports: 2500000 },
    { month: '2025-11', casino: 4000000, sports: 3500000 },
    { month: '2025-12', casino: 4500000, sports: 4500000 },
    { month: '2026-01', casino: 4000000, sports: 3500000 },
    { month: '2026-02', casino: 3800000, sports: 3000000 },
  ],
}
