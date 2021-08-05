class Bank{
    #bankName;
    constructor(bankName){
        this.#bankName = bankName; 
        this.allCustomers = [];
    }
    newCustomer(customerObj){
        let isInside = this.searchById(customerObj.personalId);
        if(isInside){
            let {firstName, lastName} = customerObj;
            throw Error(`${firstName} ${lastName} is already our customer!`);
        } else{
            customerObj.transactions = []; 
            customerObj.totalMoney = 0;
            this.allCustomers.push(customerObj); 
            return customerObj;
        }
    }
    depositMoney(personalId, amount){
        let customer = this.searchById(personalId); 
        if(customer){
            customer.totalMoney += +amount; 
            let transactionMessage = this.makeATransaction(customer, "made deposit of", amount);
            customer.transactions.push(`${transactionMessage}`)
            return `${customer.totalMoney}$`;
        } else{
            throw new Error("We have no customer with this ID!");
        }
    }
    withdrawMoney(personalId, amount){
        let customer = this.searchById(personalId);
        if(customer){
            if(customer.totalMoney >= amount){
                customer.totalMoney -= amount; 
                let transactionMessage = this.makeATransaction(customer, "withdrew", amount);
                customer.transactions.push(transactionMessage);
                return `${customer.totalMoney}$`;
            } else{
                let {firstName, lastName} = customer;
                throw new Error(`${firstName} ${lastName} does not have enough money to withdraw that amount!`)
            }
        } else{
            throw new Error("We have no customer with this ID!");
        }
    }
    customerInfo(personalId){
        let customer = this.searchById(personalId); 
        if(customer){
            let result = []; 
            let {firstName, lastName, transactions, personalId, totalMoney} = customer; 
            result.push(`Bank name: ${this.#bankName}`);
            result.push(`Customer name: ${firstName} ${lastName}`);
            result.push(`Customer ID: ${personalId}`); 
            result.push(`Total Money: ${totalMoney}$`);
            result.push("Transactions:");

            for(let i = transactions.length - 1; i >= 0; i--){
                let currentMessage = transactions[i]; 
                result.push(`${i+1}. ${currentMessage}`);
            }

            return result.join(`\n`);
        } else{
            throw new Error("We have no customer with this ID!");
        }
    }
    searchById(id){
        for(let currentObj of this.allCustomers){
            if(currentObj.personalId === id){
                return currentObj; 
            }
        }
        return false;
    }
    makeATransaction(customer, typeOfTransaction, amount){
        let customerFullName = `${customer.firstName} ${customer.lastName}`;
        return `${customerFullName} ${typeOfTransaction} ${amount}$!`;
    }
}

    // let bank = new Bank("name");

    // bank.newCustomer({ firstName: 'Svetlin', lastName: 'Nakov', personalId: 1111111 });
    // bank.newCustomer({ firstName: 'Svetlin', lastName: 'Nakov', personalId: 1111111 });
