import * as types from '../actions/action-type.js';
import data from '../data/db.js';

const initialState = {
    show: false,
    planlist: data
};

// reducer必须是一个function类型，此方法根据action.type更新state
const planReducer = function (state = initialState, action) {
    let list = state.planlist;//planlist中存放的是data数组
    switch (action.type) {
        case types.ADD:
            list.push(action.item);
            // 使用Object.assign()创建了一个副本，必须把第一个参数设置为对象！！！这样才能修改State
            return Object.assign({}, state, { planlist: list });
        case types.DELECT:
            let newstate = list.filter((item) => item.id != action.id);
            return Object.assign({}, state, { planlist: newstate });
        case types.SHOW:
            return Object.assign({}, state, { show: action.show });
    }
    return state;
}

export default planReducer;