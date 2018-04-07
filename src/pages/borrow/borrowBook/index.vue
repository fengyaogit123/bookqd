<template>
    <Modal id="borrow" top="5%" width="500" v-model="modal.show" :title="params.borrowStatus==1?'还书':'借书'" @on-ok="modalOk" @on-cancel="cancel">
        <div class="modal-form">
            <Form ref="form" :model="params" :rules="rules" :labelWidth="80">
                <FormItem label="读者" prop="userId">
                    <Select clearable v-model="params.userId" filterable remote :remote-method="remoteMethod" :loading="loading">
                        <Option v-for="(item, index) in users" :value="item._id" :key="item._id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="书名" prop="name">
                    <Input disabled v-model="params.name" placeholder="请输入书名"></Input>
                </FormItem>
                <FormItem label="类别" prop="category">
                    <Select disabled v-model="params.category" filterable>
                        <Option v-for="item in categoryList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="出版社" prop="press">
                    <Select disabled v-model="params.press" filterable>
                        <Option v-for="item in pressList" :value="item._id" :key="item._id">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="作者" prop="author">
                    <Input disabled v-model="params.author" placeholder="请输入作者"></Input>
                </FormItem>
                <FormItem label="简介" prop="desc">
                    <Input disabled v-model="params.desc" type="textarea" :rows="6" placeholder="简介"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="modalOk">{{params.borrowStatus==1?'确认还书':'确认借出'}}</Button>
            <Button type="ghost" @click="cancel">取消</Button>
        </div>
    </Modal>
</template>

<script src="./main.js"></script>
<style lang="less">
.ivu-modal {
  top: 50px;
}
#borrow {
  .ivu-input[disabled],
  fieldset[disabled] .ivu-input {
    background-color: #fff;
  }
  .ivu-input[disabled],
  fieldset[disabled] .ivu-input {
    background-color: #fff;
  }
  .ivu-select-disabled .ivu-select-selection {
    background-color: #fff;
  }
}
</style>

