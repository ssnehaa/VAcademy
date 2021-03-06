import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from '../services/course.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { studentAssngService } from '../services/studentAssng.service';
import { teacherAssngService } from '../services/teacherAssng.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-show-assngment',
  templateUrl: './show-assngment.component.html',
  styleUrls: ['./show-assngment.component.css']
})
export class ShowAssngmentComponent implements OnInit {

  fileUploads: Observable<string[]>;
  submittedFiles: Observable<string[]>;
  isTeacher = false;

  assng = false;
  myAssng = false;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selected: boolean = false;
  uploadFile: any;

  constructor(private courseService: CourseService,
    private uploadService: AuthService,
    private studentAssngService: studentAssngService,
    private teacherAssngService: teacherAssngService,
    private tokenService: TokenStorageService,
    private alertService: AlertService) { }

  ngOnInit(): void {

    if(this.tokenService.getUser().role == 'teacher') {
      this.isTeacher = true;
    }
      this.fileUploads = this.teacherAssngService.getFiles(this.courseService.getCourseName());
      
      this.submittedFiles = this.studentAssngService.getAssng(this.courseService.getCourseName(), this.tokenService.getUser().name);

      if(this.fileUploads != null) {
        this.assng = true;
      }
      if(this.submittedFiles != null) {
        this.myAssng = true;
      }

  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload() {
    this.progress.percentage = 0;
    this.selected = true;

    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadFile = this.currentFileUpload;
    this.studentAssngService.uploadAssng(this.currentFileUpload, this.courseService.getCourseName(), this.tokenService.getUser().name).subscribe(event => {
<<<<<<< HEAD
      this.alertService.confirmThis("Successfully added");
=======
      alert("Successfully added");
>>>>>>> 2e9c805fc8ca8c59496db8c5dd8be397305068a6
    },
    err => {
      console.log(err);
      this.alertService.confirmThis(err);
    });

    this.selectedFiles = undefined;
  }

}
