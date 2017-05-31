import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

import {DomSanitizer} from '@angular/platform-browser';

const jsPDF = require('jspdf');
const jsPDFAutoTable = require('jspdf-autotable');

const imageDataLogoWVDE = require('../../../assets/images/LogoWVDE.js').getImageData();


@Component({
  selector: 'app-report1',
  templateUrl: './report1.component.html',
  styleUrls: ['./report1.component.css']
})
export class Report1Component implements OnInit {
  doc = new jsPDF();
  docOutput: any;

  base64Img: any;

  listYear:any[];
  academicyear : any;
  schoolData : any;
  g_county : any[];
  g_schools : any[];
  g_year : any;
  activeYears : any[];
  // AcademicYear : string;

  constructor(
    private authService:AuthService,
    private validateService: ValidateService,
    private router:Router,
    private flashMessage:FlashMessagesService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    var _listYear=[];
    this.authService.getAllAcademicYearsExists().subscribe(academicyears => {
      if(academicyears.success){
        var academicY = [];
        academicY = this.loadAcademicYears();

        for (var i = 0; i < academicyears.academicyears.length; i++) {
          _listYear.push(academicyears.academicyears[i]);
          // console.log('Years: ' + academicyears.academicyears[i]);
        }

        var setYear = new Set();
        for(var l=0;l<academicY.length;l++){
          setYear.add(academicY[l]);
        }
        for(var k=0; k<_listYear.length; k++){
          setYear.add(_listYear[k]);
        }
        _listYear = Array.from(setYear);

        this.listYear = _listYear.sort();
      }else{
        this.flashMessage.show(academicyears.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
      }
    });

  }

  loadAcademicYears(){
    var aYear = [];
    var d = new Date();
    var prev = d.getFullYear()-1 + '-' + d.getFullYear().toString().substr(-2);
    var next = d.getFullYear() + '-' + (d.getFullYear()+1).toString().substr(-2);
    aYear.push(prev);
    aYear.push(next);
    this.activeYears = aYear;
    return this.activeYears;
  }

  onGenerateReport(){
    if("undefined" !== typeof this.g_county){
      this.g_county = undefined;
      this.g_schools = undefined;
    }
    this.doc = new jsPDF();
    const aYear = {
      academicyear : this.academicyear
    }

    this.g_year = aYear.academicyear;

    var l_county = [];
    var l_schools = [];
    if("undefined" !== typeof aYear.academicyear){
      this.authService.generateReportfornotSubmittedGradDates(aYear).subscribe(schooldata => {
        if(schooldata.success){
          this.schoolData = schooldata.schoolnamescountywise;
            for (var i = 0; i < this.schoolData.length; i++){
              var _lschools = [];
              for (var j = 0; j < this.schoolData[i].countschools; j++){
                var countyName = this.schoolData[i]._id.countyname;
                var schoolName = this.schoolData[i].schools[j];
                _lschools.push(schoolName);
              }
              l_county.push(this.schoolData[i]._id.countyname);
              l_schools.push(_lschools);
            }
            this.g_county = l_county;
            this.g_schools = l_schools;
            // console.log('g_county--->' + this.g_county);
            // console.log('g_schools--->' + this.g_schools);
            // this.loadPDF();
        }else{
          this.flashMessage.show(schooldata.msg, {
              cssClass: 'alert-danger',
              timeout: 5000});
        }
      });
    }else{
      this.flashMessage.show('Please select Academic Year', {
        cssClass: 'alert-danger',
        timeout: 5000});
    }
  }

  loadPDF() {

    // Load base64 encoded jpg/jpeg image data and store it in base64Img.
    this.loadImage();

    let academicyear = this.g_year;

    let getColumnsData = function () {
        return [
            {title: "No.", dataKey: "id"},
            {title: "County", dataKey: "county"},
            {title: "School", dataKey: "schoolname"}
            // {title: "Graduation Date", dataKey: "graduationdate"}
        ];
    };


    let today = new Date();
    let formattedDateTime = today.toLocaleDateString() + " - " + today.toLocaleTimeString();

    this.doc.setFontSize(10);
    this.doc.setFontStyle('normal');
    this.doc.text("Report generated on " + formattedDateTime, this.doc.internal.pageSize.width - 89, 10);

    // Add the image in the pdf file.
    this.doc.addImage(this.base64Img, 'JPEG', this.doc.internal.pageSize.width/2 - 40, 12, 70, 22);

    this.doc.setFontSize(14);
    this.doc.setFontStyle('normal');
    this.doc.text("County Boards of Education", this.doc.internal.pageSize.width/2 - 31, 41);

    this.doc.setFontSize(13);
    this.doc.setFontStyle('bold');
    this.doc.text("SCHOOLS WITH NO GRADUATION DATES" + " FOR THE " + academicyear + " SCHOOL YEAR", this.doc.internal.pageSize.width/2 - 83, 50);

    /* this.doc.setFontSize(13);
    this.doc.setFontStyle('normal');
    this.doc.text("For the " + academicyear + " School Year", this.doc.internal.pageSize.width/2 - 25, 52); */

    this.doc.setFontSize(12);
    this.doc.setFontStyle('italic');
    this.doc.text("(Sorted by County Name)", this.doc.internal.pageSize.width/2 - 24, 58);

    /* // Text before the below tabel.
    this.doc.setFontSize(11);
    this.doc.setFontStyle('normal');
    // this.doc.setTextColor(100);
    let text = this.doc.splitTextToSize("Lorem ipsum dolor sit amet, consectetur adipisicing elit ipsum dolor sit adipisicing ",
      this.doc.internal.pageSize.width - 35, {});
    this.doc.text(text, 15, 50); */

    // Table
    // this.doc.autoTable(getColumnsData(), getRowsData(), {startY: 58});
    // this.doc.autoTable(getColumnsData(), getRowsData(), {startY: 58, theme: 'grid'});
    this.doc.autoTable(getColumnsData(), this.getRowsData(), {

      startY: 64,
      tableLineColor: [105, 105, 105],
      tableLineWidth: 0.07,
      styles: {
        // font: 'courier',
        lineColor: [125, 125, 125],
        lineWidth: 0.05
      },
      headerStyles: {
        // fillColor: [44, 62, 80],
        fontSize: 11,
        halign: 'center',
        valign: 'middle'
      },
      /* bodyStyles: {
        fillColor: [52, 73, 94],
        textColor: 240
      }, */
      alternateRowStyles: {
        fillColor: [236, 236, 236]
      },
      columnStyles: {
        id: {
          halign: 'center',
          valign: 'middle'
        },
        county: {
          halign: 'center',
          valign: 'middle'
        }
      },
    });
    // Text after the above tabel.
    // this.doc.text(text, 14, this.doc.autoTable.previous.finalY + 10);

    // Rectangle (filled square).
    // this.doc.setTextColor(100);
    this.doc.rect(this.doc.internal.pageSize.width/2 - 1, this.doc.autoTable.previous.finalY + 10, 3, 5, 'F');


    // Set properties on the document.
    this.doc.setProperties({
      title: 'Report',
      subject: 'Online Reporting Tool - WVDE',
      author: 'Online Reporting Tool - WVDE',
      // keywords: '',
      // creator: ''
    });

    // To download the pdf file at client side.
    // this.doc.save('MyPDF 2.pdf');

    // this.pdffile = 'data:application/pdf;base64,' + btoa(this.doc.output());

    // Compile the pdf and btoa it.
    this.docOutput = btoa(this.doc.output());

    return this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,' + this.docOutput);
  }

  // Fetch base64 encoded jpg/jpeg image data from a function present in the file: "../../../assets/images/LogoWVDE.js".
  loadImage() {
    this.base64Img = imageDataLogoWVDE;
  }

 getRowsData() {

    let data = [];
    let rowCount = this.g_county.length;

    for (let i = 0; i <rowCount; i++) {
      let schoolnames = this.g_schools[i];
      let schoolnamesFormatted = "";
      for (let j = 0; j < schoolnames.length; j++) {
        schoolnamesFormatted += schoolnames[j] + "\n";
      }

      schoolnamesFormatted = schoolnamesFormatted.substring(0, schoolnamesFormatted.length-1);
        data.push({
            id: i+1,
            county: this.g_county[i],
            schoolname: schoolnamesFormatted,
        });
    }
    return data;
  }


}
