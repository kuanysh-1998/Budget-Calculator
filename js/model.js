let modelController = (function() {

    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function (totalIncome) {
        if(totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    }

    Expense.prototype.getPercentage = function() {
        return this.percentage; 
    };

    function addItem (type, desc, val) {

        let newItem, ID; 

        if(data.allItems[type].length > 0) {
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        } else {
            ID = 0;
        }

        if(type === 'inc') {

            newItem = new Income (ID, desc, parseFloat(val))

        } else if (type === 'exp') {

            newItem = new Expense (ID, desc, parseFloat(val))

        }

        data.allItems[type].push(newItem);

        return newItem;
    }

    function deleteItem (type, ID) {

        // находим по ID в массиве с доходами или расходами
      let ids = data.allItems[type].map(function(item) {
            return item.id;
        });
      
        let index = ids.indexOf(ID);

        // удаляем найденную запись из массива
        if (index !== -1) {
            data.allItems[type].splice(index, 1);
        }
    }

    function calculateTotalSum (type) {

        let sum = 0;

            data.allItems[type].forEach(function(item) {
                sum = sum + item.value;
            })


        return sum; 
    }

    function calculateBudget() {
        data.totals.inc = calculateTotalSum('inc'); 
        data.totals.exp = calculateTotalSum('exp'); 

        // общий бюджет 
        data.budget =  data.totals.inc - data.totals.exp;

        // посчитаем % для расходов
        if (data.totals.inc > 0) {
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percantage = -1; 
        }
    }

    function getBudget() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    }

    function calculatePercentages () {
        data.allItems.exp.forEach(function(item) {
            item.calcPercentage(data.totals.inc);
        });
    }

    function getAllIdsAndPercentages () {
        let allPerc = data.allItems.exp.map(function(item) {
            return [item.id, item.getPercentage()];
        })

        return allPerc;
    }

    let data = {
        allItems: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        },

        budget: 0,
        percentage: -1
    }

    return {
        addItem: addItem,
        deleteItem: deleteItem,
        calculateBudget: calculateBudget,
        getBudget: getBudget,
        calculatePercentages: calculatePercentages, 
        getAllIdsAndPercentages: getAllIdsAndPercentages,
        test: function () {
            console.log(data);
        }
    }

})();