
// BUDGETCONTROLLER
// creates a module to control the budget

var budgetController = (function () {
    // creates a function constructor for the expenses
    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };
       // creates a function constructor for the Income
       class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    };
    
    // stores all the input data into an array. i.e Expense and Income
    var data = {
        allItems: {
            exp: [],
            inc:[]
        },
    // stores the total income and total Expense into an Array
        total: {
            allexp: 0,
            allinc: 0
        }

    };
    
    return {
        addItem: function(budgetType, budgetDes, budgetVal) {
            var newItem, ID; 

            // creates a new ID for each of the budgets
            if (data.allItems[budgetType].length > 0) {

            ID = data.allItems[budgetType][data.allItems[budgetType].length - 1].id + 1;
                
            } else {
                ID = 0;
                
            }

            // creates a new item based on 'inc' or 'exp' type
            if (budgetType === 'exp') {

                newItem = new Expense(ID, budgetDes, budgetVal)
                
            } else if (budgetType === 'inc') {

                newItem = new Income(ID, budgetDes, budgetVal)
                
            };

            // push the new item into our data structure Array
            data.allItems[budgetType].push(newItem);

            // return the new item
            return newItem;

        }
    };

})();


// UICONTROLLER

// creates a module to control the UI being updated

var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        ExpensesContainer: '.expenses__list',
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //this can be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };

        },
        addListItem: function(obj, budgetType) {
            var html, newHtml, element;

            // creates an HTML string with placeholder text
            if (budgetType === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix">div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                
            } else if (budgetType === 'exp') {
                element = DOMstrings.ExpensesContainer;
            '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

        // Replace the place holder text with some actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML()

        },
        getDOMstrings: function() {
            return DOMstrings;
            
        }
    };

})();

// GLOBAL APP CONTROLLER,
// creates another module that interacts with the budgetController and the UIController
var controller = (function(budgetCtrl,UICtrl) {

    var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // gets the field input when the user presses the enter key
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
                
            };
        });
    };

    var ctrlAddItem = function () {

        var input, newItem;
        // 1.Get the field input data
        input = UICtrl.getInput();
        // console.log(input);

        // 2.Add the item to the budgetController
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        console.log(newItem);
        
        // 3.Add the item to the UIController

        // 4. Calculate the budget

        // 5.Display the budget on the UI

        
    };
    return {

        // initialization of everthing
        init: function() {
            console.log('Application has started.');

            setupEventListeners();
            
            
        }
    };

})
(budgetController, UIController);
controller.init();
