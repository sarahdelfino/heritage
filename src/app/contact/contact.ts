
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormBuilder } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import formData from './form-data.json';

export type FeetInches =
  | { ok: true; totalInches: number; normalized: string }
  | { ok: false; reason: 'EMPTY' | 'TOO_LONG' | 'BAD_FORMAT' | 'INCHES_RANGE' };

export function parseFeetInches(input: string, maxChars = 20): FeetInches {
  const raw = input.trim();
  if (!raw) return { ok: false, reason: 'EMPTY' };
  if (raw.length > maxChars) return { ok: false, reason: 'TOO_LONG' };

  const s = raw
    .toLowerCase()
    .replaceAll('′', "'")
    .replaceAll('’', "'")
    .replaceAll('″', '"')
    .replace(/\b(feet|foot|ft)\b/g, "'")
    .replace(/\b(inches|inch|in)\b/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .replaceAll("''", '"'); // allow 5''  
  const m = s.match(/^(\d+)\s*(?:'\s*(\d{1,2})\s*(?:"\s*)?)?$/);
  if (!m) return { ok: false, reason: 'BAD_FORMAT' };

  const feet = Number(m[1]);
  const inches = m[2] ? Number(m[2]) : 0;

  if (!Number.isFinite(feet) || !Number.isFinite(inches)) return { ok: false, reason: 'BAD_FORMAT' };
  if (inches < 0 || inches > 11) return { ok: false, reason: 'INCHES_RANGE' };

  const totalInches = feet * 12 + inches;
  const normalized = inches ? `${feet}' ${inches}"` : `${feet}'`;

  return { ok: true, totalInches, normalized };
}

export function dimensionValidator(opts: { minFeet: number; maxFeet: number; maxChars?: number }): ValidatorFn {
  const maxChars = opts.maxChars ?? 20;

  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    const parsed = parseFeetInches(value, maxChars);

    if (!parsed.ok) return { dimension: parsed.reason };

    const minInches = opts.minFeet * 12;
    const maxInches = opts.maxFeet * 12;

    if (parsed.totalInches < minInches || parsed.totalInches > maxInches) {
      return { dimension: 'OUT_OF_RANGE', minFeet: opts.minFeet, maxFeet: opts.maxFeet };
    }

    return null;
  };
}

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, MatInputModule, MatRadioModule, MatSelectModule, MatStepperModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Contact {

    private readonly breakpoints = inject(BreakpointObserver);

  private readonly isMobile = toSignal(
    this.breakpoints
      .observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
      .pipe(map((state) => state.matches)),
    { initialValue: false },
  );

  readonly orientation = computed<'horizontal' | 'vertical'>(() =>
    this.isMobile() ? 'vertical' : 'horizontal',
  );


  intakeForm: FormGroup;
  errorText = '';
  roofPitches = formData.roofPitch;
  budgets = formData.budget;
  timelines = formData.timeline;
  industries = formData.industry;
  feedback = formData.feedback;

  constructor(private fb: FormBuilder) {
    this.intakeForm = this.fb.group({
      project: this.fb.group({
      submitDate: new FormControl(Date.now(), [Validators.required]),
      buildType: new FormControl('', [Validators.required]),
      role: new FormControl(''),
      buildStage: new FormControl('', [Validators.required]),
      projectStage: new FormControl('', [Validators.required]),
      drawings: new FormControl('', [Validators.required]),
      }),
      building: this.fb.group({
        buildingWidth: new FormControl('', [Validators.required, dimensionValidator({ minFeet: 10, maxFeet: 1000 })]),
        buildingLength: new FormControl('', [Validators.required, dimensionValidator({ minFeet: 10, maxFeet: 1000 })]),
        wallHeight: new FormControl('', [Validators.required, dimensionValidator({ minFeet: 8, maxFeet: 40 })]),
        roofPitch: new FormControl('', [Validators.required]),
        budget: new FormControl('', [Validators.required]),
        timeline: new FormControl('', [Validators.required]),
        assistance: new FormControl('', [Validators.required]),
              buildingCity: new FormControl('', [Validators.required]),
      buildingState: new FormControl('', [Validators.required]),
      buildingZip: new FormControl('', [Validators.required]),
      }),
      personal: this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      industry: new FormControl('', [Validators.required]),
      feedback: new FormControl('', [Validators.required]),
      notes: new FormControl(''),
      })
    })
  }

  normalizeOnBlur(control: AbstractControl): void {
    const raw = String(control.value ?? '').trim();
    if (!raw) return;

    const parsed = parseFeetInches(raw, 20);
    if (!parsed.ok) return;

    if (parsed.normalized !== raw) control.setValue(parsed.normalized);
  }

  dimensionError(ctrl: AbstractControl): string | null {
    if (!ctrl.errors || !(ctrl.touched || ctrl.dirty)) return null;

    const code = ctrl.errors['dimension'] as string | undefined;
    if (!code) return null;

    switch (code) {
      case 'EMPTY':
        return 'Enter a value (e.g. 46\' or 63\' 5").';
      case 'TOO_LONG':
        return 'Value is too long.';
      case 'BAD_FORMAT':
        return 'Use formats like 46\', 63\' 5".';
      case 'INCHES_RANGE':
        return 'Inches must be 0–11.';
      case 'OUT_OF_RANGE': {
        const min = ctrl.errors['minFeet'] as number | undefined;
        const max = ctrl.errors['maxFeet'] as number | undefined;
        return min != null && max != null ? `Must be between ${min}' and ${max}'.` : 'Out of range.';
      }
      default:
        return 'Invalid value.';
    }
  }

}
