<template>
    <FyLayout bgColor="#fff">
        <!-- user-->
        <SearchBox @search="search()" @reset="reset" :params="params">
            <template slot="body" slot-scope="props">
                <Col :lg="6" :sm="8" :xs="24">
                    <FormItem label="用户名称" prop="name">
                        <Input v-model="params.name" icon="search" placeholder="搜索用户名称"></Input>
                    </FormItem>
                </Col>
            </template>
            <template slot="action">
                <Button @click="addrow()" type="primary" icon="plus-round">新增</Button>
                <Button v-show="rows.length" @click="deletes()" type="ghost">批量删除</Button>
            </template>
        </SearchBox>
        <Table border @on-selection-change="selectChange" :columns="columns" :data="data">
        </Table>
        <!--分页-->
        <Block align="right">
            <Page :total="count" :page-size="params.size" show-elevator :current.sync="params.pageNo" show-total @on-change="pageChange">
            </Page>
        </Block>
        <!--  -->
        <NewRow :modal="modal" @ok="showList()"/>
    </FyLayout>
</template>

<script src="./main.js">
</script>

