import { onMounted,ref,watch,reactive,toRef,toRaw } from "vue"
import localforage from "localforage"
import store from "store"
import { _,merge } from "lodash"
import defaultStting from "../../config/setting.json";
export function useClickOutside(domRef,callback){
    onMounted(function(){
    document.addEventListener("click",function(e){
      // console.log(domRef.value);
      if (!domRef.value?.contains(e.target)) {
          callback()
      }
    })
  })
}

export function useApi(api,option={}) {
  const loading = ref(true);
  const error = ref(null);
  const data = ref(option.defaultData ?? null);
  api()
    .then((res)=>{
      data.value=res.data;
    })
    .catch((err)=>{
      error.value=err;
    })
    .finally(()=>{
      loading.value=false;
    });

  return {data,error,loading};
}
//reative 和 ref 都初始化响应式数据 能ref用ref，否则reative
//reative可转化为ref
export function useSetting() {
  const config = reactive({setting:null});
  //默认初始化不执行 需要手动指定监听数据源
  // watch([setting],()=>{
  //   localforage.setItem("setting",setting.value);
  // });
  const settingFromCache = store.get("setting");
  if(!settingFromCache) {
    config.setting=defaultStting;
    store.set("setting",defaultStting);
  } else {
    config.setting = settingFromCache
  }
  //原有layout配置和{}
  //{bottomBar:{}}
  const updateSetting = (settingPart) => {
    // const configRaw = toRaw(config);
    const newSetting = merge(config.setting,{layout:{...settingPart}});
    config.setting=newSetting;
    store.set("setting",newSetting);
  }
  return {setting:toRef(config,"setting"),updateSetting};
}
