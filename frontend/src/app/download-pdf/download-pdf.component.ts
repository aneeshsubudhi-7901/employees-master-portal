import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DbService } from '../db.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-download-pdf',
  templateUrl: './download-pdf.component.html',
  styleUrls: ['./download-pdf.component.css'],
})
export class DownloadPdfComponent implements OnInit {
  title = 'PDF View for details';
  employeeData!: any;
  _id!: string;
  @ViewChild('pdf-view') htmlData!: ElementRef;
  constructor(
    private db: DbService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}
  getDataById(_id: string) {
    this.db.getDataById(_id).subscribe((data) => {
      console.log(data.data);
      this.employeeData = data.data;
    });
  }

  ngOnInit(): void {
    this._id = String(this.route.snapshot.queryParamMap.get('_id'));

    if (this._id !== 'null') {
      this.getDataById(this._id);
    } else {
      return;
    }
  }
  openPDF(id: string): void {
    let DATA: any = document.getElementById('pdf-view');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`employee-details-${id}.pdf`);
    });
  }
}
