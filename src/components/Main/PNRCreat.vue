<template>
    <div class="pnrcreat-box">
        <SiteMap></SiteMap>
        <div class="box-bg search-box">
            <div class="div-box">
                <div>公司名称:</div>
                <el-select v-model="selCompany" value-key="name" filterable :filter-method="remoteMethod" @change="checkCompany" placeholder="请选择企业">
                    <el-option v-for="item in company" :key="item.id" :label="item.name" :value="item"></el-option>
                </el-select>
                <el-select v-model="selChildCompany" filterable placeholder="请选择子公司">
                    <el-option v-for="item in childCompany" :key="item.id" :label="item.shortname" :value="item"></el-option>
                </el-select>
            </div>
            <div class="div-box div-gn">
                <div>PNR:</div>
                <div class="div-textarea">
                    <textarea name="" id="" v-model="txt_PNR" cols="30" rows="10"></textarea>
                </div>
                <div class="btn-search" @click="btnCreate">
                    生成
                </div>
            </div>
        </div>
        <div class="box-bg body-box">
            <table class="pnr-result" cellspacing="1" cellpadding="0">
                <tbody>
                    <tr>
                        <td>订单号：</td>
                        <td><input type="text" readonly /></td>
                        <td>预定时间：</td>
                        <td><input type="text" readonly /></td>
                    </tr>
                    <tr>
                        <td>出发日期：</td>
                        <td><input type="text" v-model="flightInfo.sdate" /></td>
                        <td>订单状态：</td>
                        <td><input type="text" readonly value="出票等待" /></td>
                    </tr>
                    <tr>
                        <td>起落机场：</td>
                        <td><div class="flex"><input type="text" class="m" v-model="flightInfo.scity" />-<input type="text" class="m" v-model="flightInfo.ecity" /></div></td>
                        <td>票号：</td>
                        <td><input type="text" v-model="flightInfo.ticketNo" /></td>
                    </tr>
                    <tr>
                        <td>航班号：</td>
                        <td><input type="text" v-model="flightInfo.airNo" /></td>
                        <td>航站楼：</td>
                        <td><input type="text" v-model="flightInfo.airTerminal" /></td>
                    </tr>
                    <tr>
                        <td>起落时间：</td>
                        <td><div class="flex"><input type="text" class="m" v-model="flightInfo.stime" />-<input type="text" class="m" v-model="flightInfo.etime" /></div></td>
                        <td>CTCM：</td>
                        <td><input type="text" v-model="flightInfo.CTCM" /></td>
                    </tr>
                    <tr>
                        <td>舱位：</td>
                        <td><input type="text" v-model="flightInfo.airCabin" /></td>
                        <td>CTCT：</td>
                        <td><input type="text" v-model="flightInfo.CTCT" /></td>
                    </tr>
                    <tr>
                        <td>折扣：</td>
                        <td><input type="text" v-model="flightInfo.zhekou" /></td>
                        <td>记录编号：</td>
                        <td><input type="text" v-model="flightInfo.recordNo" /></td>
                    </tr>
                    <tr>
                        <td>订单金额：</td>
                        <td><input type="text" v-model="flightInfo.totalPrice" /></td>
                        <td>备注：</td>
                        <td><input type="text" v-model="flightInfo.content" /></td>
                    </tr>
                </tbody>
            </table>
            <table class="pnr-persons" cellspacing="1" cellpadding="0">
                <thead>
                    <tr>
                        <th>乘机人</th>
                        <th>联系电话（CTCM）</th>
                        <th>证件类型</th>
                        <th>证件号码</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in flightInfo.Persons" :key="i">
                        <td><input type="text" v-model="item.name" /></td>
                        <td><input type="text" v-model="item.phone" /></td>
                        <td><input type="text" v-model="item.cardtype" /></td>
                        <td><input type="text" v-model="item.idcard" /></td>
                    </tr>
                </tbody>
            </table>
            <div>
                <div class="btn" @click="submit">提交</div>
            </div>
        </div>
    </div>
</template>

<script>
import SiteMap from '../Common/SiteMap.vue'

