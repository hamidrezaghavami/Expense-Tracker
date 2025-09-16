/*
* @author HamidReza Ghavami
* @date 2025-09-15
* @version 1.0
* @license MIT
* @description A simple Expense Tracker CLI.
*/

// import nessary headers
import readline from 'readline-sync';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// create a class for the expense tracker
class ExpenseTracker { 
    constructor() {
        this.expenses = [];
        this.totalExpenses = 0;
    }

    add() { 
        const amount = parseFloat(readline.question("Enter the amount of money comes to your account: "));
        const description = readline.question("Enter the description of the expense: ");
        if ( amount > 0 ) { 
            this.expenses.push({ amount, description});
            this.totalExpenses += amount;
        } else { 
            console.log("Amount must be greater than 0!");
        }
    }

    update() {
        const index = parseInt(readline.question("Enter the index of the expense you want to update: "));
        if ( index >= 0 && index < this.expenses.length ) { 
            const amount = parseFloat(readline.question("Enter the new amount of the expense: "));
            const description = readline.question("Enter the new description of the expense: ");
            this.expenses[index] = { amount, description };
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
        console.log("Expenses: ");
        for ( let expenses of this.expenses ) { 
            console.log(`Amount: ${expenses.amount}, description: ${expenses.description}`);
        }
        console.log(`Total Expenses: ${this.totalExpenses}`);
    }

    summary() { 
        console.log("Please enter the month that for month's summary");
        const month = readline.question("Enter the month: ");
        let totalExpenses = 0;
        for ( let expenses of this.expenses ) { 
            if ( expenses.description.includes(month)) { 
                totalExpenses += expenses.amount;
            }
        }
        console.log(`Total Expenses in ${month}: ${totalExpenses}`);
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