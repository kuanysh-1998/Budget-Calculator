let viewController = (function() {

    let DOMstrings = {
        form: '#budget-form',
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        incomeContainer: '#income__list',
        expenseContainer: '#expenses__list',
        budgetLabel: '#budget-value',
        incomeLabel: '#income-label',
        expensesLabel: '#expenses-label',
        expensesPercentLabel: '#expense-percent-label',
        budgetTable: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year'
    }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    }

    function formatNumber (num, type) {
        let numSplit, int, dec, newInt, resultNumber;
        num = Math.abs(num); 
        num = num.toFixed(2);
        numSplit = num.split('.'); // 45.77 => [45, 77]
        int = numSplit[0];
        dec = numSplit[1];

        if (int.length > 3) {
            newInt = '';
            for(let i = 0; i < (int.length / 3); i++) {
                newInt = ',' + int.substring(int.length - 3 * (i + 1), int.length - 3 * i) + newInt;
            }

            if (newInt[0] === ',' ) {
                newInt = newInt.substring(1);
            }
        } else if (int === '0') {
            newInt = '0';
        } else {
            newInt = int;
        }

        resultNumber = newInt + '.' + dec;

        if(type === 'exp') {
            resultNumber = '- ' + resultNumber;
        } else if (type === 'inc') {
            resultNumber = '+ ' + resultNumber; 
        }

        return resultNumber;
        
    }

    function renderListItem (obj, type) {

        let containerElement, HTML;

        if (type === 'inc') {
            containerElement = DOMstrings.incomeContainer;
            HTML = `<li id="inc-${obj.id}" class="budget-list__item item item--income">
                        <div class="item__title">${obj.description}</div>
                        <div class="item__right">
                            <div class="item__amount">${formatNumber(obj.value, type)}</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`
        } else  {
            containerElement = DOMstrings.expenseContainer;
            HTML = `<li id="exp-${obj.id}" class="budget-list__item item item--expense">
                        <div class="item__title">${obj.description}</div>
                        <div class="item__right">
                            <div class="item__amount">
                                ${formatNumber(obj.value, type)};
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                         15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`;
        }

        document.querySelector(containerElement).insertAdjacentHTML('beforeend', HTML);
    }

    function clearFields () {
        let inputDesc, inputVal;

        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = '';
        inputDesc.focus();
        inputVal.value = '';
    }

    function updateBudget(obj) {
        let type;
        if (obj.budget > 0) {
            type === 'inc';
        } else {
            type = 'exp';
        }
        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
    
        if(obj.percentage > 0 ) {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = `${obj.percentage}%`;
        } else {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = '--';
        }
    }

    function deleteItem (itemID) {
        document.getElementById(itemID).remove();
    }

 
    function updateItemsPercentages(items){

        items.forEach(function(item){

            // Находим блок с процентами внутри текущей записи
            var el = document.getElementById(`exp-${item[0]}`).querySelector(".item__percent");

            if ( item[1] >= 0) {
                el.parentElement.style.display = "block";
                el.textContent = `${item[1]}  %`;
            } else {
                el.parentElement.style.display = "none";
            }


        })
    }

    function displayMonth () {
        let now, year, month;

        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        monthArr = [
            'Январь', 'Февраль', 'Март',
            'Апрель', 'Май', 'Июнь', 'Июль', 
            'Август', 'Сентябрь', 'Октябрь',
            'Ноябрь', 'Декабрь'
        ];

        month = monthArr[month];
        document.querySelector(DOMstrings.monthLabel).innerText = month;
        document.querySelector(DOMstrings.yearLabel).innerText = year;


    }

    return  {
        clearFields: clearFields,
        getInput: getInput,
        renderListItem: renderListItem,
        updateBudget: updateBudget,
        deleteItem: deleteItem,
        updateItemsPercentages: updateItemsPercentages,
        displayMonth: displayMonth,
        getDOMstrings: function() {
            return DOMstrings
        }
    }

})();