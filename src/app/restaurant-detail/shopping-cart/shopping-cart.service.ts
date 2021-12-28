import { MenuItem } from "../menu-item/menu-item.model"
import { CartItem } from "./cart-item.model"

export class ShoppingCartService{
    items: CartItem[] = []

    clear(){
        this.items = []
    }

    total(): number{
        return this.items.map(item => item.value()).reduce((prev, value)=> prev+value, 0)
    }

    addItem(item:MenuItem){
        let foundItem = this.items.find((mItem)=> mItem.menuItem.id === item.id)
        if(foundItem){
            foundItem.quantity++;
        }else{
            this.items.push(new CartItem(item))
        }
    }

    removeItem(item:CartItem){
        this.items.splice(this.items.indexOf(item), 1)
    }
}