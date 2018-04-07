<template>
    <FyLayout bgColor="#fff">
        <!-- user-->
        <SearchBox @search="showList()" @reset="reset" :params="params">
            <template slot="body" slot-scope="props">
                <Col :lg="6" :sm="8" :xs="24">
                    <!-- <FormItem label="借阅状态" prop="borrowStatus">
                        <Select clearable v-model="params.borrowStatus" filterable>
                            <Option value="1" key="1">借书</Option>
                            <Option value="0" key="0">还书</Option>
                        </Select>
                    </FormItem> -->
                </Col>
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
        <NewRow :modal="modal" @ok="showList()" />
    </FyLayout>
</template>

<script src="./main.js">
</script>

