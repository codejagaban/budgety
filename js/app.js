
// BUDGETCONTROLLER
// creates a module to control the budget

var budgetController = (function () {
    // creates a function constructor for the expenses
    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
            this.percentage = -1;
        }
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
      if (totalIncome > 0 ) {
          this.percentage = Math.round((this.value / totalIncome) * 100);
          
      } else {
          this.percentage = -1;
          
      }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
       // creates a function constructor for the Income
       class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }; 

    var calculateTotal = function(typtype) {
        var sum = 0;
        data.allItems[typtype].forEach(function(cur) {
             sum += cur.value;  

        });
        data.total[typtype] = sum; 

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
        },
        budget: 0,
        percentage: -1,

        

    };
    
    return {
        addItem: function(type, budgetDes, budgetVal) {
            var newItem, ID; 

            // creates a new ID for each of the budgets
            if (data.allItems[type].length > 0) {

            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                
            } else {
                ID = 0;
                
            }

            // creates a new item based on 'inc' or 'exp' type
            if (type === 'exp') {

                newItem = new Expense(ID, budgetDes, budgetVal)
                
            } else if (type === 'inc') {

                newItem = new Income(ID, budgetDes, budgetVal)
                
            };

            // push the new item into our data structure Array
            data.allItems[type].push(newItem);

            // return the new item
            return newItem;

        },

        deleteItem: function (type, id) {
            var ids, index;

           var ids = data.allItems[type].map(function(current) {
               return current.id;

            });

            index = ids.indexOf(id);

            if (index !== -1 ) {
                data.allItems[type].splice(index, 1);

            }
        },


        
        calculateBudget:  function() { 
        // calculate the total income and expenses
        calculateTotal('exp');
        calculateTotal('inc');

        // calculate the budget: income - epenses
        data.budget = data.total.inc - data.total.exp;



        if (data.total.inc > 0 ) {
        // calculate the percentage of income that we spent
        data.percentage = Math.round((data.total.exp / data.total.inc) * 100)
        } else {
            data.percentage = -1;
        }

        },

        calculatePercentages: function() {
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.total.inc);

            });
            
        },
        getPercentage: function() {
            var allPerc = data.allItems.exp.map(function(cur) {

                return cur.getPercentage();
            });

            return allPerc;

        },


        getBudget: function() {
            return {
                budget: data.budget,
                totalInc:data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            }
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
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentage: '.budget__expenses--percentage', 
        container: '.container',
        expensesPercLabel: '.item__percentage',

    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //this can be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };

        },
        addListItem: function(obj, type) {
            var html, newHtml, element;

            // creates an HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">$ %value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="icon icon-arrows-circle-remove"></i></button></div></div></div>';
                
            } else if (type === 'exp') {
                element = DOMstrings.ExpensesContainer;
           html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">$ %value%</div><div class="item__percentage"></div><div class="item__delete"><button class="item__delete--btn"><i class="icon icon-arrows-circle-remove"></i></button></div></div></div>'
            }

        // Replace the place holder text with some actual data
        newHtml = html.replace('%id%', obj.id);
        newHtml = newHtml.replace('%description%', obj.description);
        newHtml = newHtml.replace('%value%', obj.value);

            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },


        // clears the fields once the user hits enter or press the accept button

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            // converts the list of element to an array
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(current => {
                current.value = "";
                
            });

            // changes to the first element in the fields array
            fieldsArr[0].focus();

        },
        displayBudget: function(obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
      
            if (obj.percentage > 0 ) {
                
            document.querySelector(DOMstrings.percentage).textContent = obj.percentage + "%";

            } else {

            document.querySelector(DOMstrings.percentage).textContent = "---";
                
            }
      
      
        }, 
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            var NodeListForEach = function(list, callback) {

                for (var i = 0; i< list.length; i++) {

                    callback(list[i], i);
                }


            }; 
            NodeListForEach(fields, function(current, index) {

                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + "%";
                }
                else {
                    current.textContent = "---";
                }
            });

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
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    var updateBudget = function () {

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        console.log(budget);
        

        // 3 Display the budget on the UI
        UICtrl.displayBudget(budget);

        
    };

    var updatePercentages = function () {

        // 1.calculate percentages
       budgetCtrl.calculatePercentages();

        // 2.read percentages from the budget controller
        var percentages = budgetCtrl.getPercentage();

        // 3.update the UI with the new percentages
        UICtrl.displayPercentages(percentages);

    };

    var ctrlAddItem = function () {

        var input, newItem;
        // 1.Get the field input data
        input = UICtrl.getInput();

        // a new item should be added only if there is no empty description and value is not NaN and if the value is greater than 0

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

        // 2.Add the item to the budgetController
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        console.log(newItem);
        
        // 3.Add the item to the UIController
        UICtrl.addListItem(newItem, input.type);
        
        // 4. Clear the fields
        UICtrl.clearFields();


        } else {
            
        }
        // 5.Calculate and update the budget
        updateBudget();

        // 6.Calculate and update percentages
        updatePercentages();
 
        
    };

    var ctrlDeleteItem = function (event) {
        var itemID, splitID, type, ID;

       itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {

            splitID = itemID.split('-');

            type = splitID[0];

            ID = parseInt(splitID[1]);



            // 1.delete the item from the data structure

            budgetCtrl.deleteItem(type, ID);


            // 2.Delete the item from the UI
            UICtrl.deleteListItem(itemID);


            // 3.Update and show the new budget
            updateBudget();

            // 4.calculate and update percentages

            updatePercentages();
            

  
            
        } else {
            
        }
        
    }
    return {

        // initialization of everthing
        init: function() {
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc:0,
                totalExp: 0,
                percentage: -1

            })

            setupEventListeners();
            
            
        }
    };

})
(budgetController, UIController);
controller.init();


// Generate PDF Function
// var doc = new jsPDF();
// var specialElementHandlers = {
//     '#editor' : function (element, renderer) {
//         return true;
//     }
// };
git 
// $('.generatePDF').click(function (){
//     doc.fromHTML($('#content').html(), 15, 15, {
//         'width' : 200,
//         'elementHandlers' : specialElementHandlers
//     });
//     doc.save('budget.pdf');
// })

