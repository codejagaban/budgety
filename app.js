
// BUDGETCONTROLLER
// creates a module to control the budgets
// placed inside an IIFE to make it private

var budgetController = (function () {

 

})();


// UICONTROLLER
// creates a module to control the UI being updated

// placed inside an IIFE to make it private

var UIController = (function(){
    // some code here
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value'
    };

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, //this can be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };

        },
        getDOMstrings: function() {
            return DOMstrings;
            
        }
    };

})();

// GLOBAL APP CONTROLLER,
// creates another module that interacts with the budgetController and the UIController
var controller = (function(budgetCtrl,UICtrl) {


    var ctrlAddItem = function () {

        // 1.Get the field input data
        var input = UICtrl.getInput();
        console.log(input);
        


        // 2.Add the item to the budgetController

        // 3.Add the item to the UIController

        // 4. Calculate the budget

        // 5.Display the budget on the UI

        console.log('It Works :) .');
        
        
    }
    // listens to the add btn and gets the field input
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    // gets the field input when the user presses the enter key
    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
     
            ctrlAddItem();
            
        }
        

    })

})(budgetController, UIController);
