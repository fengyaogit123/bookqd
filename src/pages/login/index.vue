<template>
    <div id="login">
        <div class="login-mask"></div>
        <div class="form-wrap">
            <p>
                <span>Admin Login</span>
            </p>
            <Form ref="forms" :model="forms" :rules="rules">
                <FormItem prop="userName">
                    <Input v-model.trim="forms.userName" size="large" placeholder="请输入账号/邮箱"></Input>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model.trim="forms.password" type="password" size="large" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem prop="img" class="form-margin">
                    <div class="form-code">
                        <Input v-model.trim="forms.img" size="large" placeholder="请输入验证码"></Input>
                        <img width="100" height="40" @click="resetCode" class="checkcode" :src="code" alt="验证码">
                    </div>
                </FormItem>
                <FormItem class="form-margin">
                    <Checkbox size="large" v-model="remember">
                        记住密码
                    </Checkbox>
                </FormItem>
                <FormItem class="form-margin">
                    <Button @click="submit" :loading="loading" size="large" long type="primary">登录</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script src="./main"></script>
<style lang="less">
@import "./style.less";
</style>
