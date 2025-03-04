<template>
  <div v-if="!iscollapsed">
    <n-tabs
      type="line"
      animated
      v-if="curComponent"
      justify-content="center"
      v-model:value="activeKey"
      @update:value="(key) => (activeKey = key)"
    >
      <n-tab-pane name="style" display-directive="show:lazy">
        <template #tab>
          <IconPark name="text-style" />
          <span v-show="!iscollapsed">样式</span>
        </template>
        <StyleList :curComponent="curComponent" />
      </n-tab-pane>
      <n-tab-pane name="attr" display-directive="show:lazy">
        <template #tab>
          <IconPark name="internal-data" />
          <span v-show="!iscollapsed">属性</span>
        </template>
        <AttrList :curComponent="curComponent" />
      </n-tab-pane>
    </n-tabs>
    <n-tabs type="line" animated v-else justify-content="center">
      <n-tab-pane name="canvas" display-directive="show:lazy">
        <template #tab>
          <IconPark name="page" />
          <span v-show="!iscollapsed">画布</span>
        </template>
        <Canvas />
      </n-tab-pane>
    </n-tabs>
  </div>
  <div v-else>
    <n-menu :options="menuOptions" />
  </div>
</template>

<script setup lang="ts">
import { NTabs, NTabPane, NMenu } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { ref, computed, h } from 'vue'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import Canvas from './Canvas.vue'
import StyleList from './StyleModule' // 右侧属性列表
import AttrList from './AttrModule'
import { IconPark } from '@/plugins/icon'

const activeKey = ref<string>('attr')

const basicStore = useBasicStoreWithOut()
withDefaults(
  defineProps<{
    iscollapsed: boolean
  }>(),
  { iscollapsed: false }
)

const emits = defineEmits<{
  (e: 'update:iscollapsed', iscollapsed: boolean): void
}>()

const curComponent = computed(() => basicStore.curComponent)
const menuOptions = computed<MenuOption[]>(() => {
  if (basicStore.curComponent) {
    return [
      {
        label: '样式',
        key: '4',
        icon: () =>
          h(IconPark, {
            name: 'text-style',
            onClick: () => collapsedTabPane('style')
          })
      },
      {
        label: '属性',
        key: '2',
        icon: () =>
          h(IconPark, {
            name: 'internal-data',
            onClick: () => collapsedTabPane('attr')
          })
      }
    ]
  } else {
    return [
      {
        label: '画布',
        key: '1',
        icon: () =>
          h(IconPark, {
            name: 'page'
          })
      }
    ]
  }
})

const collapsedTabPane = (key: string) => {
  emits('update:iscollapsed', false)
  activeKey.value = key
}
</script>

<style lang="less" scoped></style>
