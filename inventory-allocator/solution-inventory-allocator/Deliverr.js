const convertObjectToArray = require('./utils.js');

class InventoryAllocator {
    constructor(order, warehouses){
        this.order = order;
        this.warehouses = warehouses;
    }

    getInventoryItemsArr(){
        return this.warehouses.map((eachWarehouse) => {
            return eachWarehouse['inventory'];
        })
    }
    
    getInventoryNamesArr(){
        return this.warehouses.map((eachWarehouse) => {
            return eachWarehouse['name'];
        })
    }
    
   getCheapestShipment(){
    
        let inventoryItemsArr = this.getInventoryItemsArr();
        let inventoryNamesArr = this.getInventoryNamesArr();
        let usedWarehouses = {};

        this.checkeachWarehouseForItem = (item) => {
            inventoryItemsArr.forEach((inventory, index) => {
                
                let currentInventory = inventoryNamesArr[index];

                if(this.order[item] > 0 && inventory[item] > 0){

                    if(!usedWarehouses[currentInventory]){
                        usedWarehouses[currentInventory] = {};
                    }
                    if(inventory[item]){
                        let numberAvailable = inventory[item];
                        let numberNeeded = this.order[item];
                        
                        if(numberNeeded >= numberAvailable){
                            this.order[item] = numberNeeded - numberAvailable;
                            usedWarehouses[currentInventory][item] = numberAvailable;
                        }
                        else {
                            this.order[item] = 0;
                            usedWarehouses[currentInventory][item] = numberNeeded;
                        }
                    }
                }
            })
        }
    
        Object.keys(this.order).forEach((item) => {
            this.checkeachWarehouseForItem(item);
        })
        return convertObjectToArray(usedWarehouses);
    }
}

module.exports = InventoryAllocator;