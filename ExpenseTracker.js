/*
* @author HamidReza Ghavami
* @date 2025-09-15
* @version 1.0
* @license MIT
* @description A simple Expense Tracker CLI.
*/

// import nessary headers
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

    add() { 
        const amount = parseFloat(readline.question("Enter the amount of the expense: "));
        const description = readline.question("Enter the description of the expense: ");
        if ( amount > 0 ) { 
            this.expenses.push({ amount, description, date: new Date() });
        } else { 
            console.log("Invalid amount!");
        }
    }

    update() {
        const index = parseInt(readline.question("Enter the index of the expense you want to update: "));
        if ( index >= 0 && index < this.expenses.length ) { 
            const amount = parseFloat(readline.question("Enter the new amount of the expense: "));
            const description = readline.question("Enter the new description of the expense: ");
            this.expenses[index] = { amount, description, date: new Date() };
        } else { 
            console.log("Invalid index!");
        }
    }

    delete() { 
        const index = parseInt(readline.question("Enter the index of the expense you want to delete: "));
        if ( index >= 0 && index < this.expenses.length ) { 
            this.expenses.splice(index, 1);
        } else { 
            console.log("Invalid index!");
        }
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
function main () { 
    const expenseTracker = new ExpenseTracker();
    let input;
    do { 
        console.log("1. Add");
        console.log("2. Update");
        console.log("3. Delete");
        console.log("4. View");
        console.log("5. Summary");
        console.log("6. Exit");
        input = readline.question("Enter your choice: ");
    switch (input) { 
        case '1':
            expenseTracker.add();
            break;
            
        case '2':
            expenseTracker.update();
        break;

        case '3':
            expenseTracker.delete();
        break;

        case '4':
            expenseTracker.view();
        break;

        case '5':
            expenseTracker.summary();
        break;

        case '6':
            console.log("Exiting from program!");
        break;
        default:
            console.log("Invalid chooice!");
        break;    
        }
    } while ( input !== '6' );
}

main();