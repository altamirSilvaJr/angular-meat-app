import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  input: any
  @Input() label: string | undefined
  @Input() errorMessage: string | undefined

  @ContentChild(NgModel) model: NgModel | undefined

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
      this.input = this.model
      if(this.input === undefined){
        throw new Error('Esse componente precisa ser usado com uma diretiva ngModel')
      }
  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean{
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }

}