export default {
    name: 'PNRCreat',
    data () {
        return {
            company: [],
            childCompany: [],
            selCompany: '',
            selChildCompany: '',
            selStartCity: '',
            selEndCity: '',
            StartCity: [],
            EndCity: [],
            pickerOptions: {},
            sdate: '',
            txt_PNR: '',
            flightInfo: {
                sdate: '',
                scity: '',
                stime: '',
                ecity: '',
                etime: '',
                ticketNo: '', // 票号
                airNo: '', // 航班号
                airTerminal: '', // 航站楼
                CTCM: '',
                CTCT: '',
                airCabin: '', // 舱位
                recordNo: '', // 记录编号
                zhekou: '',
                totalPrice: '',
                content: '',
                Persons: [],
                fligthList: []
            }
        }
    },
    methods: {
        checkCompany: function (v) {
            if (v != 2) {
                this.selChildCompany = ''
            }
            this.$http.get(this.apis + '/api/company/getfiltersubcompany', {params: {
                id: this.selCompany.id
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    this.childCompany = res.data.data
                }
            })
        },
        remoteMethod: function (v) {
            this.$http.get(this.apis + '/api/company/getfiltercompany', {params: {
                name: v
            }})
            .then(res => {
                if (res && res.data && res.data.status != 0) {
                    let arr = res.data.data
                    arr.sort((x, y) => {
                        return x.shortname.charCodeAt(0) - y.shortname.charCodeAt(0)
                    })
                    this.company = arr
                }
            })
        },
        btnCreate () {
            if (this.txt_PNR) {
                let arr = this.txt_PNR.split(/\n/g)
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = arr[i].replace(/\s+/g, " ");
                    arr[i] = arr[i].replace(/(^\s*)|(\s*$)/g, "");
                }
                if (arr[0].length < 1) {
                    arr.splice(0, 1)
                }
                var chengkexinxi = [];
                var arr1 = [];
                let cardno = [];
                let cardtype = [];
                let CTCM = [];
                let CTCT = '';
                let tickno = [];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].indexOf("DOCS") != -1) {
                        chengkexinxi.push(arr[i])
                    }
                    var arr2 = []
                    arr2 = arr[i].split(" ")
                    arr1.push(arr2)
                    // 获取证件号码
                    if (arr[i].indexOf('FOID') > -1 && arr[i].indexOf('NI') > -1) {
                        let c = arr[i].split('NI')[1]
                        c = c.split('/')[0]
                        cardno.push(c)
                        if (arr[i].indexOf('MU') > -1) {
                            cardtype.push('护照')
                        } else {
                            cardtype.push('身份证')
                        }
                    }
                    // 获取CTCM
                    if (arr[i].indexOf('CTCM') > -1) {
                        let c = arr[i].split('CTCM')[1]
                        c = c.split('/')[0]
                        CTCM.push(c)
                    }
                    // 获取CTCT
                    if (arr[i].indexOf('CTCT') > -1) {
                        this.flightInfo.CTCT = arr[i].split('CTCT')[1]
                        this.flightInfo.CTCT = this.flightInfo.CTCT.substring(0, 11)
                    }
                    // 获取票号
                    if (arr[i].indexOf('TN/') > -1) {
                        let c = arr[i].split('TN/')[1]
                        c = c.split('/')[0]
                        tickno.push(c)
                    }
                    // 获取总金额
                    if (arr[i].indexOf('ACNY') > -1) {
                        this.flightInfo.totalPrice = arr[i].split('ACNY')[1]
                    }
                }
                this.flightInfo.CTCM = CTCM.join(' ')
                this.flightInfo.ticketNo = tickno.join(' ')
                for (var i = 1; i < arr1.length; i++) {
                    if (arr1[i][1].length > 10) {
                        arr1.splice(i)
                    }
                }
                if (chengkexinxi.length == 0) { //，没有证件信息
                    var ckHtml = '';
                    this.flightInfo.Persons = []
                    for (var i = 0; i < cardno.length; i++) {
                        let pername = ''
                        if (arr1[0][i].indexOf(".") != -1) {                            
                            pername = arr1[0][i].substring(2)
                        }
                        this.flightInfo.Persons.push({
                            name: pername,
                            phone: CTCM[i],
                            cardtype: cardtype[i],
                            sex: '',
                            idcard: cardno[i]
                        })
                    }
                    this.flightInfo.recordNo = arr1[0][cardno.length]

                } else { //有证件信息
                    var ckarr = [];
                    for (var i = 0; i < chengkexinxi.length; i++) {
                        var ckarr1 = [];
                        ckarr1 = chengkexinxi[i].split(" ")[4].split("/");
                        ckarr.push(ckarr1);
                    }
                    var ckHtml = '';
                    for (var i = 0; i < ckarr.length; i++) {
                        let sex = ckarr[i][5] == "F" ? "女" : "男"
                        this.flightInfo.Persons.push({
                            name: ckarr[i][7] + "/" + ckarr[i][8],
                            phone: '',
                            cardtype: '护照',
                            sex: sex,
                            hzh: ckarr[i][2],
                            hzyxq: transDate2(ckarr[i][6]),
                            csrq: transDate1(ckarr[i][4])
                        })
                    }
                }

                let airCabin = []
                let sdate = []
                for (var i = 1; i < arr1.length; i++) {
                    var hzl = "";
                    if (arr1[i][10] == undefined) {
                        if (arr1[i][9] != undefined) {
                            hzl = arr1[i][9].substring(0, 2)
                        }
                    } else {
                        hzl = arr1[i][9]
                    }
                    this.flightInfo.scity = arr1[i][4].substring(0, 3)
                    this.flightInfo.stime = arr1[i][6].substring(0, 2) + ":" + arr1[i][6].substring(2)
                    this.flightInfo.ecity = arr1[i][4].substring(3)
                    this.flightInfo.etime = arr1[i][7].substring(0, 2) + ":" + arr1[i][7].substring(2)
                    this.flightInfo.airTerminal = hzl
                    this.flightInfo.airNo = arr1[i][1]
                    airCabin.push(arr1[i][2])
                    let _sd = transTime(arr1)[i - 1]
                    sdate.push(_sd)
                    this.flightInfo.fligthList.push({
                        sdate: _sd,
                        airno: arr1[i][1],
                        scityshort: arr1[i][4].substring(0, 3),
                        scityport: '',
                        stime: arr1[i][6].substring(0, 2) + ":" + arr1[i][6].substring(2),
                        ecityshort: arr1[i][4].substring(3),
                        ecityport: '',
                        etime: arr1[i][7].substring(0, 2) + ":" + arr1[i][7].substring(2),
                        hzl: hzl,
                        airCabin: arr1[i][2]
                    })
                }
                this.flightInfo.airCabin = airCabin.join(' ')
                this.flightInfo.sdate = sdate.join(' ')
            }
        },
        submit () {
            if (this.selCompany) {
                if (this.flightInfo.totalPrice) {
                    let orderBody = {
                        cid: this.selChildCompany.id || this.selCompany.id,
                        cname: this.selChildCompany.name || this.selCompany.name,
                        flightinfo: this.flightInfo
                    }
                    this.$http.post(this.apis + '/api/gnorder/submitpnrorder', orderBody)
                    .then(res => {
                        if (res && res.data && res.data.status != 0) {
                            this.$store.state.selCompany = this.selCompany
                            this.MessageBox("下单成功！", '温馨提示').then(()=>{
                                this.$router.push({
                                    path: '/main/userbll'
                                })
                            })
                        } else {
                            this.MessageBox("下单失败，请检查数据！", '温馨提示')
                        }
                    });
                } else {
                    this.MessageBox('请输入总金额', '温馨提示')
                }
            } else {
                this.MessageBox('请选择企业', '温馨提示')
            }
        }
    },
    components: {
        SiteMap
    },
    created () {        
        let obj = sessionStorage.getItem('comsearch')
        if (obj) {
            let _d = JSON.parse(obj)
            if (_d.cp) {
                this.selCompany = _d.cp
                if (_d.cc) {
                    this.selChildCompany = _d.cc
                }
                this.checkCompany(2)

                //获取企业列表
                this.remoteMethod(this.selCompany.name)
            }
        }
    }
}


