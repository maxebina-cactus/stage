export type TurnoverMetric = 'turnover' | 'ggr'

export interface TurnoverByProductItem {
  month: string
  casino: number
  sports: number
}

export interface TurnoverByProductResponse {
  metric: TurnoverMetric
  data: TurnoverByProductItem[]
}

export interface TurnoverByProductParams {
  metric: TurnoverMetric
  startDate: string
  endDate: string
}
