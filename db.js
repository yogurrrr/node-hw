const expenses = []
let dailyLimit = 0

function add(expense) {
    expenses.push(expense)
}

function get() {
    return [...expenses]
}

function setLimit(limit) {
    dailyLimit = limit
}

function getLimit() {
    return dailyLimit
}

module.exports = {
    get,
    add,
    setLimit,
    getLimit,
}