function transTime(data) {
    var arr = [];
    for (var i = 1; i < data.length; i++) {
        arr.push(data[i][3]);
    }
    for (var i = 0; i < arr.length; i++) {
        var yue = "";
        if (arr[i].substring(4) == "JAN") {
            yue = "01";
        } else if (arr[i].substring(4) == "FEB") {
            yue = "02";
        } else if (arr[i].substring(4) == "MAR") {
            yue = "03";
        } else if (arr[i].substring(4) == "APR") {
            yue = "04";
        } else if (arr[i].substring(4) == "MAY") {
            yue = "05";
        } else if (arr[i].substring(4) == "JUN") {
            yue = "06";
        } else if (arr[i].substring(4) == "JUL") {
            yue = "07";
        } else if (arr[i].substring(4) == "AUG") {
            yue = "08";
        } else if (arr[i].substring(4) == "SEP") {
            yue = "09";
        } else if (arr[i].substring(4) == "OCT") {
            yue = "10";
        } else if (arr[i].substring(4) == "NOV") {
            yue = "11";
        } else if (arr[i].substring(4) == "DEC") {
            yue = "12";
        }
        arr[i] = yue + "-" + arr[i].substring(2, 4)
    }
    var myDate = new Date();
    var year = myDate.getFullYear();

    var mouthN = myDate.getMonth() + 1;
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].split("-")[0]) < parseInt(mouthN)) {
            arr[i] = parseInt(year) + 1 + "-" + arr[i];
        } else {
            arr[i] = parseInt(year) + "-" + arr[i]
        }
    }
    return arr;
}

