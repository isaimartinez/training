export default (state, action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter(trans => trans.id !== action.id)
            }
        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    action.transaction
                ]
            }
        default:
            return state;
    }
}