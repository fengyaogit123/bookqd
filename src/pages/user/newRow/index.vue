<template>
    <Modal width="500" v-model="modal.show" :title="this.params._id?'编辑':'新增'" @on-ok="modalOk" @on-cancel="cancel">
        <div class="modal-form">
            <Form ref="form" :model="params" :rules="rules" :labelWidth="80">
                <FormItem label="姓名" prop="name">
                    <Input v-model="params.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="性别" prop="sex">
                    <RadioGroup v-model="params.sex">
                        <Radio label="男">
                            <span>男</span>
                        </Radio>
                        <Radio label="女">
                            <span>女</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="管理员" prop="isAdmin">
                    <RadioGroup v-model="params.isAdmin">
                        <Radio label="true">
                            <span>是</span>
                        </Radio>
                        <Radio label="false">
                            <span>否</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="账号" prop="userName">
                    <Input v-model="params.userName" placeholder="请输入账号"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="params.password" placeholder="请输入密码"></Input>
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
