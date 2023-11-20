import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  userId: string | null = null;
  private testVarkCompleted = false;
  private testPersonalidadCompleted = false;

  setTestVarkCompleted(completed: boolean): void {
    this.testVarkCompleted = completed;
  }

  getTestVarkCompleted(): boolean {
    return this.testVarkCompleted;
  }

  setTestPersonalidadCompleted(completed: boolean): void {
    this.testPersonalidadCompleted = completed;
  }

  getTestPersonalidadCompleted(): boolean {
    return this.testPersonalidadCompleted;
  }
  constructor() { }

  setUserId(id: any) {
    this.userId = id;
  }

  getUserId(): string | null {
    return this.userId;
  }
}