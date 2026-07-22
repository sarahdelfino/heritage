import { Injectable } from '@angular/core';
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase.config';

export interface HeritageIntakeFormValue {
  project: {
    submitDate: number;
    buildType: string;

    role?: string;
    buildStage?: string;
    projectStage?: string;
    drawings?: string;
  };

  building: {
    buildingCity: string;
    buildingState: string;
    buildingZip: string;

    buildingWidth?: string | number;
    buildingLength?: string | number;
    wallHeight?: string | number;
    roofPitch?: string;
    budget?: string;
    timeline?: string;
    assistance?: string;
  };

  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    industry: string;

    feedback?: string;
    notes?: string;
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

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  async submit(
    formValue: HeritageIntakeFormValue,
  ): Promise<SubmitHeritageIntakeResponse> {
    const callable = httpsCallable<
      SubmitHeritageIntakeRequest,
      SubmitHeritageIntakeResponse
    >(functions, 'submitHeritageIntake');

    const result = await callable({
      form: formValue,
      timezone:
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      saveToFirestore: true,
    });

    return result.data;
  }
}