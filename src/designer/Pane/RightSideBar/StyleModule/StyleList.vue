<!-- TODO: 这个页面后续将用 JSX 重构 -->
<template>
  <div class="attr-list">
    <n-collapse accordion>
      <n-collapse-item
        v-for="{ label, prop, children } in styleKeys"
        :key="`${curComponent.id}${prop}`"
        :title="label"
        :name="prop"
      >
        <FormAttr
          :children="children"
          :data="formData"
          @change="changed"
          :name="label"
          :uid="prop"
          :ukey="curComponent.id"
        />
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { checkDiff, cleanObjectProp } from '@/utils/utils'
import { debounce } from 'lodash-es'
import { computed, reactive, watch } from 'vue'
import FormAttr from '@/designer/modules/form/FormAttr'
import { NCollapse, NCollapseItem } from 'naive-ui'
import { BaseComponent } from '@/resource/models'

const props = defineProps<{
  curComponent: BaseComponent
}>()
const basicStore = useBasicStoreWithOut()

const formData = reactive<Recordable<any>>({})
const styleKeys = computed(() => {
  if (props.curComponent) {
    return props.curComponent.styleFormValue
  } else {
    return {}
  }
})

// 样式页面改变，修改当前组件的样式：curComponent.style
const changed = debounce((key: string, val: any) => {
  if (props.curComponent) {
    const locationKeys = ['top', 'left', 'width', 'height', 'rotate']
    if (locationKeys.includes(key)) {
      const parentComponent = props.curComponent.parent
      // key as 'top' | 'left' | 'width' | 'height' | 'rotate'
      basicStore.syncComponentLoction({ [key]: val as number }, parentComponent, true)
      if (parentComponent) {
        basicStore.resizeAutoComponent(parentComponent)
      }
    } else {
      basicStore.setCurComponentStyle(key, val)
    }
  }
}, 300)

const updateFormData = debounce((newVal: Recordable<any>) => {
  const style = checkDiff(newVal, formData)
  if (style) {
    Object.keys(style).forEach((key) => {
      formData[key] = style[key]
    })
  }
}, 200)

const resetFormData = () => {
  if (props.curComponent) {
    cleanObjectProp(formData)
    updateFormData(props.curComponent.style)
  }
}

watch(
  () => [props.curComponent.id, props.curComponent.positionStyle],
  () => {
    if (props.curComponent && props.curComponent.id) {
      resetFormData()
    }
  },
  { immediate: true, deep: true }
)
</script>

<style scoped>
.attr-list {
  @apply overflow-auto p-1 pt-0 h-full;

  backdrop-filter: blur(50px);
  margin-right: 10px;
}
</style>
