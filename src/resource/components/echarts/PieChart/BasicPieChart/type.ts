export interface BasicLineChart {
  data: {
    url: string
    upperLimit: number
    lowerLimit: number
  }
  label: {
    isShow: boolean
    labelColor: string
    labelSize: number
    labelWeight: number
  }
  series: {
    radiusMin: number
    radiusMax: number
    borderRadius: number
  }
  legend: {
    isShow: boolean
  }
}
