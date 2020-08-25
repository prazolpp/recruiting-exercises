let InventoryAllocator = require('./Deliverr.js');

describe('getCheapestShipment function', () => {
    it('Should work with single item, exact inverntory match', () => {

        const order = { apple: 1 };
        const warehouses =  [{ name: "owd", inventory: { apple: 1 } }]
        const inventoryAllocator = new InventoryAllocator(order, warehouses);

        const result = inventoryAllocator.getCheapestShipment();
        expect(result).toEqual([{ owd: { apple: 1 } }]);

    })
})

describe('getCheapestShipment function', () => {
    it('Should return empty array for empty list of warehouses', () => {
        const order = { apple: 10, orange: 20 };
        const warehouses = [];
        const inventoryAllocator = new InventoryAllocator(order, warehouses);

        const result = inventoryAllocator.getCheapestShipment();
        expect(result).toEqual([]);
    })
})


describe('getCheapestwarehouses function', () => {
    it('Should return an empty array if not enough inventory', () => {

        const order = { apple: 1 };
        const warehouses =  [{ name: "owd", inventory: { apple: 0} }]
        const inventoryAllocator = new InventoryAllocator(order, warehouses);

        const result = inventoryAllocator.getCheapestShipment();
        expect(result).toEqual([]);

    })
})

describe('getCheapestShipment function', () => {
    it('Should split an item across warehouses if that is the only way to completely ship an item:', () => {

        const order = { apple: 10 };
        const warehouses =  [{ name: "owd", inventory: { apple: 5 } }, { name: "dm", inventory: { apple: 5 }}]
        const inventoryAllocator = new InventoryAllocator(order, warehouses);

        const result = inventoryAllocator.getCheapestShipment();
        expect(result).toEqual([{ owd: { apple: 5 }}, { dm: { apple: 5 } }]);

    })
})

describe('getCheapestShipment function', () => {
    it('Should return the highest total number of items available if some items are not in enough quantity in the inventory', () => {

        const order = { apple: 10 };
        const warehouses =  [{ name: "owd", inventory: { apple: 5 } }]
        const inventoryAllocator = new InventoryAllocator(order, warehouses);

        const result = inventoryAllocator.getCheapestShipment();
        expect(result).toEqual([{ owd: { apple: 5 }}]);

    })
})

describe('getCheapestShipment function', () => {
    it('Should work with multiple items ordered', () => {
        const order = { apple: 10, orange: 20 };
        const warehouses =  [{ name: "owd", inventory: { apple: 5, orange: 25 } }]
        const inventoryAllocator = new InventoryAllocator(order, warehouses);

        const result = inventoryAllocator.getCheapestShipment();
        expect(result).toEqual([{ owd: { apple: 5 , orange: 20 }}]);
    })
})

describe('getCheapestShipment function', () => {
    it('Should work with multiple items ordered split across warehouses', () => {
        const order = { apple: 10, orange: 20 };
        const warehouses =  [{ name: "owd", inventory: { apple: 5, orange:  10 }}, {name: "dow", inventory: { apple: 5, orange: 10}}]
        const inventoryAllocator = new InventoryAllocator(order, warehouses);

        const result = inventoryAllocator.getCheapestShipment();
        expect(result).toEqual([{ owd: { apple: 5 , orange: 10 }}, { dow: { apple: 5 , orange: 10 }}]);
    })
})

