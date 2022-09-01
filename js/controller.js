let controller = (function(budgetCtrl, uiCtrl) {

    let setupEventListener = function () {
        let DOM = uiCtrl.getDOMstrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);

        document.querySelector(DOM.budgetTable).addEventListener('click', ctrlDeleteItem);
    }

    function updatePercentages () {

        budgetCtrl.calculatePercentages(); 
        let idsAndPercents = budgetCtrl.getAllIdsAndPercentages();

        uiCtrl.updateItemsPercentages(idsAndPercents); 
    }

    function ctrlAddItem (e) {
        e.preventDefault();

        let input = uiCtrl.getInput();
        if (input.description !== '' && !isNaN(input.value) && input.value > 0 ) {
            let newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.test();
    
            uiCtrl.renderListItem(newItem, input.type); 
            generateTestData.init();
    
            // uiCtrl.clearFields();

            updateBudget();
            updatePercentages();
        }

    }

    function ctrlDeleteItem (e) {

        let itemID, splitID, type, ID;
        
        if (e.target.closest('.item__remove')) {
            itemID = e.target.closest('li.budget-list__item').id;
            
            splitID = itemID.split('-'); 
            type = splitID[0];
            ID = parseInt(splitID[1]); 

            budgetCtrl.deleteItem(type, ID);

            uiCtrl.deleteItem(itemID);

            updateBudget();
            updatePercentages();
        }
    }

    function updateBudget () {
        budgetCtrl.calculateBudget();

        budgetObj = budgetCtrl.getBudget();
        
        uiCtrl.updateBudget(budgetObj);   
    }

    return {
        init: function () {
            uiCtrl.displayMonth();
            setupEventListener();
            uiCtrl.updateBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
        }
    }

})(modelController, viewController);

controller.init();
