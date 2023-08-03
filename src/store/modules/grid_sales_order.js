const state = () => {
    return {
        grid_sales_order: {},
    };
}

const mutations = {
    SET_GRID_SALES_ORDER(state, payload) {
        state.grid_sales_order = payload;
    },

    CLEAR_STATE(state) {
        state.grid_sales_order = {};
    }
}

const getters = {
    GridSalesOrder(state) {
        return state.grid_sales_order;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}