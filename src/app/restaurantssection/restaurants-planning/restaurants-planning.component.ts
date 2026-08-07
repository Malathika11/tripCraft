import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-restaurants-planning',
  templateUrl: './restaurants-planning.component.html',
  styleUrls: ['./restaurants-planning.component.scss']
})
export class RestaurantsPlanningComponent implements OnInit {
  @ViewChild('restaurantContainer')
restaurantContainer!: ElementRef;

restaurants=[

{

id:1,

name:'Bistrot de l\'Étoile',

image:'assets/restaurants/res1.jpg',

rating:'4.6',

reviews:'1,248 Reviews',

distance:'0.3 km',

price:'€25 - €35',

cuisine:'French',

time:'5 mins',

favorite:false

},

{

id:2,

name:'Le Petit Paris',

image:'assets/restaurants/res2.jpg',

rating:'4.4',

reviews:'982 Reviews',

distance:'0.6 km',

price:'€20 - €30',

cuisine:'French Cafe',

time:'5 mins',

favorite:false

},

{

id:3,

name:'Cafe Royale',

image:'assets/restaurants/res3.jpg',

rating:'4.8',

reviews:'2200 Reviews',

distance:'0.4 km',

price:'€40 - €60',

cuisine:'Italian',

time:'8 mins',

favorite:false

},

{

id:4,

name:'Bella Italia',

image:'assets/restaurants/res4.jpg',

rating:'4.7',

reviews:'780 Reviews',

distance:'0.7 km',

price:'€35 - €55',

cuisine:'Italian',

time:'7 mins',

favorite:false

},

{

id:5,

name:'Sea Food House',

image:'assets/restaurants/res5.jpg',

rating:'4.9',

reviews:'3200 Reviews',

distance:'1 km',

price:'€50 - €70',

cuisine:'Sea Food',

time:'10 mins',

favorite:false

}

];

selectedRestaurant:any;

  constructor() { }

  ngOnInit(): void {
  }

  trip = {

  duration: '6 Days / 5 Nights',

  days: '6 Days / 5 Nights',

  travelers: '2 Adults'

};



selectedDay = {

  day: '1 - 2',

  hotel: 'Le Meridien Etoile, Paris',

  hotelImage: 'assets/hotels/hotel1.jpg',

  date: 'Mon, 12 Aug - Tue, 13 Aug (2 Nights)'

};



hotelDetails(){

  console.log("Hotel Details");

}
scrollRight(){

  this.restaurantContainer.nativeElement.scrollBy({

    left:330,

    behavior:'smooth'

  });

}



viewRoute(item:any){

  console.log(item);

}



selectRestaurant(item:any){

  console.log(item);
  this.selectedRestaurant=item;

}

toggleFavourite(item:any){

item.favorite=!item.favorite;

}

scrollLeft(){

this.restaurantContainer.nativeElement.scrollBy({

left:-320,

behavior:'smooth'

});

}
}
