<template>
    <Modal top="5%" width="500" v-model="modal.show" :title="this.params._id?'编辑':'新增'" @on-ok="modalOk" @on-cancel="cancel">
        <div class="modal-form">
            <Form ref="form" :model="params" :rules="rules" :labelWidth="80">
                <FormItem label="书名" prop="name">
                    <Input v-model="params.name" placeholder="请输入书名"></Input>
                </FormItem>
                <FormItem label="类别" prop="category">
                    <Select v-model="params.category" filterable>
                        <Option v-for="item in categoryList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="出版社" prop="press">
                    <Select v-model="params.press" filterable>
                        <Option v-for="item in pressList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="作者" prop="author">
                    <Input v-model="params.author" placeholder="请输入作者"></Input>
                </FormItem>
                <FormItem label="状态" prop="borrowStatus">
                    <RadioGroup v-model="params.borrowStatus">
                        <Radio label="0">
                            <span>未借出</span>
                        </Radio>
                        <Radio label="1">
                            <span>已借出</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="简介" prop="desc">
                    <Input v-model="params.desc" type="textarea" :rows="6" placeholder="简介"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="modalOk">确定</Button>
            <Button type="ghost" @click="cancel">取消</Button>
        </div>
    </Modal>
</template>

<script src="./main.js"></script>
<style>
.ivu-modal{
    top: 50px;
}
</style>

