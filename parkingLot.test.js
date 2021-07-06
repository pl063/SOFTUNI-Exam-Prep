    const expect = require('chai').expect;
    const Parking = require('./app'); 

    describe("Testing class Parking functionalities", () => {
            describe("Test addCar()", () => {
                it("Adding car, there are enough free slots", () => {
                    let parking = new Parking(12); 
                    expect(parking.addCar("Toyota", "A2365")).to.equal("The Toyota, with a registration number A2365, parked.");
                    expect(parking.freeParkingSpots).to.equal(11); //testing free slots state)
                });
                it("Adding car, no free slots", () => {
                    let parking = new Parking(0); 
                    expect(() => parking.addCar("Volvo", "V123")).to.throw(Error, "Not enough parking space.");
                });
                it("Test if it actually adds a car into vehicles", () => {
                    let parking = new Parking(10);
                    parking.addCar("Audi", "A8480"); 
                    let included = false; 

                    for(let car of parking.vehicles){
                        if(car.carModel === "Audi" && car.carNumber === "A8480"){
                            included = true; 
                            break;
                        };
                    };

                    expect(included).to.be.true;
                });
                it("Test default value in car object", () => {
                    let parking = new Parking(5); 
                    parking.addCar("BMW", "C369"); 
                    expect(parking.vehicles[0].payed).to.be.false;
                });
            });
            describe("Test removeCar()", () => {
                it("Throw error if car's not found", () => {
                    let parking = new Parking(20); 
                   expect(() => parking.removeCar("L231")).to.throw(Error, "The car, you're looking for, is not found.");
                });
                it("Throw error if car hasn't payed", () => {
                    let parking = new Parking(35);
                    parking.addCar("Audi", "H123"); 
                    expect(() => parking.removeCar("H123")).to.throw(Error, "H123 needs to pay before leaving the parking lot.");
                });
                it("Test if it has removed the car", () => {
                    let parking = new Parking(10); 
                    parking.addCar("Audi", "H123"); 
                    parking.pay("H123");
                    expect(parking.removeCar("H123")).to.equal("H123 left the parking lot.");
                });
            });
            describe("Test pay()", () => {
                it("Throw an error if car's not found", () => {
                    let parking = new Parking(25); 
                    expect(() => parking.pay("F147")).to.throw(Error, `F147 is not in the parking lot.`);
                });
                it("Throw an error if car has already paid", () => {
                    let parking = new Parking(200); 
                    parking.addCar("Pascal", "A256"); 
                    parking.pay("A256");
                    expect(() => parking.pay("A256")).to.throw(Error, "A256's driver has already payed his ticket.");
                });
                it("Pay for the car", () => {
                    let parking = new Parking(90); 
                    parking.addCar("Reno", "C248"); 
                    expect(parking.pay("C248")).to.equal("C248's driver successfully payed for his stay.");
                    expect(parking.findCar("C248").payed).to.be.true; //checking is the function has changed payed property
                });
            });
            describe("Test getStatistics()", () => {
                it("Test with a given parameter", () => {
                    let parking = new Parking(12);
                    parking.addCar("Volvo t600", "TX3691CA");
                    expect(parking.getStatistics("TX3691CA")).to.equal("Volvo t600 == TX3691CA - Not payed");
                    parking.pay("TX3691CA");
                    expect(parking.getStatistics("TX3691CA")).to.equal("Volvo t600 == TX3691CA - Has payed");
                });
                it("Test with no parameter", () => {
                    let parking = new Parking(33);
                    parking.addCar("Reno 360tdi", "A369"); 
                    parking.addCar("Volvo", "C364"); 
                    parking.addCar("Lada Niva", "L231"); 
                    parking.pay("L231"); 
                    
                    let output = ["The Parking Lot has 30 empty spots left.", 
                                  "Reno 360tdi == A369 - Not payed",
                                  "Volvo == C364 - Not payed",
                                  "Lada Niva == L231 - Has payed"];
                    expect(parking.getStatistics()).to.equal(output.join(`\n`));
                });
            })
    })