<template>
    <li>
      <!-- 点击折叠展开 -->
      <div @click="toggle">
        <!-- 判断是否有子节点，有的话显示折叠展开的图标，如果没有下级目录的话，则不显示 -->
        <span v-if="isFolder">{{ open ? "-" : "+" }}</span>
        <!-- 显示内容 -->
        {{ attrs.name }}
      </div>
      <!-- 判断是否有子节点，有的话控制是否显示下级目录 -->
      <ul v-show="open" v-if="isFolder">
        <!-- 重点代码，调用自身，实现递归，绑定数据 -->
        <Tree v-for="item in attrs.children" :data="item" :key="item.name"></Tree>
      </ul>
    </li>
  </template>
  
  <script setup>
  import { ref,useAttrs,computed } from "vue";
  
  // 接收父组件传递的数据，递归时传递 children
  const attrs = useAttrs();
  
  // 默认不显示下级目录
  const open = ref(false);
  
  // 控制是否有下级目录和显示下级目录
  const isFolder = computed(() => attrs?.children?.length);
  
  // 点击折叠展开的方法
  const toggle = () => {
    if (isFolder) {
      open.value = !open.value;
    }
  };
  </script>