const getTemplateDate = function(time){
    let date = new Date(time)

    let  Y = date.getFullYear()
    let M = date.getMonth()
    let D = date.getDay()
    let h = date.getHours()
    let m = date.getMinutes()

    // 补零  给1-9 的数据补0
    M = prefixIntrger(M)
    D = prefixIntrger(D)
    h = prefixIntrger(h)
    m = prefixIntrger(m)
    
    // 把年月日 时分秒拼接起来返回出去
    return `${Y}-${M}-${D} ${h}:${m}`
}
const prefixIntrger = function(n){
    n = n +''
    n = (0+ n).substr(n.length -1)
    return n
}
// 将模块暴露出去，才可以引入
export {getTemplateDate}