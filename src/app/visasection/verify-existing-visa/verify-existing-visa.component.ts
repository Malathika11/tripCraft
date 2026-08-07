import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

// interface UploadFile {
//   file?: File;
//   fileName: string;
//   fileSize: string;
//   progress: number;
//   uploaded: boolean;
//   uploading: boolean;
// }

@Component({
  selector: 'app-verify-existing-visa',
  templateUrl: './verify-existing-visa.component.html',
  styleUrls: ['./verify-existing-visa.component.scss']
})
export class VerifyExistingVisaComponent implements OnInit {

  public verifyJsonData: any = {
    verifyHead: 'Verify Existing Visa',
    verifyPara: 'Please upload the required documents for verification.',
    uploadSection: [
      {
        label: 'Upload Passport Copy',
        mandatory: true,
        file: null,
        progress: 0
      },
      {
        label: 'Upload Visa Copy',
        mandatory: true,
        file: null,
        progress: 0
      },
      {
        label: 'Upload Additional Supporting Documents',
        subLabel: true,
        mandatory: false,
        file: null,
        progress: 0
      }
    ],
    verificationTxt: 'Verification Status',
    verificationProcess: 'Not Yet',
    verificationPara: 'We are verifying your documents. This may take a few minutes.',
    statusList: [
      {
        text: 'Passport Copy'
      },
      {
        text: 'Visa Copy'
      },
      {
        text: 'Supporting Documents'
      }
    ]
  }

  @Output() public visaPopupClose = new EventEmitter<boolean>();
  
  @Output() public previousPageLoad = new EventEmitter<boolean>();

  public disableSubmit:boolean = false;

  constructor(public apiService:ApiService) { }

  ngOnInit(): void {
  }

  fileSelected(event: any, uploadData: any) {
    
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    this.apiService.uploadFile(file).subscribe({
      next:(res:any)=>{
        uploadData.file = file;
        uploadData.progress = 100;
        uploadData.fileId = res.fileId;
        uploadData.fileName = res.fileName;
        uploadData.fileSize = (res.size/1024/1024).toFixed(2)+" MB";
        this.fakeUpload(uploadData);
      }
    });
    console.log('fileSelected',event.target.files[0],uploadData);
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
  }

  drop(event: DragEvent, uploadData: any) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (!file) {
      return;
    }
    uploadData.file = file;
    uploadData.progress = 0;
    this.fakeUpload(uploadData);
  }

  fakeUpload(uploadData: any) {
    console.log('fakeUpload',uploadData);
    const timer = setInterval(() => {
      uploadData.progress += 10;
      if (uploadData.progress >= 100) {
        uploadData.progress = 100;
        clearInterval(timer);
      }
    }, 80);
    this.getFileSize(uploadData.file.size, uploadData);
    this.verifyJsonData.uploadSection.map((index:any)=>{
      this.disableSubmit = (!index?.fileId) ? false : true;
    })
  }

  getFileSize(size: any,uploadData:any) {
    console.log('getFileSize',size);
    
    uploadData.fileSize = (size / (1024 * 1024)).toFixed(2) + " MB";
  }

  removeFile(uploadData: any, event: MouseEvent) {
    event.stopPropagation();
    uploadData.file = null;
    uploadData.progress = 0;
  }

  submitVerification() {
    console.log('tes');
    if(this.disableSubmit){
      const payload = {
        passportId: this.verifyJsonData.uploadSection[0].fileId,
        visaId: this.verifyJsonData.uploadSection[1].fileId,
        supportingId: this.verifyJsonData.uploadSection[2].fileId
      };
      this.apiService.submitVerification(payload).subscribe({
        next:(res)=>{ console.log(res); }
      });
    }
  }

  continue(){
    this.visaPopupClose.emit(false);
  }

  previousPage(){
    this.previousPageLoad.emit(false);
  }
}
