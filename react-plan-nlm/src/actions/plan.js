import * as types from './action-type.js'; //import * as是将‘./action-type.js’中的所有的东西全部引进来
// import ADD from './action-type.js'; 表明引用'./action-type.js'某一个

export function addPlan(item) {
    return {
        type: types.ADD,
        item
    };
}

export function deletePlan(id) {
    return {
        type: types.DELECT,
        id
    }
}

export function show(show) {
    return {
        type: types.SHOW,
        show
    };
}