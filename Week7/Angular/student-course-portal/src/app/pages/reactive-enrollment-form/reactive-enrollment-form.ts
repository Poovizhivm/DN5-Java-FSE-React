import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [this.simulateEmailCheck.bind(this)],
      ],
      courseId: ['', [Validators.required, this.noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  /*
   * WHY THE TYPED GETTER IS BETTER THAN CASTING IN THE TEMPLATE:
   * 1. Cleaner Template Code: HTML templates should focus on presentation structure. Casting (e.g., as FormArray)
   *    in HTML is verbose and prone to syntax errors.
   * 2. Strict Type Safety: The TypeScript compiler checks types strictly. A typed getter ensures type safety during
   *    compilation, enabling IDE autocomplete and refactoring assistance.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  // Custom Synchronous Validator
  noCourseCode(control: AbstractControl): ValidationErrors | null {
    const value = String(control.value || '');
    if (value.toUpperCase().startsWith('XX')) {
      return { noCourseCode: true };
    }
    return null;
  }

  // Custom Asynchronous Validator
  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const email = String(control.value || '');
        if (email.toLowerCase().includes('test@')) {
          resolve({ emailTaken: true });
        } else {
          resolve(null);
        }
      }, 800);
    });
  }

  addCourse() {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number) {
    this.additionalCourses.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.enrollForm.valid) {
      console.log('Reactive Form Submitted!');
      /*
       * DIFFERENCE BETWEEN value AND getRawValue():
       *
       * 1. enrollForm.value:
       *    - Returns only the values of the enabled form controls.
       *    - If any control in the form is disabled (e.g., control.disable()), its value is omitted.
       *
       * 2. enrollForm.getRawValue():
       *    - Returns the values of all form controls, regardless of whether they are enabled or disabled.
       */
      console.log('Form Value (enabled only):', this.enrollForm.value);
      console.log('Form Raw Value (all):', this.enrollForm.getRawValue());
    }
  }

  onReset() {
    this.submitted = false;
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      agreeToTerms: false,
    });
    this.additionalCourses.clear();
  }
}
