// 全局通讯总线
import Vue from 'vue'
//假设    a    组件要给  b   组件发送数据
//b注册通讯组件
//import globalBus from '@/global-bus'
// globalBus.$on('foo',(data)=>{处理函数})

//a发布通信事件
//import globalBus from '@/global-bus'
// globalbus.$emit('bar',12213)

// 注意：通信的两端所使用的事件名称必须一致，否则是无效的
//反之，如果b要给a发送数据
//肯定就是a注册事件，b来发布

export default new Vue()