function transDate1(data) {
    var riqi = data.substring(0, 2);
    var yue = data.substring(2, 5);
    var nian = data.substring(5);
    if (yue == "JAN") {
        yue = "01";
    } else if (yue == "FEB") {
        yue = "02";
    } else if (yue == "MAR") {
        yue = "03";
    } else if (yue == "APR") {
        yue = "04";
    } else if (yue == "MAY") {
        yue = "05";
    } else if (yue == "JUN") {
        yue = "06";
    } else if (yue == "JUL") {
        yue = "07";
    } else if (yue == "AUG") {
        yue = "08";
    } else if (yue == "SEP") {
        yue = "09";
    } else if (yue == "OCT") {
        yue = "10";
    } else if (yue == "NOV") {
        yue = "11";
    } else if (yue == "DEC") {
        yue = "12";
    }
    var myDate = new Date();
    var year = myDate.getFullYear();
    if (parseInt(nian) <= parseInt(year.toString().substring(2))) {
        nian = year.toString().substring(0, 2) + "" + nian;
    } else {
        nian = year.toString().substring(0, 2) - 1 + "" + nian;
    }
    return nian + "-" + yue + "-" + riqi;
}

function transDate2(data) {
    var riqi = data.substring(0, 2);
    var yue = data.substring(2, 5);
    var nian = data.substring(5);
    if (yue == "JAN") {
        yue = "01";
    } else if (yue == "FEB") {
        yue = "02";
    } else if (yue == "MAR") {
        yue = "03";
    } else if (yue == "APR") {
        yue = "04";
    } else if (yue == "MAY") {
        yue = "05";
    } else if (yue == "JUN") {
        yue = "06";
    } else if (yue == "JUL") {
        yue = "07";
    } else if (yue == "AUG") {
        yue = "08";
    } else if (yue == "SEP") {
        yue = "09";
    } else if (yue == "OCT") {
        yue = "10";
    } else if (yue == "NOV") {
        yue = "11";
    } else if (yue == "DEC") {
        yue = "12";
    }
    var myDate = new Date();
    var year = myDate.getFullYear();
    nian = year.toString().substring(0, 2) + "" + nian;

    return nian + "-" + yue + "-" + riqi;
}

