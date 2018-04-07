import http from '@/utils/request.js'

export const Category = {
    async  get(params) {
        return await http({
            url: '/api/category/list',
            params
        });
    },
    async getAll(params) {
        return await http({
            url: '/api/category/allList',
            params
        });
    },
    async create(data) {
        return await http({
            url: '/api/category/create',
            method: "post",
            data
        });
    },
    async update(data) {
        return await http({
            url: '/api/category/update',
            method: "post",
            data
        });
    },
    async  delete(data) {
        return await http({
            url: '/api/category/remove',
            method: 'delete',
            data
        });
    }
}

export const Press = {
    async  get(params) {
        return await http({
            url: '/api/press/list',
            params
        });
    },
    async  getAll(params) {
        return await http({
            url: '/api/press/allList',
            params
        });
    },
    async create(data) {
        return await http({
            url: '/api/press/create',
            method: "post",
            data
        });
    },
    async update(data) {
        return await http({
            url: '/api/press/update',
            method: "post",
            data
        });
    },
    async  delete(data) {
        return await http({
            url: '/api/press/remove',
            method: 'delete',
            data
        });
    }
}

export const Book = {
    async  get(params) {
        return await http({
            url: '/api/book/list',
            params
        });
    },
    async create(data) {
        return await http({
            url: '/api/book/create',
            method: "post",
            data
        });
    },
    async update(data) {
        return await http({
            url: '/api/book/update',
            method: "post",
            data
        });
    },
    async  delete(data) {
        return await http({
            url: '/api/book/remove',
            method: 'delete',
            data
        });
    },
    async borrow(data) {
        return await http({
            url: '/api/book/borrow',
            method: "post",
            data
        });
    },
    async readingAmount(){
        return await http({
            url: '/api/book/readingAmount',
        });
    }
}


export const User = {
    async  login(data) {
        return await http({
            url: '/api/login',
            method: 'post',
            data
        });
    },
    async loginOut() {
        return await http({
            url: '/api/loginOut',
            method: 'post'
        })
    },
    async  get(params) {
        return await http({
            url: '/api/users/list',
            params
        });
    },
    async create(data) {
        return await http({
            url: '/api/users/create',
            method: "post",
            data
        });
    },
    async update(data) {
        return await http({
            url: '/api/users/update',
            method: "post",
            data
        });
    },
    async  delete(data) {
        return await http({
            url: '/api/users/remove',
            method: 'delete',
            data
        });
    }
}


export const Borrow = {
    async get(params) {
        return await http({
            url: '/api/book/record',
            params
        });
    }
}