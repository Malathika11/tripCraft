import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
// import { Budget } from '../../models/budget.model';
// import { Flight } from '../../models/flight.model';

@Component({
  selector: 'app-budget-status',
  templateUrl: './budget-status.component.html',
  styleUrls: ['./budget-status.component.scss']
})
export class BudgetStatusComponent implements OnChanges {

  @Input() budget!: any;

  @Input() selectedFlight!: any;

  used = 0;

  remaining = 0;

  progress = 0;

  exceededAmount = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateBudget();
  }

  calculateBudget(): void {

    this.used = this.selectedFlight ? this.selectedFlight.price : 0;

    this.remaining = this.budget.flightBudget - this.used;

    this.progress = this.budget.flightBudget
      ? (this.used / this.budget.flightBudget) * 100
      : 0;

    this.progress = Math.min(this.progress, 100);

    this.exceededAmount = this.used > this.budget.flightBudget
      ? this.used - this.budget.flightBudget
      : 0;

  }

  foodPlan = [

  {

    day:'1 - 2',

    hotel:'Le Meridien Etoile',

    restaurant:'Bistrot de l\'Étoile',

    meal:'Dinner',

    nights:2,

    price:'3200',

    image:'assets/restaurants/res1.jpg'

  },

  {

    day:'3 - 4',

    hotel:'Hotel des Arts Montmartre',

    restaurant:'Le Consulat Café',

    meal:'Dinner',

    nights:2,

    price:'2800',

    image:'assets/restaurants/res2.jpg'

  },

  {

    day:'5 - 6',

    hotel:'Novotel Paris Centre',

    restaurant:'Café Du Trocadéro',

    meal:'Dinner',

    nights:2,

    price:'6450',

    image:'assets/restaurants/res3.jpg'

  }

];

editRestaurant(item:any){

console.log(item);

}

continue(){

console.log("Continue");

}

}