function transTime1(data) {
    var arr = [];
    for (var i = 0; i < data.length; i++) {
        arr.push(data[i][3]);
    }
    for (var i = 0; i < arr.length; i++) {
        var yue = "";
        if (arr[i].substring(4) == "JAN") {
            yue = "01";
        } else if (arr[i].substring(4) == "FEB") {
            yue = "02";
        } else if (arr[i].substring(4) == "MAR") {
            yue = "03";
        } else if (arr[i].substring(4) == "APR") {
            yue = "04";
        } else if (arr[i].substring(4) == "MAY") {
            yue = "05";
        } else if (arr[i].substring(4) == "JUN") {
            yue = "06";
        } else if (arr[i].substring(4) == "JUL") {
            yue = "07";
        } else if (arr[i].substring(4) == "AUG") {
            yue = "08";
        } else if (arr[i].substring(4) == "SEP") {
            yue = "09";
        } else if (arr[i].substring(4) == "OCT") {
            yue = "10";
        } else if (arr[i].substring(4) == "NOV") {
            yue = "11";
        } else if (arr[i].substring(4) == "DEC") {
            yue = "12";
        }
        arr[i] = yue + "-" + arr[i].substring(2, 4)
    }
    var myDate = new Date();
    var year = myDate.getFullYear();

    var mouthN = myDate.getMonth() + 1;
    for (var i = 0; i < arr.length; i++) {
        if (parseInt(arr[i].split("-")[0]) < parseInt(mouthN)) {
            arr[i] = parseInt(year) + 1 + "-" + arr[i];
        } else {
            arr[i] = parseInt(year) + "-" + arr[i]
        }
    }
    return arr;
}
</script>

<style lang="scss">
@import '../../assets/sass/set.scss';
@import '../../assets/sass/table-list.scss';
.pnrcreat-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-box{
        padding: 22px 35px;
        min-width: 800px;
        .div-box{
            display: flex;
            height: 40px;
            line-height: 40px;
            div{
                margin-right: 20px;
                white-space: nowrap;
            }
            .btn-gj{
                border: 1px solid $pubcolor;
                box-sizing: border-box;
                padding: 0 40px;
                color: $pubcolor;
                user-select: none;
                cursor: pointer;
                box-shadow: 0 1px 2px #ddd;
            }
            .btn-search{
                background-color: $pubcolor;
                color: #fff;
                padding: 0 30px;
                box-shadow: 0 2px 4px #ccc;
                user-select: none;
                cursor: pointer;
                height: 40px;
                min-width: 60px;
                margin-top: 60px;
                text-align: center;
            }
            .div-textarea{
                width: 800px;
                height: 100px;
                border: 1px solid #DCDFE6;
                textarea{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 0;
                    resize: none;
                    background-color: #959595;
                    padding: 10px;
                    box-sizing: border-box;
                }
            }
        }
        .div-gn{
            margin-top: 20px;
            height: auto;
        }
    }
    .body-box{
        margin: 20px 0;
        padding: 20px 35px;
        box-sizing: border-box;
        .pnr-result{
            background-color: #c7c7c7;
            td{
                background-color: #fff;
                font-size: 14px;
                color: #121212;
                text-align: center;
                height: 50px;
                input{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 0;
                    padding: 0 10px;
                    box-sizing: border-box;
                    text-align: center;
                }
                input:read-only{
                    background-color: #f9f9f9;
                    cursor: no-drop;
                }
                .flex{
                    display: flex;
                    height: 100%;
                    line-height: 50px;
                    justify-content: space-between;
                }
                .m{
                    width: 140px;
                }
            }
            td:nth-child(odd){
                background-color: #f1f1f1;
                min-width: 150px;
            }
            td:nth-child(even){
                min-width: 300px;
            }
        }
        .pnr-persons{
            width: 900px;
            margin-top: 40px;
            background-color: #ebe7e8;
            th,td{
                background-color: #fff;
                font-size: 14px;
                color: #121212;
                text-align: center;
                height: 50px;
                input{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border: 0;
                    padding: 0 10px;
                    box-sizing: border-box;
                    text-align: center;
                }
            }
            th{
                background-color: #f4f0ef;
            }
        }
        .btn{
            margin-top: 20px;
        }
    }
}
</style>
