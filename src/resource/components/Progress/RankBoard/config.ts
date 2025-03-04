import { ComponentGroup, FormType } from '@/enum'
import type { PropsType } from '@/types/component'
import { BaseComponent } from '@/resource/models'

export const componentName = 'ScrollRankingBoard'
class RankBoardComponent extends BaseComponent {
  constructor(id?: string, name?: string, icon?: string) {
    super({
      component: componentName,
      group: ComponentGroup.PROGERSS,
      name: name ? name : '排名板',
      id,
      width: 800,
      height: 400,
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
          label: '历史数据地址',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: '/getData'
          }
        },
        {
          prop: 'maxValue',
          label: '最大值',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 150
          }
        },
        {
          prop: 'unit',
          label: '单位',
          type: FormType.TEXT,
          componentOptions: {
            defaultValue: ''
          }
        },
        {
          prop: 'interval',
          label: '数据间隔(ms)',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 10000
          }
        }
      ]
    },
    {
      label: '进度条配置',
      prop: 'bar',
      children: [
        {
          prop: 'color1',
          label: '颜色1',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'color2',
          label: '颜色2',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#00BAFF'
          }
        },
        {
          prop: 'barHeight',
          label: '边框宽度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 20
          }
        },
        {
          prop: 'borderRadius',
          label: '圆角',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 10
          }
        }
      ]
    },
    {
      label: '线条配置',
      prop: 'line',
      children: [
        {
          prop: 'lineColor',
          label: '颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'borderGap',
          label: '边框间隔',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 3
          }
        },
        {
          prop: 'lineHeight',
          label: '线条宽度',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 5
          }
        }
      ]
    },
    {
      label: '文本配置',
      prop: 'text',
      children: [
        {
          prop: 'fontSize',
          label: '字体大小',
          type: FormType.NUMBER,
          componentOptions: {
            defaultValue: 15
          }
        },
        {
          prop: 'labelColor',
          label: '标题字体颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'rankColor',
          label: '排名字体颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        },
        {
          prop: 'valueColor',
          label: '值字体颜色',
          type: FormType.COLOR,
          componentOptions: {
            defaultValue: '#3DE7C9'
          }
        }
      ]
    }
  ]
  _style: PropsType[] = []
}

export default RankBoardComponent
