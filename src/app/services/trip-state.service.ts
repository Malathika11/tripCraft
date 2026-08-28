import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripStateService {

  private readonly storageKey = 'tripCraftState';

  private state: { [key: string]: any } = this.loadState();

  private stateSubject = new BehaviorSubject<{ [key: string]: any }>(
    this.state
  );

  public state$ = this.stateSubject.asObservable();

  // Load data from sessionStorage

  private loadState(): { [key: string]: any } {

    const savedState = sessionStorage.getItem(this.storageKey);

    if (!savedState) {
      return {};
    }

    try {
      return JSON.parse(savedState);
    } catch (error) {
      console.error('Invalid TripCraft state', error);
      return {};
    }
  }

  // Save complete state

  private saveState(): void {

    sessionStorage.setItem(
      this.storageKey,
      JSON.stringify(this.state)
    );
  }

  // Set / Update any key

  set<T>(key: string, value: T): void {

    this.state = {
      ...this.state,
      [key]: value
    };

    this.saveState();

    this.stateSubject.next(this.state);
  }

  // Get one key

  get<T>(key: string): T | null {

    return this.state[key] ?? null;
  }

  // Check key exists

  has(key: string): boolean {

    return Object.prototype.hasOwnProperty.call(
      this.state,
      key
    );
  }

  // Remove one key

  remove(key: string): void {

    if (!this.has(key)) {
      return;
    }

    const { [key]: removed, ...remaining } = this.state;

    this.state = remaining;

    this.saveState();

    this.stateSubject.next(this.state);
  }

  // Get complete state

  getAll(): { [key: string]: any } {

    return this.state;
  }

  // Clear complete trip

  clear(): void {

    this.state = {};

    sessionStorage.removeItem(this.storageKey);

    this.stateSubject.next(this.state);
  }
}