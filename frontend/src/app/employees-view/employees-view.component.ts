import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { DbService } from '../db.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import { OrganizationComponent } from '../organization/organization.component';

@Component({
  selector: 'app-employees-view',
  templateUrl: './employees-view.component.html',
  styleUrls: ['./employees-view.component.css'],
})
export class EmployeesViewComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  title = 'Employees View';
  durationInSeconds = 5;

  //trial data
  name!: string;
  animal!: string;

  displayedColumns: string[] = [
    'id',
    'name',
    'department',
    'designation',
    'gender',
    'view',
    'edit',
    'delete',
    'org',
    // 'settings',
  ];
  constructor(
    private db: DbService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.loadEmployees();
  }
  ngOnInit(): void {}

  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadEmployees(): void {
    this.db.getData().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // async loadEmployees() {
  //   this.dataSource = await this.db.getData();
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }
  onEdit(_id: any) {
    this._router.navigate(['/create'], {
      queryParams: { _id, op: 'edit' },
    });
  }

  onView(_id: any) {
    this._router.navigate(['/create'], {
      queryParams: { _id, op: 'view' },
    });
  }

  onDelete(_id: any) {
    this.db.deleteData(_id).subscribe((data) => {
      console.log(data);
      // this._router.navigateByUrl('/employeesView');
      this.loadEmployees();
      this.openSnackBar('Delete Successfull!', 'Close');
    });
  }

  onOrg(_id: any) {
    // this._router.navigate(['/hierarchy'], { queryParams: { _id } });
    // this.db.getHierarchy(_id).subscribe((data) => {
    //   console.log(data);
    // });
  }

  getManager(_id: any) {
    this.db.getManager(_id).subscribe((data) => {
      console.log(data.data);
      return data.data;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
    });
  }

  openDialog(_id: any): void {
    const dialogRef = this.dialog.open(OrganizationComponent, {
      data: {
        _id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
