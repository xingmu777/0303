//导入createApp模块
//作用：创建一个Vue的应用
import { createApp } from 'vue'
import './style.scss';
import './common.css';
// import localforage from 'localforage';
import setting from "../config/setting.json"

//组件：具备HTML+CSS+JS的一个HTML片段（Vue自己定义一种组织html、css、js的一种文件格式）
//作用：替代现有html文件+js文件组织代码方式（革命）
//规范：.vue文件中很多代码块，官方规定的template、style、script代码块
import App from './App.vue';
// localforage.getItem('setting')
// .then((res)=>{
//     console.log(res);
//     if(!res) return localforage.setItem("setting",setting);
// })
// .catch((err)=>{
//     console.log(err);
// })

createApp(App).mount('#app')
