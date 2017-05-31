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
  selector: 'app-report3',
  templateUrl: './report3.component.html',
  styleUrls: ['./report3.component.css']
})
export class Report3Component implements OnInit {
  doc = new jsPDF();
  docOutput: any;

  base64Img: any;

  listYear:any[];
  academicyear : any;
  g_academicyear : any;
  schoolData : any;
  g_county : any[];
  g_schools : any[];
  g_dates : any[];
  pdfData : any;
  g_length : any;
  activeYears : any[];

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
    if("undefined" !== typeof this.g_dates){
      this.g_county = undefined;
      this.g_schools = undefined;
      this.g_dates = undefined;
    }
    this.doc = new jsPDF();
    const aYear = {
      academicyear : this.academicyear
    }

    this.g_academicyear = aYear.academicyear;
    // console.log('ayear: ' + aYear.academicyear);
    var l_county = [];
    var l_schools = [];
    var l_dates = [];

    if("undefined" !== typeof aYear.academicyear){
      this.authService.generateReportforSubmittedGradDatesOrderedbyDates(aYear).subscribe(schooldata => {
        if(schooldata.success){
          this.schoolData = schooldata.schoolnamesgraduationdatewiseandthencountywise;
          this.g_length = this.schoolData.length;
          // console.log('length:' + this.g_length);
            for (var i = 0; i < this.schoolData.length; i++){
              var _lcounty = [];
              var _lschools = [];
              // var graduationDate = this.schoolData._id.graduationdate;
              for (var j = 0; j < this.schoolData[i].countcounties; j++){

                var countyName = this.schoolData[i].countywiseschools[j].countyname;
                for(var k = 0; k < this.schoolData[i].countywiseschools[j].countschools; k++){
                    var schoolName = this.schoolData[i].countywiseschools[j].schools[k];
                    l_schools.push(schoolName);
                    l_county.push(countyName);
                    l_dates.push(this.schoolData[i]._id.graduationdate);
                }

              }
              //l_schools.push(_lschools);
              //l_county.push(_lcounty);
              //l_dates.push(this.schoolData[i]._id.graduationdate);

            }
            this.g_county = l_county;
            this.g_schools = l_schools;
            this.g_dates = l_dates;
            // console.log('county length;-' + this.g_county.length);
            // console.log('school length;-' + this.g_schools.length);
            // console.log('date length;-' + this.g_dates.length);
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

    let academicyear = this.g_academicyear;

    let getColumnsData = function () {
        return [
            {title: "No.", dataKey: "id"},
            {title: "Graduation Date", dataKey: "graduationdate"},
            {title: "County", dataKey: "county"},
            {title: "School", dataKey: "schoolname"}
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
    this.doc.text("SCHOOLS WITH GRADUATION DATES" + " FOR THE " + academicyear + " SCHOOL YEAR", this.doc.internal.pageSize.width/2 - 80, 50);

    /* this.doc.setFontSize(13);
    this.doc.setFontStyle('normal');
    this.doc.text("For the " + academicyear + " School Year", this.doc.internal.pageSize.width/2 - 25, 52); */

    this.doc.setFontSize(12);
    this.doc.setFontStyle('italic');
    this.doc.text("(Sorted by Graduation Date and Then by County Name)", this.doc.internal.pageSize.width/2 - 53, 58);

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
     let rowCount = this.g_dates.length;
    // let rowCount = this.g_length;
    //  console.log('row c:' + rowCount);
     var prev_county = "";
     var prev_date = "";
     var j = 0;
     var prev_j = 0;
     var k= "";
     for (let i = 0; i <rowCount; i++) {

       var _report_date = "";
       var _report_county = "";
       var _report_county2 = "";


       if(prev_date != this.g_dates[i]){
          _report_date = this.g_dates[i];
          prev_date = _report_date;
          j++;
       }
       else{
          _report_date = "";
          prev_j = j;
       }

       if(prev_county != this.g_county[i] || _report_date != ""){
          _report_county = this.g_county[i];
          prev_county = _report_county;
       }
       else{
          _report_county = "";
       }

       if(prev_j != j){
         data.push({
             id: j,
             graduationdate: _report_date,
             county: _report_county,
             schoolname: this.g_schools[i]
         });
       }else{
         data.push({
             id: k,
             graduationdate: _report_date,
             county: _report_county,
             schoolname: this.g_schools[i]
         });
       }

     }
     return data;
   }



}
