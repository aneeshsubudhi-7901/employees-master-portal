import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DbService } from '../db.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<OrganizationComponent>,
    private db: DbService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  dataSource!: any;
  // duration 1;
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.loadHierarchy(this.data._id);
  }
  loadHierarchy(_id: string) {
    this.db.getHierarchy(_id).subscribe((data) => {
      console.log(data.data);
      this.dataSource = data.data;
    });
  }
}
