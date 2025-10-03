import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class EnrollmentService {
  // Her başarılı enroll işleminde artan versiyon
  readonly version = signal(0);

  notifyEnrollment() {
    this.version.update(v => v + 1);
  }
}
