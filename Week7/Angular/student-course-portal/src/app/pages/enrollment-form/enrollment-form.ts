import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;
  submitted = false;

  onSubmit(form: NgForm) {
    this.submitted = true;
    console.log('Template-Driven Form Submitted!');
    console.log('Form Value:', form.value);
    console.log('Form Validity:', form.valid);
  }

  onReset(form: NgForm) {
    this.submitted = false;
    form.resetForm({
      preferredSemester: 'Odd',
      agreeToTerms: false
    });
  }
}
