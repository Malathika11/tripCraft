import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private dataSubject = new BehaviorSubject<any>(null);

  data$ = this.dataSubject.asObservable();

  setData(key: string, value: any) {
    this.dataSubject.next({ key, value });
  }
}