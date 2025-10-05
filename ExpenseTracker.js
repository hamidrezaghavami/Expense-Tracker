import readline from 'readline-sync';

// create a class for the expense tracker
class ExpenseTracker { 
    constructor() {
        this.expenses = [];
    }

    // helper function
    getTotal() {
    return this.expenses.reduce((sum, e) => sum + e.amount, 0);
    }

    add() { // simplify +2 lines
        const amount = parseFloat(readline.question("Enter the amount of the expense: "));
        const description = readline.question("Enter the description of the expense: ");
        if ( amount <= 0 ) return console.log("Invalid amount!");
        this.expenses.push({ amount, description, date: new Date() });
    }

    update() { // simplified for clearity
        const index = parseInt(readline.question("Enter the index of the expense you want to update: "));
        if ( index < 0 || index >= this.expenses.length ) return console.log("Invalid index!");

        const amount = parseFloat(readline.question("Enter the new amount of the expense: "));
        const description = readline.question("Enter the new description of the expense: ");
        this.expenses[index] = { amount, description, date: new Date() };
    }

    delete() { // simplified for clearity
        const index = parseInt(readline.question("Enter the index of the expense you want to delete: "));
        if ( index < 0 || index >= this.expenses.length ) return console.log("Invalid index!");
        this.expenses.splice(index, 1);
    }

    view() {
    console.log("Expenses:");
    this.expenses.forEach((e, i) => 
        console.log(`${i}. Amount: ${e.amount}, desc: ${e.description}, date: ${e.date.toLocaleDateString()}`)
    );
    console.log(`Total Expenses: ${this.getTotal()}`);
    }

    summary() {
    const month = parseInt(readline.question("Enter the month (1-12): "));
    const total = this.expenses
        .filter(e => e.date.getMonth() + 1 === month)
        .reduce((sum, e) => sum + e.amount, 0);
    console.log(`Total expenses in month ${month}: ${total}`);
    }
}

// create a main function to run the porgram 
// ( refactored and simplified from 40 lines into 30)
function main () { 
    const expenseTracker = new ExpenseTracker();
    
    const actions = { 
        '1': () => expenseTracker.add(),
        '2': () => expenseTracker.update(),
        '3': () => expenseTracker.delete(),
        '4': () => expenseTracker.view(),
        '5': () => expenseTracker.summary(),
        '6': () => console.log("exiting from the porgam!"),
    };
    let input;
    do { 
        console.log(`
            1. Add
            2. Update
            3. Delete
            4. View
            5. Summary
            6. Exit
            `);
            input = readline.question("Enter your choice: ");
            const action = actions[input];

            if ( action) { 
                action();
            } else { 
                console.log("invalid choice");
            }
    } while ( input !== '6' );
}

// call the main function
main();