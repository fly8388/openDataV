import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'BasicPieChart'
class BasicPieChartComponent extends BaseComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.PIE,
      name: name ? name : '基础饼状图',
      id,
      width: 520,
      height: 260,
      icon
    })
  }

  _prop: PropsType[] = [
    {
      label: '数据配置',
      prop: 'data',
      children: [
        {
          prop: 'url',
          label: '数据地址',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: ''
          }
        },
        {
          prop: 'upperLimit',
          label: '上限',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 150
          }
        },
        {
          prop: 'lowerLimit',
          label: '下限',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 0
          }
        }
      ]
    },
    {
      label: '图例',
      prop: 'legend',
      children: [
        {
          prop: 'isShow',
          label: '是否显示',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: true
          }
        }
      ]
    },
    {
      label: '标签',
      prop: 'label',
      children: [
        {
          prop: 'isShow',
          label: '是否显示',
          type: FormType.SWITCH,
          componentOptions: {
            defaultValue: true
          }
        },
        {
          prop: 'labelColor',
          label: '文字颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#00BAFF'
          }
        },

        {
          prop: 'labelSize',
          label: '文字大小',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 40
          }
        },
        {
          prop: 'labelWeight',
          label: '文字宽度',
          type: FormType.FONT_WEIGHT,
          componentOptions: {
            defaultValue: 400
          }
        }
      ]
    },
    {
      label: '系列样式',
      prop: 'series',
      children: [
        {
          prop: 'radiusMin',
          label: '半径下限(%)',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 40
          }
        },
        {
          prop: 'radiusMax',
          label: '半径上限(%)',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 70
          }
        },

        {
          prop: 'borderRadius',
          label: '边框半径',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 10
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default BasicPieChartComponent
