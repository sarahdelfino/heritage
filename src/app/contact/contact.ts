import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { logEvent } from 'firebase/analytics';

import { ContactService } from '../contact-service';
import { GoogleAdsService } from '../google-ads-service';
import { analytics } from '../firebase.config';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

import formData from './form-data.json';

export type FeetInches =
  | {
    ok: true;
    totalInches: number;
    normalized: string;
  }
  | {
    ok: false;
    reason:
    | 'EMPTY'
    | 'TOO_LONG'
    | 'BAD_FORMAT'
    | 'INCHES_RANGE';
  };

export function parseFeetInches(
  input: string,
  maxChars = 20,
): FeetInches {
  const raw = input.trim();

  if (!raw) {
    return {
      ok: false,
      reason: 'EMPTY',
    };
  }

  if (raw.length > maxChars) {
    return {
      ok: false,
      reason: 'TOO_LONG',
    };
  }

  const normalizedInput = raw
    .toLowerCase()
    .replaceAll('′', "'")
    .replaceAll('’', "'")
    .replaceAll('″', '"')
    .replace(/\b(feet|foot|ft)\b/g, "'")
    .replace(/\b(inches|inch|in)\b/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
    .replaceAll("''", '"');

  const match = normalizedInput.match(
    /^(\d+)\s*(?:'\s*(\d{1,2})\s*(?:"\s*)?)?$/,
  );

  if (!match) {
    return {
      ok: false,
      reason: 'BAD_FORMAT',
    };
  }

  const feet = Number(match[1]);
  const inches = match[2] ? Number(match[2]) : 0;

  if (
    !Number.isFinite(feet) ||
    !Number.isFinite(inches)
  ) {
    return {
      ok: false,
      reason: 'BAD_FORMAT',
    };
  }

  if (inches < 0 || inches > 11) {
    return {
      ok: false,
      reason: 'INCHES_RANGE',
    };
  }

  const totalInches = feet * 12 + inches;

  const normalized = inches
    ? `${feet}' ${inches}"`
    : `${feet}'`;

  return {
    ok: true,
    totalInches,
    normalized,
  };
}

export function dimensionValidator(options: {
  minFeet: number;
  maxFeet: number;
  maxChars?: number;
  optional?: boolean;
}): ValidatorFn {
  const maxChars = options.maxChars ?? 20;
  const optional = options.optional ?? false;

  return (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();

    /*
     * Technical building details are optional.
     * Do not mark an empty optional field as invalid.
     */
    if (!value && optional) {
      return null;
    }

    const parsed = parseFeetInches(
      value,
      maxChars,
    );

    if (!parsed.ok) {
      return {
        dimension: parsed.reason,
      };
    }

    const minInches = options.minFeet * 12;
    const maxInches = options.maxFeet * 12;

    if (
      parsed.totalInches < minInches ||
      parsed.totalInches > maxInches
    ) {
      return {
        dimension: 'OUT_OF_RANGE',
        minFeet: options.minFeet,
        maxFeet: options.maxFeet,
      };
    }

    return null;
  };
}

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatStepperModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  public readonly contactService =
    inject(ContactService);

  private readonly breakpoints =
    inject(BreakpointObserver);

  private readonly googleAdsService =
    inject(GoogleAdsService);

  private readonly fb = inject(FormBuilder);

  private readonly isMobile = toSignal(
    this.breakpoints
      .observe([
        Breakpoints.Handset,
        Breakpoints.TabletPortrait,
      ])
      .pipe(
        map((state) => state.matches),
      ),
    {
      initialValue: false,
    },
  );

  private formStartTracked = false;

  private readonly viewedSteps = new Set<number>();

  private readonly stepNames = [
    'contact_information',
    'project_overview',
    'project_details',
  ];

  readonly orientation = computed<
    'horizontal' | 'vertical'
  >(() =>
    this.isMobile()
      ? 'vertical'
      : 'horizontal',
  );

  readonly roofPitches =
    formData.roofPitch;

  readonly budgets =
    formData.budget;

  readonly timelines =
    formData.timeline;

  readonly industries =
    formData.industry;

  readonly feedback =
    formData.feedback;

  readonly intakeForm: FormGroup =
    this.createForm();

  submitAttempted = false;
  showSuccess = false;
  errorText = '';
  isSubmitting = false;

  private readonly fieldLabels: Record<
    string,
    string
  > = {
      'personal.firstName':
        'First Name',

      'personal.lastName':
        'Last Name',

      'personal.email':
        'Email',

      'personal.phone':
        'Phone',

      'personal.buildingLocation.city':
        'Project City',

      'personal.buildingLocation.state':
        'Project State',

      'personal.buildingLocation.zip':
        'Project ZIP Code',

      'project.buildType':
        'Project Type',

      'project.industry':
        'Industry or Building Use',

      'project.projectDescription':
        'Project Description',

      'building.buildingWidth':
        'Building Width',

      'building.buildingLength':
        'Building Length',

      'building.wallHeight':
        'Wall Height',

      'building.projectStage':
        'Project Stage',

      'building.drawings':
        'Drawings',

      'building.roofPitch':
        'Roof Pitch',

      'building.budget':
        'Budget',

      'building.timeline':
        'Timeline',

      'building.feedback':
        'Where Did You Hear About Us',
    };

  get showSubmitError(): boolean {
    return (
      this.intakeForm.invalid &&
      (
        this.submitAttempted ||
        this.intakeForm.touched
      )
    );
  }

  get invalidFieldLabels(): string[] {
    if (!this.showSubmitError) {
      return [];
    }

    const labels =
      this.collectInvalidFieldLabels(
        this.intakeForm,
      );

    return [...new Set(labels)];
  }

  normalizeOnBlur(
    control: AbstractControl,
  ): void {
    const raw = String(
      control.value ?? '',
    ).trim();

    if (!raw) {
      return;
    }

    const parsed = parseFeetInches(
      raw,
      20,
    );

    if (!parsed.ok) {
      return;
    }

    if (
      parsed.normalized !== raw
    ) {
      control.setValue(
        parsed.normalized,
      );
    }
  }

  dimensionError(
    control: AbstractControl,
  ): string | null {
    if (
      !control.errors ||
      !(
        control.touched ||
        control.dirty
      )
    ) {
      return null;
    }

    const code = control.errors[
      'dimension'
    ] as string | undefined;

    if (!code) {
      return null;
    }

    switch (code) {
      case 'EMPTY':
        return (
          'Enter a value such as ' +
          '46\' or 63\' 5".'
        );

      case 'TOO_LONG':
        return 'Value is too long.';

      case 'BAD_FORMAT':
        return (
          'Use a format such as ' +
          '46\' or 63\' 5".'
        );

      case 'INCHES_RANGE':
        return (
          'Inches must be between ' +
          '0 and 11.'
        );

      case 'OUT_OF_RANGE': {
        const min =
          control.errors[
          'minFeet'
          ] as number | undefined;

        const max =
          control.errors[
          'maxFeet'
          ] as number | undefined;

        if (
          min != null &&
          max != null
        ) {
          return (
            `Must be between ` +
            `${min}' and ${max}'.`
          );
        }

        return 'Value is out of range.';
      }

      default:
        return 'Invalid value.';
    }
  }

  async submit(
    form: FormGroup,
  ): Promise<void> {
    if (this.isSubmitting) {
      return;
    }

    this.submitAttempted = true;
    this.errorText = '';
    this.showSuccess = false;

    if (form.invalid) {
      form.markAllAsTouched();

      const furthestStep =
        this.viewedSteps.size > 0
          ? Math.max(...this.viewedSteps)
          : 1;

      logEvent(analytics, 'quote_form_validation_error', {
        form_name: 'heritage_quote_request',
        furthest_step: furthestStep,
        invalid_field_count: this.invalidFieldLabels.length,
        invalid_fields: this.invalidFieldLabels.join(', '),
      });

      return;
    }

    const raw =
      form.getRawValue();

    /*
     * Transform the reorganized form into the
     * payload structure your existing backend
     * already expects.
     */
const payload = {
  project: {
    submitDate: raw.project.submitDate,
    buildType: raw.project.buildType,

    ...(raw.project.role
      ? {
          role: raw.project.role,
        }
      : {}),

    ...(raw.building.projectStage
      ? {
          projectStage: raw.building.projectStage,
        }
      : {}),

    ...(raw.building.drawings
      ? {
          drawings: raw.building.drawings,
        }
      : {}),
  },

  building: {
    buildingCity:
      raw.personal.buildingLocation.city,

    buildingState:
      raw.personal.buildingLocation.state,

    buildingZip:
      raw.personal.buildingLocation.zip,

    ...(raw.building.buildingWidth
      ? {
          buildingWidth:
            raw.building.buildingWidth,
        }
      : {}),

    ...(raw.building.buildingLength
      ? {
          buildingLength:
            raw.building.buildingLength,
        }
      : {}),

    ...(raw.building.wallHeight
      ? {
          wallHeight:
            raw.building.wallHeight,
        }
      : {}),

    ...(raw.building.roofPitch
      ? {
          roofPitch:
            raw.building.roofPitch,
        }
      : {}),

    ...(raw.building.budget
      ? {
          budget:
            raw.building.budget,
        }
      : {}),

    ...(raw.building.timeline
      ? {
          timeline:
            raw.building.timeline,
        }
      : {}),
  },

  personal: {
    firstName:
      raw.personal.firstName,

    lastName:
      raw.personal.lastName,

    email:
      raw.personal.email,

    phone:
      raw.personal.phone,

    industry:
      raw.project.industry,

    ...(raw.building.feedback
      ? {
          feedback:
            raw.building.feedback,
        }
      : {}),

    notes: [
      raw.project.projectDescription,
      raw.building.notes,
    ]
      .map((value) =>
        String(value ?? '').trim(),
      )
      .filter(Boolean)
      .join('\n\n'),
  },
};

    try {
      this.isSubmitting = true;

      await this.contactService.submit(
        payload,
      );

      logEvent(
        analytics,
        'quote_form_submitted',
        {
          build_type:
            raw.project.buildType,

          industry:
            raw.project.industry,

          project_state:
            raw.personal
              .buildingLocation.state,
        },
      );

      this.googleAdsService
        .trackQuoteRequestConversion();

      this.showSuccess = true;
      this.submitAttempted = false;

      form.reset();

      /*
       * reset() clears the timestamp, so give
       * the next potential submission a new one.
       */
      form
        .get(
          'project.submitDate',
        )
        ?.setValue(Date.now());

      this.formStartTracked = false;
      this.viewedSteps.clear();

      setTimeout(() => {
        this.showSuccess = false;
      }, 5000);
    } catch (error) {
      console.error(
        'Submission error:',
        error,
      );

      this.errorText =
        'An error occurred while submitting. ' +
        'Please try again later.';

      this.showSuccess = false;
    } finally {
      this.isSubmitting = false;
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      /*
       * STEP 1:
       * Contact information and project location.
       */
      personal: this.fb.group({
        firstName: [
          '',
          Validators.required,
        ],

        lastName: [
          '',
          Validators.required,
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email,
          ],
        ],

        phone: [
          '',
          Validators.required,
        ],

        buildingLocation:
          this.fb.group({
            city: [
              '',
              Validators.required,
            ],

            state: [
              '',
              Validators.required,
            ],

            zip: [
              '',
              [
                Validators.required,
                Validators.pattern(
                  /^\d{5}(?:-\d{4})?$/,
                ),
              ],
            ],
          }),
      }),

      /*
       * STEP 2:
       * High-level project information.
       */
      project: this.fb.group({
        submitDate: [
          Date.now(),
          Validators.required,
        ],

        buildType: [
          '',
          Validators.required,
        ],

        /*
         * Optional. It is only displayed for
         * commercial projects.
         */
        role: [''],

        industry: [
          '',
          Validators.required,
        ],

        projectDescription: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
          ],
        ],
      }),

      /*
       * STEP 3:
       * Additional technical details.
       * All fields are optional.
       */
      building: this.fb.group({
        buildingWidth: [
          '',
          dimensionValidator({
            minFeet: 2,
            maxFeet: 1000,
            optional: true,
          }),
        ],

        buildingLength: [
          '',
          dimensionValidator({
            minFeet: 2,
            maxFeet: 1000,
            optional: true,
          }),
        ],

        wallHeight: [
          '',
          dimensionValidator({
            minFeet: 0,
            maxFeet: 100,
            optional: true,
          }),
        ],

        projectStage: [''],
        drawings: [''],
        roofPitch: [''],
        budget: [''],
        timeline: [''],
        feedback: [''],
        notes: [''],
      }),
    });
  }

  private collectInvalidFieldLabels(
    control: AbstractControl,
    path = '',
  ): string[] {
    if (control instanceof FormGroup) {
      return Object.keys(
        control.controls,
      ).flatMap((key) => {
        const child =
          control.controls[key];

        const childPath = path
          ? `${path}.${key}`
          : key;

        return this
          .collectInvalidFieldLabels(
            child,
            childPath,
          );
      });
    }

    return control.invalid
      ? [
        this.fieldLabels[path] ??
        path,
      ]
      : [];
  }

  trackFormStarted(): void {
    if (this.formStartTracked) {
      return;
    }

    this.formStartTracked = true;

    logEvent(analytics, 'quote_form_started', {
      form_name: 'heritage_quote_request',
    });
  }

  onStepChange(event: StepperSelectionEvent): void {
    const stepNumber = event.selectedIndex + 1;
    const stepName =
      this.stepNames[event.selectedIndex] ??
      `step_${stepNumber}`;

    /*
     * Only log each viewed step once per form session.
     * Going backward and forward will not inflate the data.
     */
    if (this.viewedSteps.has(stepNumber)) {
      return;
    }

    this.viewedSteps.add(stepNumber);

    logEvent(analytics, 'quote_form_step_viewed', {
      form_name: 'heritage_quote_request',
      step_number: stepNumber,
      step_name: stepName,
    });
  }

  trackStepCompleted(stepNumber: number): void {
    const stepControl =
      stepNumber === 1
        ? this.intakeForm.get('personal')
        : this.intakeForm.get('project');

    if (!stepControl) {
      return;
    }

    if (stepControl.invalid) {
      stepControl.markAllAsTouched();

      logEvent(analytics, 'quote_form_step_error', {
        form_name: 'heritage_quote_request',
        step_number: stepNumber,
        step_name:
          this.stepNames[stepNumber - 1] ??
          `step_${stepNumber}`,
      });

      return;
    }

    logEvent(analytics, 'quote_form_step_completed', {
      form_name: 'heritage_quote_request',
      step_number: stepNumber,
      step_name:
        this.stepNames[stepNumber - 1] ??
        `step_${stepNumber}`,
    });
  }

}