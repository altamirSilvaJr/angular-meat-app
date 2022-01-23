import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any
  @Input() label: string | undefined
  @Input() errorMessage: string | undefined
  @Input() showTip: boolean = true

  @ContentChild(NgModel) model: NgModel | undefined
  @ContentChild(FormControlName) control: FormControlName

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
      this.input = this.model || this.control
      if(this.input === undefined){
        throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName')
      }
  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
