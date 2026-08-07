import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.scss']
})
export class PackageCardComponent implements OnInit {

  public filteredPackages = [
    {
      "title": "Paris Getaway",
      "category": "Couple",
      "badge": "Most Popular",
      "image": "assets/images/paris.jpg",
      "days": "7 Days / 6 Nights",
      "rating": 4.8,
      "ratingColor": 'green',
      "reviews": 321,
      "description": "Experience Paris with luxury accommodation and sightseeing.",
      "used": 78,
      "currentProgress": 10,
      "price": 93600,
      "remaining": 26400,
      "totalBudget": 120000,
      "popularity": 99,
      "favourite": false,
      "amountLabel": "₹",
      "includes": [
        {
          "icon": "cls-61-flight",
          "name": "Flight"
        },
        {
          "icon": "cls-51-hotel",
          "name": "Hotel"
        },
        {
          "icon": "cls-60-food",
          "name": "Food"
        },
        {
          "icon": "cls-71-transport",
          "name": "Transport"
        }
      ]
    },
    {
      "title": "Paris Getaway",
      "category": "Couple",
      "badge": "Most Popular",
      "image": "assets/images/paris.jpg",
      "days": "7 Days / 6 Nights",
      "rating": 4.8,
      "ratingColor": 'green',
      "reviews": 321,
      "description": "Experience Paris with luxury accommodation and sightseeing.",
      "used": 78,
      "currentProgress": 10,
      "price": 93600,
      "remaining": 26400,
      "totalBudget": 120000,
      "popularity": 99,
      "favourite": false,
      "amountLabel": "₹",
      "includes": [
        {
          "icon": "cls-61-flight",
          "name": "Flight"
        },
        {
          "icon": "cls-51-hotel",
          "name": "Hotel"
        },
        {
          "icon": "cls-60-food",
          "name": "Food"
        },
        {
          "icon": "cls-71-transport",
          "name": "Transport"
        }
      ]
    }
  ]

  public categories = [
    'All Packages',
    'Family',
    'Couple',
    'Adventure',
    'Luxury',
    'Budget Friendly'
  ];

  selectedCategory = 'All Packages';

  selectedSort = 'popular';

  packages: any[] = [];

  loader = false;

  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.getPackages();
  }

  public getPackages() {
    this.loader = false;
    const requestData = {
      sector: {
        fromCity: "Chennai",
        toCity: "Paris"
      },
      travelers: {
        adults: 2,
        children: 1,
        infants: 0
      },
      duration: 7,
      totalBudget: 120000
    };
    // this.apiService.post('packages', requestData).subscribe({
    //   next: (res: any) => {
    //     console.log(res);
        
    //     this.packages = res;
    //     this.filteredPackages = [...this.packages];
    //     this.animateProgress();
    //     this.loader = true;
    //   },
    //   error: (err:any) => {
    //     console.log(err);
    //   }
    // });
  }
  public selectCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All Packages') {
      this.filteredPackages = [...this.packages];
    }
    else {
      this.filteredPackages = this.packages.filter(x =>
        x.category === category
      );
    }
    this.sortPackages();
  }
  public sortPackages() {
    switch (this.selectedSort) {
      case 'low':
        this.filteredPackages.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        this.filteredPackages.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredPackages.sort((a, b) => b.rating - a.rating);
        break;
      default:
        this.filteredPackages.sort((a, b) =>
          b.popularity - a.popularity
        );
    }
  }

  public toggleWishlist(item: any) {
    item.favourite = !item.favourite;
  }

  public viewPackage(item: any) {
    console.log(item);
    // later

    // this.router.navigate(['/package-details'],{
    //    state:item
    // });
  }

  public animateProgress() {
    this.filteredPackages.forEach(item => {
      item.currentProgress = 0;
      const timer = setInterval(() => {
        if (item.currentProgress >= item.used) {
          clearInterval(timer);
        }
        else {
          item.currentProgress++;
        }
      }, 10);
    });
  }

}
