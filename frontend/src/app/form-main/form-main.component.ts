import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-main',
  templateUrl: './form-main.component.html',
  styleUrls: ['./form-main.component.css'],
})
export class FormMainComponent {
  title = 'Employee Form';
  operation = 'Create Employee Record';
  SignupForm!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private db: DbService,
    private _router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.getEmployees();
  }
  element!: any;
  _id!: any;
  op!: String;
  defName = '';
  defId = '';
  defDepartment = '';
  defDesignation = '';
  defSalary = '';
  defAge = '';
  defLanguages = '';
  defBloodgroup = '';
  defState = '';
  defGender = '';
  defModeOfOffice = false;
  defManid = '';

  create = true;
  edit = false;
  view = false;

  durationInSeconds = 5;

  //employees for manager select field
  employeesOps = null;

  //selected manager
  selMan = '';

  ngOnInit() {
    this.SignupForm = this.formbuilder.group({
      name: [this.defName, [Validators.pattern('[a-zA-Z]+')]],
      id: [this.defId, [Validators.required, Validators.maxLength(3)]],
      department: [this.defDepartment, Validators.required],
      designation: [this.defDesignation, Validators.required],
      manid: [this.defManid],
      salary: [this.defSalary, Validators.required],
      age: [this.defAge, Validators.required],
      languages: [this.defLanguages, Validators.required],
      bloodgroup: [this.defBloodgroup, Validators.required],
      state: [this.defState, Validators.required],
      gender: [this.defGender, Validators.required],
      modeOfOffice: [this.defModeOfOffice, Validators.required],
    });
    this._id = String(this.route.snapshot.queryParamMap.get('_id'));
    // console.log(this._id);
    // debugger;
    if (this._id !== 'null') {
      this.getDataById(this._id);
      // console.log(this.element);
    } else {
      return;
    }
    this.op = String(this.route.snapshot.queryParamMap.get('op'));
    console.log(this._id, this.op);
  }

  onSubmit() {
    // console.log(this.SignupForm.value);
    // console.log(this.SignupForm.controls['name'].errors);
    // console.log(this.SignupForm.controls['id'].errors);
    // this.postData();
    // console.log(this.getData());
    // this.getData();
    this.SignupForm.controls['manid'].setValue(this.selMan);
    console.log(this.SignupForm.value);
    this.db.postData(this.SignupForm.value).subscribe((data) => {
      console.log(data);

      this.openSnackBar('Create employee record successfull!', 'Close');
      this._router.navigateByUrl('/employeesView');
    });
  }
  onCancel() {
    this._router.navigateByUrl('/employeesView');
  }
  onReset() {
    console.log(this.SignupForm.controls['name'].errors);
    this.SignupForm.patchValue({
      name: this.defName,
      id: this.defId,
      department: this.defDepartment,
      designation: this.defSalary,
      manid: this.defManid,
      salary: this.defSalary,
      age: this.defAge,
      languages: this.defLanguages,
      bloodgroup: this.defBloodgroup,
      state: this.defState,
      gender: this.defGender,
    });
  }

  onUpdate() {
    this.db
      .updateData(this.element._id, {
        _id: this.element._id,
        ...this.SignupForm.value,
      })
      .subscribe((data) => {
        this._router.navigateByUrl('/employeesView');
        console.log(data);
        this.openSnackBar('Update Successfull!', 'Close');
      });
  }

  onDownload() {
    this._router.navigate(['/pdf'], {
      queryParams: { _id: this.element._id },
    });
  }

  onManSelect(_id: any) {
    // this.SignupForm.controls['manid'].setValue(_id);
    // console.log(this.SignupForm.value.manid);
    // return name;
    this.selMan = _id;
    console.log(this.selMan);
  }

  goToEmployees() {
    this._router.navigateByUrl('/employeesView');
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  // getData() {
  //   this.db.getData().subscribe((data) => {
  //     console.log(data);
  //   });
  // }
  // postData() {
  //   this.db.postData(this.SignupForm.value).subscribe((data) => {
  //     console.log(data);

  //     this.openSnackBar('Create employee record successfull!', 'Close');
  //     this._router.navigateByUrl('/employeesView');
  //   });
  // }
  // async getEmployees() {

  //   this.employeesOps = await this.db.getData();
  //   this.employeesOps = this.employeesOps.data;
  // }
  getEmployees() {
    this.db.getData().subscribe((data) => {
      console.log(data.data);
      this.employeesOps = data.data;
    });
  }
  getDataById(_id: string) {
    this.db.getDataById(_id).subscribe((data) => {
      this.element = data.data;
      console.log(this.element);

      if (this.op === 'edit') {
        this.create = false;
        this.edit = true;
        this.operation = 'Edit Employee Record';
      }
      if (this.op === 'edit' || this.op === 'view') {
        this.SignupForm.patchValue(this.element);
      }

      if (this.op === 'view') {
        this.operation = 'View Employee Record';
        this.create = false;
        this.view = true;
        this.SignupForm.controls['name'].disable();
        this.SignupForm.controls['id'].disable();
        this.SignupForm.controls['department'].disable();
        this.SignupForm.controls['designation'].disable();
        this.SignupForm.controls['manid'].disable();
        this.SignupForm.controls['salary'].disable();
        this.SignupForm.controls['age'].disable();
        this.SignupForm.controls['languages'].disable();
        this.SignupForm.controls['bloodgroup'].disable();
        this.SignupForm.controls['state'].disable();
        this.SignupForm.controls['gender'].disable();
        this.SignupForm.controls['modeOfOffice'].disable();
      }
    });
  }
}
