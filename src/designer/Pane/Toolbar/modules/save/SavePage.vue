<template>
  <ConfigProvider>
    <n-modal
      :show="saveDialogVisible"
      :mask-closable="false"
      preset="card"
      center
      title="保存当前布局"
      :style="{ width: '30%', minWidth: '600px' }"
      @update:show="() => (saveDialogVisible = false)"
      size="medium"
    >
      <n-form :model="form" :rules="rules" @submit.prevent>
        <n-form-item label="页面名称" prop="name">
          <n-input v-model="form.name" placeholder="请输入页面名称" />
        </n-form-item>
      </n-form>
      <template #footer>
        <span class="dialog-footer">
          <n-button @click="saveDialogVisible = false">取消</n-button>
          <n-button type="primary" @click="handleSubmit('new')" v-if="!index">新增</n-button>
          <n-button type="primary" @click="handleSubmit('update')" v-else>更新</n-button>
        </span>
      </template>
    </n-modal>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { NForm, NInput, NFormItem, NButton, NModal } from 'naive-ui'
import type { FormItemRule } from 'naive-ui'
import { message } from '@/utils/message'
import type { LayoutData } from '@/types/apiTypes'
import { useBasicStoreWithOut } from '@/store/modules/basic'
import { savePage, updatePage } from '@/api/pages'
import ConfigProvider from '@/components/provider/ConfigProvider.vue'
import router from '@/router'
const basicStore = useBasicStoreWithOut()
const props = defineProps<{ index?: string }>()

const saveDialogVisible = ref<boolean>(true)
const form = reactive<{
  name: string
  thumbnail: string
}>({
  name: '',
  thumbnail: ''
})
const rules = reactive<{
  name: FormItemRule[]
}>({
  name: [{ required: true, message: '请输入页面名称', trigger: 'blur' }]
})

const handleSubmit = async (type: string) => {
  const { name, thumbnail } = form
  if (!name) {
    message.error('请输入页面名称')
    return
  }

  const layoutData: LayoutData = {
    name: name,
    thumbnail: thumbnail!,
    canvasData: basicStore.layoutData,
    canvasStyle: basicStore.canvasStyleData
  }

  if (type === 'update') {
    try {
      const resp = await updatePage(props.index!, layoutData)
      if (resp.status === 200) {
        message.success('修改成功')
      }
    } catch (e) {
      message.error('保存失败，请导出到本地，并重新进入此页面')
    } finally {
      saveDialogVisible.value = false
    }
  } else {
    try {
      const result = await savePage(layoutData)
      if (result.status === 201) {
        message.success('保存成功')
        // // 新增页面成功，则跳转到编辑页
        router.push({
          name: 'Editor',
          params: {
            index: result.data.id
          }
        })
      }
    } catch (e: any) {
      message.error(`保存失败，失败信息:${e?.message || e}`)
    } finally {
      saveDialogVisible.value = false
    }
  }
}
</script>
