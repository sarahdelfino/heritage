import { Injectable } from '@angular/core';
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase.config';

export interface HeritageIntakeFormValue {
  project: {
    submitDate: number;
    buildType: string;
    role: string;
    buildStage: string;
    projectStage: string;
    drawings: string;
  };
  building: {
    buildingWidth: string | number;
    buildingLength: string | number;
    wallHeight: string | number;
    roofPitch: string;
    budget: string;
    timeline: string;
    assistance: string;
    buildingCity: string;
    buildingState: string;
    buildingZip: string;
  };
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    industry: string;
    feedback: string;
    notes: string;
  };
}

export interface SubmitHeritageIntakeRequest {
  form: HeritageIntakeFormValue;
  timezone: string;
  saveToFirestore: boolean;
}

export interface SubmitHeritageIntakeResponse {
  ok: boolean;
  spreadsheetId: string;
  firestoreId: string | null;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  async submit(formValue: unknown): Promise<void> {
    console.log(formValue);
    const callable = httpsCallable(functions, 'submitHeritageIntake');

    await callable({
      form: formValue,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      saveToFirestore: true,
    });
  }
}