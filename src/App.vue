<template> 
  <h1 class=" bg-red-600 text-white text-{30px}" @click="onBarClick" v-text="bar.a"></h1>
  <h1 class=" bg-red-300 text-white text-{30px}" @click="onBazClick" v-text="baz.a"></h1>
  <div ref="elementRef" class=" w-screen h-screen overflow-hidden flex flex-col">
    <div class=" w-full h-[35px] px-3 bg-[#3c3c3c] flex items-center justify-between">
      <Icon icon="codicon:vscode" width="32" height="32"  style="color: #0894ed" />
      <div class=" flex justify-around relative">
        <Icon icon="solar:arrow-left-linear" width="20" height="20" />
        <Icon icon="solar:arrow-left-linear" width="20" height="20"  style="color: #818181" class=" rotate-180"/>
        <div class=" flex flex-row-reverse justify-center items-center outline-none w-[30vw] h-[24px] bg-[#4b4b4b] border-[#737373] rounded-md text-center"
        v-bind:textContent="str">
        <Icon icon="quill:search" width="20" height="20" class=" text-[#818181] mr-1"/>
      </div>
      </div>
      <div class=" flex justify-around w-[120px]">
        <Icon icon="codicon:layout" width="20" height="20" />
        <div class=" flex mx-1 cursor-pointer"
          @click.stop="
          updateLayoutSetting({
            leftBar:{visible:!setting.layout.leftBar.visible},
          })">
        <!-- @click.stop="
         updateLayoutSetting({
         leftBar:{!visible:layoutSetting?.leftBar.visible},})" -->
          <Icon width="20" height="20"
          v-if="setting.layout.leftBar.visible"
          :icon="column[0]"
          />
          <Icon width="20" height="20"
          v-else
          :icon="column[1]"
          />
        </div>
        <div class=" flex mx-1 cursor-pointer"
        @click.stop="
          updateLayoutSetting({
            bottomBar:{visible:!setting.layout.bottomBar.visible},
          })">
          <Icon width="20" height="20" class=" rotate-[270deg]"
          v-if="setting.layout.bottomBar.visible"
          :icon="column[0]"
          />
          <Icon width="20" height="20" class=" rotate-[270deg]"
          v-else
          :icon="column[1]"
          />
        </div>
        <div class=" flex mx-1 cursor-pointer"
        @click.stop="
          updateLayoutSetting({
            rightBar:{visible:!setting.layout.rightBar.visible},
          })">
          <Icon width="20" height="20" class=" rotate-180"
          v-if="setting.layout.rightBar.visible"
          :icon="column[0]"
          />
          <Icon width="20" height="20" class=" rotate-180"
          v-else
          :icon="column[1]"
          />
        </div>
      </div>
    </div>
    <div class=" flex-1 flex">
      <div class=" w-[48px] bg-[#333] flex justify-between flex-col relative">
        <div class=" absolute w-[2px] h-9 bg-white"
         v-bind:style="TOP"></div>
        <div>
          <Icon icon="codicon:github" width="24" height="24" class=" my-5 mx-3 hover:text-[#aaa]" />
          <Icon icon="ph:list-bold" width="24" height="24"
            :class="[' my-5 mx-3 text-[#818181] hover:text-[#fff]',{'text-white':item===0}]"
            @click="topmove(0)"/>
          <Icon icon="tdesign:file-copy" width="24" height="24"
            :class="[' my-5 mx-3 text-[#818181] hover:text-[#fff]',{'text-white':item===1}]"
            @click="topmove(1)"/>
          <Icon icon="quill:search" width="24" height="24"
            :class="[' my-5 mx-3 text-[#818181] hover:text-[#fff]',{'text-white':item===2}]"
            @click="topmove(2)"/>
          <Icon icon="mdi:source-branch" width="24" height="24"
            :class="[' my-5 mx-3 text-[#818181] hover:text-[#fff]',{'text-white':item===3}]"
            @click="topmove(3)"/>
          <Icon icon="codicon:debug-alt" width="24" height="24"
            :class="[' my-5 mx-3 text-[#818181] hover:text-[#fff]',{'text-white':item===4}]"
            @click="topmove(4)"/>
          <Icon icon="fluent-mdl2:web-components" width="24" height="24"
            :class="[' my-5 mx-3 text-[#818181] hover:text-[#fff]',{'text-white':item===5}]"
            @click="topmove(5)"/>
          <Icon icon="ri:robot-2-line" width="24" height="24"
            :class="[' my-5 mx-3 text-[#818181] hover:text-[#fff]',{'text-white':item===6}]"
            @click="topmove(6)"/>
        </div>
        <div>
          <Icon icon="iconoir:user-circle" width="24" height="24" class=" my-5 mx-3 text-[#818181] hover:text-[#fff]" />
          <Icon icon="bytesize:settings" width="24" height="24" class=" my-5 mx-3 text-[#818181] hover:text-[#fff]" />
        </div>
      </div>
      <div v-show="setting.layout.leftBar.visible" class=" w-[307px] bg-[#252526] relative"
      :style="{width:`${setting.layout.rightBar.width}px`}">
        <div ref="leftBarPointer" class=" w-[3px] highlight cursor-row-resize"
        @click="isSide(0)"></div>
        <div class=" absolute right-[-1px] w-[1px] h-full hover:w-1 hover:bg-sky-400 cursor-move"></div>
        <div class=" flex justify-between items-center text-[#eee]">
          <span class=" text-[12px] px-8 py-2" @click="run">SOURCE CONTROL</span>
          <div class=" inline-block w-[22px] h-[18px] leading-[18px] rounded-sm cursor-pointer hover:bg-red-300 relative">
            <Dropdown @checked="arr1Callback" :data="dropdownList1">
              <Icon icon="proicons:more" width="24" height="24" />
            </Dropdown>
          </div>
        </div>
        <div>
          <ul class="warpper h-[80vh] overflow-auto">
            <!-- 调用组件，并绑定数据 -->
            <Tree :data="data"></Tree>
            <!-- <li v-for="key in data" v-text="key.name"></li> -->
          </ul>
        </div>
      </div>
      <div class=" flex-1 flex flex-col bg-[#1e1e1e]">
        <div class=" flex-1">
          <div class="hint relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <Icon icon="bx:book-content" width="300" height="300"  class=" mx-auto text-[#151515]" />
            <div class=" mx-auto w-[420px] flex flex-wrap items-center justify-between">
              <div class=" text-right w-[48%] leading-10">Show All Commands</div>
              <div class=" flex w-[48%]">
                <span class=" bg-[#2c2c2c] rounded-md px-2 py-1">Ctrl</span><span class="py-1">+</span><span class=" bg-[#2c2c2c] rounded-md px-2 py-1">Shift</span><span class="py-1">+</span><span class=" bg-[#2c2c2c] rounded-md px-2 py-1">P</span>
              </div>
              <div class=" text-right w-[48%] leading-10">Go to File</div>
              <div class=" flex w-[48%]">
                <span class=" bg-[#2c2c2c] rounded-md px-2 py-1">Ctrl</span><span class="py-1">+</span><span class=" bg-[#2c2c2c] rounded-md px-2 py-1">P</span>
              </div>
              <div class=" text-right w-[48%] leading-10">Open Settings</div>
              <div class=" flex w-[48%]">
                <span class=" bg-[#2c2c2c] rounded-md px-2 py-1">Ctrl</span><span class="py-1">+</span><span class=" bg-[#2c2c2c] rounded-md px-2 py-1">,</span>
              </div>
              <div class=" text-right w-[48%] leading-10">Find in Files</div>
              <div class=" flex w-[48%]">
                <span class=" bg-[#2c2c2c] rounded-md px-2 py-1">Ctrl</span><span class="py-1">+</span><span class=" bg-[#2c2c2c] rounded-md px-2 py-1">Shift</span><span class="py-1">+</span><span class=" bg-[#2c2c2c] rounded-md px-2 py-1">F</span>
              </div>
            </div>
          </div>
        </div>
        <div v-show="setting.layout.bottomBar.visible" class=" h-[200px] border-t border-[#414141] relative"
         :style="{height:`${setting.layout.bottomBar.height}px`}">
          <div ref="bottomBarPointer" class=" h-[3px] highlight cursor-row-resize"></div>
          <Dropdown @checked="arr2Callback" :data="dropdownList2">
            <Icon icon="proicons:more" width="24" height="24" />
          </Dropdown>
        </div>
      </div>
      <div v-show="setting.layout.rightBar.visible" class=" w-[307px] bg-[#252526] relative"
      :style="{width:`${setting.layout.rightBar.width}px`}">
        <div ref="rightBarPointer" class=" w-[3px] highlight cursor-row-resize"
        @click="isSide(1)"></div>
        <div>
          <a href=""></a>
        </div>
        <Dropdown @checked="arr1Callback" :data="dropdownList1">
          <!-- 插槽 slot -->
          <Icon icon="uil:setting" width="24" height="24" />
        </Dropdown>
      </div>
    </div>
    <div class=" w-full h-[22px] bg-[#007acc] flex justify-between">
      <div class=" flex">
        <div class=" flex justify-center items-center px-5 bg-[#17805c] mr-5">
          <Icon icon="fluent-mdl2:remote" width="18" height="18" class="text-[#fff]" />
          <span>{{ str }}</span>
          </div>
          <div class=" mr-10 flex items-center">
            <Icon icon="mdi:source-branch" width="20" height="20" class="text-[#fff]" />
            <span>main</span>
          </div>
          <div class=" mr-10 flex items-center">
            <Icon icon="codicon:refresh" width="20" height="20" class="text-[#fff]" />
          </div>
          <div class=" mr-10 flex items-center">
            <Icon icon="tdesign:error-triangle" width="20" height="20" class="text-[#fff]" />
            <span>0</span>
          </div>
          <div class=" mr-10 flex items-center">
            <Icon icon="mi:circle-error" width="20" height="20" class="text-[#fff]" />
            <span>0</span>
          </div>
          <div class=" mr-10 flex items-center">
            <Icon icon="weui:like-outlined" width="20" height="20" class="text-[#fff]" />
            <span>Sponsors:</span>
          </div>
          <div class=" px-2 hover:bg-[rgba(255,255,255,0.12)]">
            Sourcegraph
          </div>
        </div>
        <div class=" flex items-center">
          <div class=" px-2 mr-4 hover:bg-[rgba(255,255,255,0.12)]">Layout:US</div>
          <div class=" px-2 mr-4 hover:bg-[rgba(255,255,255,0.12)]"><Icon icon="codicon:bell" width="20" height="20"  style="color: #fff" /></div>
        </div>
    </div>
  </div>
</template>

<script setup>
//所有DOM操作被Vue封装成一个个指令
//DOM操作=>指令语法
//不允许使用DOM操作
//在vue.js中，指令是操作DOM的唯一方法
//指令是以V-开头的一种特殊的标签自定义属性，具有操作DOM能力
//vue.js中 数据变化 (响应式数据) => 视图更新
//响应式API作用：将js数据转换为响应式数据
//v-text（标签绑定内容文本） v-on(标签绑定事件) v-show（display:none）
//v-for循环渲染搭配v-bind:key='当前列表中唯一值，一般绑id'提升循环渲染性能
//v-band 是给所有标签属性绑定值（官方加自定义）绑定值
//通过ref获取页面上节点
import { ref,onMounted,watch,watchEffect,isRef,reactive,toRef,toRefs,toRaw,toValue } from "vue";
import { Icon } from "@iconify/vue";
import { useApi,useSetting } from "@/hooks";
import { VueDraggable } from 'vue-draggable-plus';
import axios from "axios";
import Tree from "@/components/Tree.vue";
import "../config/setting.json"
import Dropdown from "@/components/dropdown.vue";
// import path from "path";

var str = ref('hello.js');
const dropdownList1 = [
  {name:"Open Editors",disable:false,code:11},
  {name:"Folders",disable:true,code:12},
  {name:"Outline",disable:false,code:13},
  {name:"TimeLine",disable:false,code:14},
];
const dropdownList2 = [
  {name:"Clear Terminal",disable:false,code:21},
  {name:"Scroll To Next Command",disable:true,code:22},
  {name:"Scroll To Previous Command",disable:true,code:23},
  {name:"Run Active File",disable:false,code:24},
  {name:"Run Selected Text",disable:false,code:25},
];
const tooltipVisible = ref(false);
const column = ["fluent:layout-column-two-focus-left-24-filled",
  "fluent:layout-column-one-third-left-24-regular"]
const TOP = ref("top: 104px");

setTimeout(()=>{
  str.value = "hi,vue,js";
  console.log("时间到");
},5000);

function activeMenu(callback) {
  const item = ref(-1);
  function topmove(num) {
    if(num!==0) TOP.value=`top:${num*44+60}px`;
    if(item.value===num) item.value=-1;
    else item.value=num;
  }
  watchEffect(function(){
    callback(item.value);
  });
  return {topmove,item};
}
const {topmove,item} = activeMenu(function(key){
  switch (key) {
    case 0:
      console.log('000000');
      break;
    case 1:
      console.log(111111);
      break;
    case 2:
      console.log(222222);
      break;
    case 3:
      console.log(333333);
      break;
    case 4:
      console.log(444444);
      break;
    case 5:
      console.log(555555);
      break;
    case 6:
      console.log(666666);
      break;
    default:
      break;
  }
})

const { loading,error,data }=useApi(()=>axios.get("/api/shui"),{
  defaultData:[],
});

watchEffect(()=>{
  console.log(loading.value,error.value,data.value);
})

// axios.get('/api/shui')
// .then(function(res){
//   response.value=res.data;
//   console.log(res);
  
// })
// .catch(function(err){
//   console.log(err);
// })
 
//命名规范 组合式函数use开头
//普通和组合式
//组合式函数需要有组合式API参与{ref、watchEffect、onMouted...}的参与
//为了对状态的复用，组件script标签的顶层，其他组合式api中。
const {setting,updateSetting:updateLayoutSetting} = useSetting();
console.log(setting.value);

let h=setting.value.layout.bottomBar.height;
function useMoveable(elementRef){
  const distanceX=ref(0);
  const distanceY=ref(0);
  onMounted(()=>{
    if(!isRef(elementRef)&&!elementRef.value instanceof HTMLElement){
      throw new Error("ElementRef不是一个ref数据或其值不是一个HTML元素");
    }
    elementRef.value.addEventListener('mousedown',({x:starX,y:starY})=>{
      h=setting.value.layout.bottomBar.height;
      const onMousemove=({x:currentX,y:currentY})=>{
        distanceX.value=currentX-starX;
        distanceY.value=currentY-starY;
      };
      document.addEventListener('mousemove',onMousemove);
      document.addEventListener('mouseup',()=>{
        document.removeEventListener('mousemove',onMousemove)
      });
    });
  })
  return {distanceX,distanceY};
}

const elementRef=ref(null);
const {distanceX,distanceY} = useMoveable(elementRef);
watch([distanceY],()=>{
  // console.log(distanceX.value);
  if(h-distanceY.value>20&&h-distanceY.value<300) {
    // console.log(distanceY.value,h);
    updateLayoutSetting({
      bottomBar: {
        height: h-distanceY.value,
      },
    });
  }
});

//reactive只接受对象,使用时无论在script还是在tempate都可以通过属性名访问
//ref接受所有,使用时在script通过.value取值，在tempate都可以通过属性名访问
//reactive可以通过toRef、toRefs转换为ref 使用toRaw还原原始数据
//ref通过JSON.parse(JSON.stringify(toValue(baz)))还原原始数据
const bar = reactive({
  a:1,b:2,
});
const barB = toRef(bar,"b");
const refsOfBar = toRefs(bar);
const baseOfbar = toRaw(bar);
const baz = ref({
  a:1,b:2,
});
const baseOfBaz = JSON.parse(JSON.stringify(toValue(baz)));
const onBarClick = () => {
  bar.a==1? bar.a=bar.b:bar.a=1;
}
const onBazClick = () => {
  baz.value.a==1? baz.value.a=baz.value.b:baz.value.a=1;
}
//指令：v-指令名：参数.修饰符=绑定的值
//v-指令名=绑定的值 v-text v-show
//v-指令名：参数=绑定的值 v-on v-bind
//v-指令名：参数.修饰符=绑定的值 v-on

function arr1Callback({code}) {
  switch(code) {
    case 11:
      console.log("选中选项1");
      break;
    case 12:
      console.log("选中选项2");
      break;
    case 13:
      console.log("选中选项3");
      break;
    case 14:
      console.log("选中选项4");
      break;
    default:
      break;
  }
}
function arr2Callback({code}) {
  switch(code) {
    case 21:
      console.log("选中选项1");
      break;
    case 22:
      console.log("选中选项2");
      break;
    case 23:
      console.log("选中选项3");
      break;
    case 24:
      console.log("选中选项4");
      break;
    case 25:
      console.log("选中选项5");
      break;
    default:
      break;
  }
}
</script>
<style scoped>
@keyframes delay {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: transparent;
  }
  100% {
    background-color: #f87171;
  }
}
.highlight:hover{
  animation: delay 1s forwards;
}
</style>