    class Parking{
        constructor(capacity){
            this.capacity = Number(capacity); 
            this.vehicles = []; 
            this.freeParkingSpots = this.capacity;
        }
        addCar(carModel, carNumber){
            if(this.freeParkingSpots === 0){
                throw new Error("Not enough parking space.");
            }
            else{
                this.vehicles.push({
                    carModel: carModel, 
                    carNumber: carNumber, 
                    payed: false
                });
                this.freeParkingSpots--; 
            return `The ${carModel}, with a registration number ${carNumber}, parked.`;
            }
        };
        removeCar(carNumber){
           if(this.findCar(carNumber)){
               let car = this.findCar(carNumber);
                if(this.hasCarPayed(carNumber)){
                    let carIndex = this.vehicles.indexOf(car); 
                    this.vehicles.splice(carIndex, 1); 
                    return `${carNumber} left the parking lot.`;
                }
                else{
                    throw new Error(`${car.carNumber} needs to pay before leaving the parking lot.`);
                }
           }
           else{
                throw new Error("The car, you're looking for, is not found.");
           }
        };
        pay(carNumber){
            if(this.findCar(carNumber)){
                if(this.hasCarPayed(carNumber)){
                    throw new Error(`${carNumber}'s driver has already payed his ticket.`);
                }
                else{
                    this.findCar(carNumber).payed = true; 
                    return `${carNumber}'s driver successfully payed for his stay.`;
                }
            }
            else{
                throw new Error(`${carNumber} is not in the parking lot.`);
            }
        };
        getStatistics(carNumber){
            if(carNumber){
                let car = this.findCar(carNumber); 
                return this.carInfo(car);
            }
            else{
                let sortedVehicles = this.vehicles.sort((a, b) => a - b); 
                let fullParkingLotInfo = [];
                let message = `The Parking Lot has ${this.freeParkingSpots} empty spots left.`;
                fullParkingLotInfo.push(message);
                sortedVehicles.forEach(vehicle => {
                    fullParkingLotInfo.push(this.carInfo(vehicle));
                });

                return fullParkingLotInfo.join(`\n`);
            }
        }

        findCar(carNumber){
            let isFound = false; 
            let carObj;
            for(let car of this.vehicles){
                if(car.carNumber == carNumber){
                    isFound = true;
                    carObj = car; 
                    break;
                };
            }
            return isFound == false ? false : carObj; 
        };
        hasCarPayed(carNumber){
            let car = this.findCar(carNumber); 
            return car.payed ? true : false;
        };
        carInfo(car){
            let payedMessage = car.payed ? "Has payed" : "Not payed";
            return `${car.carModel} == ${car.carNumber} - ${payedMessage}`;
        }
    }

module.exports = Parking; 
