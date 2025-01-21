import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { merge } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../service/users.service';
import { MatTableModule } from '@angular/material/table';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  description: string;
  tags: string[];
  actions?: string;
}

@Component({
  selector: 'app-user-add-edit',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
  ],
  templateUrl: './user-add-edit.component.html',
  styleUrl: './user-add-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAddEditComponent implements OnInit {
  userForm: FormGroup;

  tags = new FormControl('');
  tagsList: string[] = [
    'decide',
    'almost',
    'response',
    'ten',
    'mission',
    'politics',
    'stay',
    'key',
    'she',
    'ability',
    'sort',
    'pay',
    'minute',
    'live',
    'without',
    'teach',
    'mode',
    'food',
    'get',
    'special',
    'write',
    'play',
    'week',
    'heavy',
    'receive',
    'bring',
    'claim',
    'defense',
    'page',
    'red',
    'wear',
    'own',
    'poor',
    'method',
    'where',
    'artist',
    'low',
    'industry',
    'give',
    'military',
    'class',
    'economic',
    'letter',
    'natural',
    'Mrs',
    'both',
    'last',
    'would',
    'appear',
    'job',
    'memory',
    'movement',
    'later',
    'campaign',
    'more',
    'information',
    'central',
    'PM',
  ];

  readonly email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');
  dataSource: any;
  displayedColumns: any;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    this.userForm = this.fb.group({
      firstName: '',
      lastName: '',
      email: this.email,
      createdAt: '',
      description: '',
      tags: [['']],
      actions: '',
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      const formValue = {
        ...this.userForm.value,
        tags: this.tags.value || []
      };

      if (this.data) {
        this.userService.updateUser(this.data.id, { ...formValue, id: this.data.id }).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error updating user:', err),
        });
      } else {
        this.userService.addUser(formValue).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Error adding user:', err),
        });
      }
    } else {
      this.updateErrorMessage();
    }
  }


  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
}
