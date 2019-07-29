<template>
    <div class="mpersons-box">
        <div class="box-bg search-box">
            <div class="div-label">公司名称:</div>
            <el-select v-model="selCompany" placeholder="请选择企业">
                <el-option v-for="item in company" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div class="div-label">姓名:</div>
            <el-input v-model="name"></el-input>
            <div class="div-label">手机号:</div>
            <el-input v-model="phone"></el-input>
            <div class="btn">搜索</div>
        </div>
        <div class="box-bg alluser-list-box">
            <div class="pubtitle">全部乘机人</div>
            <table class="table-list" cellspacing="0" cellpadding="0">
                <thead class="table-list-head">
                    <tr>
                        <th></th>
                        <th>姓名</th>
                        <th>公司名称</th>
                        <th>乘机人手机</th>
                        <th>紧急人手机</th>
                        <th>证件号码</th>
                        <th>护照号</th>
                        <th>护照到期日</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody class="table-list-body">
                    <tr v-for="(item, i) in dataList" :key="i">
                        <td></td>
                        <td>{{item.name}}</td>
                        <td>{{item.company}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.jjphone}}</td>
                        <td>{{item.idcard}}</td>
                        <td>{{item.hzno}}</td>
                        <td>{{item.endtime}}</td>
                        <td>
                            <div class="btns-box">
                                <div class="btn-edit">修改</div>
                                <div class="btn-del">删除</div>
                            </div>
                        </td>
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
    name: 'MPersons',
    data () {
        return {
            selCompany: '',
            company: [],
            name: '',
            phone: '',
            dataList: []
        }
    },
    created () {
        let arr = []
        for (let i = 0; i < 5; i++) {
            arr.push({
                name: '王平',
                company: '保利科技',
                phone: '',
                jjphone: '12345625435',
                idcard: '6101234567891427755',
                hzno: '85424457755',
                endtime: '2018/08/08'
            })
        }
        this.dataList = arr
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/set.scss';
@import '@/assets/sass/table-list.scss';
.mpersons-box{
    height: 100%;
    display: flex;
    flex-direction: column;
    .search-box{
        padding: 20px;
        box-sizing: border-box;
        line-height: 40px;
        display: flex;
        .el-input{
            margin-right: 40px;
        }
    }
    .alluser-list-box{
        margin-top: 20px;
        height: 100%;
    }
}
</style>
