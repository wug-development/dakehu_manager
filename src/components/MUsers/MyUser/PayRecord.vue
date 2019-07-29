<template>
    <div class="payrecord-box">
        <div class="box-bg">
            <div class="pubtitle">汇款信息</div>
            <div class="div-linebox">
                <div class="div-label">汇款金额:</div>
                <el-input v-model="money"></el-input>
                <div class="div-labels">汇款方式:</div>
                <el-select v-model="selCompany">
                    <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <div class="div-labels">汇款日期:</div>
                <el-date-picker v-model="sdate" type="date"></el-date-picker>
                <div class="div-labels">汇款单位:</div>
                <el-select v-model="selCompany">
                    <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <div class="div-labels">备注:</div>
                <el-input v-model="other"></el-input>
                <div class="btn-other">提交</div>
            </div>
        </div>
        <div class="box-bg remit-money">
            <div class="pubtitle">汇款列表</div>
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th></th>
                        <th>汇款金额</th>
                        <th>汇款方式</th>
                        <th>汇款日期</th>
                        <th>付款单位</th>
                        <th>备注</th>
                        <th>状态</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in dataList" :key="i">
                        <td></td>
                        <td>{{item.money}}</td>
                        <td>{{item.method}}</td>
                        <td>{{item.datetime}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.other}}</td>
                        <td class="active">{{item.status}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="div_page">
                <el-pagination background layout="prev, pager, next" :page-size="5" @current-change="handleCurrentChange" :total="1000"></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PayRecord',
    data () {
        return {
            money: '',
            selCompany: '',
            sdate: '',
            other: '',
            company: [],
            dataList: []
        }
    },
    methods: {
        handleCurrentChange: function () {

        }
    },
    created () {
        let arr = []
        for (let i = 0; i < 5; i++) {
            arr.push({
                money: 100000,
                method: '银行卡',
                datetime: '2018-1-22',
                company: 'M妙奇艺',
                other: '',
                status: '等待确认'
            })
        }
        this.dataList = arr
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
@import '@/assets/sass/table-list.scss';
.payrecord-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    .btn-other{
        width: 80px;
        margin-left: 20px;
    }
    .remit-money{
        margin-top: 20px;
        height: 100%;
    }
}
</style>
