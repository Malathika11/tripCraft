import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private dataSubject = new BehaviorSubject<any>(null);

  public data$ = this.dataSubject.asObservable();

  public setData(data: any) {
    console.log(data);
    
    this.dataSubject.next(data);
  }
}