<template>
    <Modal width="500" v-model="modal.show" :title="this.params._id?'编辑':'新增'" @on-ok="modalOk" @on-cancel="cancel">
        <div class="modal-form">
            <Form ref="form" :model="params" :rules="rules" :labelWidth="80">
                <FormItem label="类别" prop="name">
                    <Input v-model="params.name" placeholder="请输入类别名称"></Input>
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
