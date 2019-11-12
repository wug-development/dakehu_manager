var utils = {
  /*
  * startdate: 开始时间
  * NYear: N年
  * */
    getAfterNDate : function (startdate, n, type) {
        var date = new Date();
        var number = 0;
        if((typeof startdate === "object" || typeof startdate === "string") && typeof n === "number"){
            date = new Date(startdate);
            number = n;
        }else if(typeof startdate === "number"){
            number = startdate;
        }
        type = type || n;
        switch (type) {
            case "y": {
                date.setFullYear(date.getFullYear() + number);
                break;
            }
            case "q": {
                date.setMonth(date.getMonth() + number * 3);
                break;
            }
            case "M": {
                date.setMonth(date.getMonth() + number);
            }
            case "w": {
                date.setDate(date.getDate() + number * 7);
                break;
            }
            case "d": {
                date.setDate(date.getDate() + number);
                break;
            }
            case "h": {
                date.setHours(date.getHours() + number);
                break;
            }
            case "m": {
                date.setMinutes(date.getMinutes() + number);
                break;
            }
            case "s": {
                date.setSeconds(date.getSeconds() + number);
                break;
            }
            default: {
                date.setDate(date.getDate() + number);
                break;
            }
        }
        return date;
    },
    /*
    * d: date
    * fmt: yyyy-MM-dd
    * fmt: yyyy-MM-dd HH:mm:ss
    * */
    dateFormat : function (d, fmt) {
        var t = new Date();
        if(!fmt){ fmt = d; }
        else if(typeof d === "string"){ t = new Date(d.replace(/-/g,'/')) }
        else { t = d  }
        var o = {
            "M+": t.getMonth() + 1, //月份
            "d+": t.getDate(), //日
            "h+": t.getHours(), //小时
            "m+": t.getMinutes(), //分
            "s+": t.getSeconds(), //秒
            "q+": Math.floor((t.getMonth() + 3) / 3), //季度
            "S": t.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * 日期比大小
     *  */
    dateTab : function(date1,date2){
        var oDate1 = new Date(date1);
        var oDate2 = new Date(date2);
        return oDate1.getTime() > oDate2.getTime()    
    }, 
    /*
    * 获取本地存储数据
    * */
    getItem : function (key) {
        return sessionStorage.getItem(key);
    },
    /*
    * 设置本地存储数据
    * */
    setItem : function (key, data) {
        sessionStorage.setItem(key,data);
    },
    /*
    * http 请求数据
    * */
    ajax : function (options, origin) {
        var defualt = {
            name: options.name || 'Vue',
            method: options.method || 'get',
            uri: options.uri,
            params: options.params || {},
            success: options.success || function (){},
            fail: options.fail || function (){},
            compvare: options.compvare || function (){},
            origin: options.origin
        }
        if(defualt.method === 'get'){
            return defualt.name.$http.get((origin || defualt.name.urio) + defualt.uri, defualt.params)
              .then(defualt.success)
              .catch(defualt.fail)
            //.compvare(defualt.compvare);
        } else {
            return defualt.name.$http.post((origin || defualt.name.urio) + defualt.uri, defualt.params)
              .then(defualt.success)
              .catch(defualt.fail)
            //.compvare(defualt.compvare);
        }
    },
    http(options){
        return this.ajax(options, options.name.uris)
    },
    alert(vue, content, title){
        return vue.MessageBox(title || '温馨提示', content)
    },
    checkTel(val){
        return /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/.test(val)
    },
    checkEmail(v){
        return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(v);
    },
    englishName(name){
        return /^[a-zA-Z\/ ]{2,20}$/.test(name)
    },
    isNumber(v) {
        return new RegExp(/^\d+$/).test(v)
    },
    isEn(v){
        return new RegExp(/^[A-Za-z]+$/).test(v)
    },
    isCn(v){
        return new RegExp(/^[\u4e00-\u9fa5]+$/).test(v)
    },
    isNumberEn(v){
        return new RegExp(/^[A-Za-z0-9]+$/).test(v)
    },
    clearSpace(v){
        return v.replace(/ /g,'')
    },
    getAccount(vue){
        const _account = sessionStorage.getItem('account')
        if (!_account) {
            vue.MessageBox.alert('请登录').then(() => {
                vue.$router.push({
                    path: '/'
                })
            })
            return {}
        } else {
            return JSON.parse(_account)
        }
    },
    checkStatus (v) {
        let s = ''
        switch (v) {
            case 0: s = '等待处理'; break;
            case 1: s = '处理完成'; break;
            case 2: s = '后补等待'; break;
            case 3: s = '处理完成'; break;
        }
        return s
    }
};
export default {
    utils
}
