import { Component, OnInit } from '@angular/core';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { RadioOption } from '../shared/radio/radio-option.models';
import { Order, OrderItem } from './order.model';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  delivery: number = 8
  orderId: String

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  numberPattern = /^[0-9]*$/

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de Débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }
  ]

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      optionalAddress: this.formBuilder.control(''),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, { validator: OrderComponent.equalsTo })
  }

  static equalsTo(group: AbstractControl): any {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation) {
      console.log('aqui1')
      return undefined
    }

    if (email.value !== emailConfirmation.value) {
      console.log('aqui2')
      return { 'emailsNotMatch': true }
    }
    console.log('aqui3')
    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems() {
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item)
    console.log(this.orderForm)
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
      .pipe(tap((orderId: string) => {
        this.orderId = this.orderId
      }))
      .subscribe((orderId: string) => {
        console.log(`Compra concluída: ${orderId}`)
        this.orderService.clear()
        this.router.navigate(['/order-summary'])
      })

    console.log(order)
  }

  isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

}
