<template>
  <!-- 内置组件slot 作用对传递的子标签引用 指定渲染位置 -->
   <div class=" fixed w-screen h-screen z-40 top-0 right-0 left-0 bottom-0" v-show="visible"></div>
  <div class="inline-block relative">
    <span class=" inline-block" @click.stop="show">
      <slot></slot>
    </span>
  </div>
  <!-- 下拉菜单 -->
  <div ref="main"
    class=" absolute z-50 border-[1px] left-0 border-[#454545] rounded-md bg-[#2252526]"
    v-show="visible"
  >
    <div ref="inn" v-for="item in attrs.data" v-bind:key="item" @click="triggerEvent(item)"
    :class="[' h-[26px] rounded-md px-2',
    `${item.disable ? 'text-[#686868] cursor-not-allowed':'text-white cursor-pointer'}`,
    {'hover:bg-[#0078d4]':!item.disable}]"
    >{{ item.name }}</div>
  </div>
</template>

<script setup>
//script setup属性作用:可以直接使用组合式API
import { ref,useAttrs,defineEmits } from 'vue';
import { useClickOutside } from '@/hooks';
const attrs = useAttrs();
const visible = ref(false);
const main = ref(null);
const inn = ref(null);
// console.log(attrs,attrs.data);
const show=()=>(visible.value=true);
const hide=()=>(visible.value=false)
useClickOutside(main,hide);
const emit = defineEmits(['checked']);
const triggerEvent = (item) => {
  emit('checked',item);
  if(!item.disable){
    hide();
  }
}
</script>
