import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { PhotoService } from '../photo.service';
import 'rxjs/add/operator/map';
declare const $: any;

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {

  uploading = false;
  dragoverflag = false;

  constructor(private titleService: Title, private meta: Meta, private photoService: PhotoService) { }

  ngOnInit() {

  }

  /**
   * 이미지 업로드 & 변환 완료 체크
   * @param images
   */
  public checkImageUpload() {
    // let count = 0;
    // const convertCheckInterval = setInterval(() => {
    //   if (images.length > 0) {
    //     this.imageHostingService.checkConvertImage(images, 'crop', 'thumbnail').subscribe(response => {
    //       if (response.status === 200) {
    //         const ret = response.json();

    //         if (count > 20) {
    //           alert('응답시간이 초과되었습니다.');
    //           this.uploading = false;
    //           clearInterval(convertCheckInterval);
    //         }

    //         if (ret) {
    //           $('#imageFile').val('');
    //           alert('이미지가 업로드 되었습니다.');
    //           this.uploading = false;
    //           clearInterval(convertCheckInterval);

    //           this.router.navigate(['/image/list']);
    //         }

    //         count++;

    //       }
    //     }, error => {
    //         console.log(error);
    //         alert('오류가 발생했습니다.');
    //       }
    //       clearInterval(convertCheckInterval);
    //       this.uploading = false;
    //     });
    //   } else {
    //     this.uploading = false;
    //     clearInterval(convertCheckInterval);
    //   }


    // }, 2000);
  }

  /**
   * 파일 업로드 클릭 시
   */
  public clickInputFile() {
    $('#imageFile').click();
  }

  /**
   * 파일 업로드
   * @param
   */
  public fileChange($event) {
    this.uploading = true;
    this.photoService.uploadImages($event.target.files).subscribe(response => {
      if (response.status === 201) {
        const storedImages = response.json();
        this.uploading = false;
        window.location.reload();
      }
    }, error => {

    if (error.status === 415) {
        $('#imageFile').val('');
        alert('지원하지 않는 파일 형식입니다.');
    } else {
      $('#imageFile').val('');
      alert('오류가 발생했습니다.');
    }

    this.uploading = false;
    });
  }

  /**
   * 파일 업로드 ( dnd )
   * @param event
   */
  public dropFiles(event) {

    this.dragoverflag = false;
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

    const url = event.dataTransfer.getData('URL');

    if (url) {
      this.dropUrl(url);
    }
    const files = event.dataTransfer.files;
    console.log(files);

    if (files.length > 0) {
      console.log('file');
      this.uploading = true;
      this.photoService.uploadImages(files).subscribe(response => {
        if (response.status === 201) {
          const storedImages = response.json();
          this.uploading = false;
          window.location.reload();
        }
      }, error => {
        if (error.status === 415) {
          $('#imageFile').val('');
          alert('지원하지 않는 파일 형식입니다.');
        } else {
          $('#imageFile').val('');
          alert('오류가 발생했습니다.');
        }

        this.uploading = false;
      });
    }

  }

  public onDragOver(event) {
    event.stopPropagation();
    event.preventDefault();

    this.dragoverflag = true;
  }

  public onDragLeave(event) {
    event.stopPropagation();
    event.preventDefault();

    this.dragoverflag = false;
  }

  /**
   * 이미지 URL 드래그 했을 때
   */
  public dropUrl(url) {

    // this.uploading = true;

    // const image = new Image();
    // const imageHostingService = this.imageHostingService;

    // const onload = function() {

    //   const canvas = document.createElement('canvas');
    //   canvas.width = this.width;
    //   canvas.height = this.height;
    //   const ctx = canvas.getContext('2d');
    //   ctx.drawImage(this, 0, 0);

    //   const base64 = canvas.toDataURL();
    //   const byteString = atob(base64.split(',')[1]);

    //   const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    //   const ab = new ArrayBuffer(byteString.length);
    //   const ia = new Uint8Array(ab);

    //   for (let i = 0; i < byteString.length; i++) {
    //      ia[i] = byteString.charCodeAt(i);
    //   }

    //   const blob = new Blob([ab], {type: mimeString});

    //   const formData = new FormData();
    //   formData.append('files', blob);

    //   imageHostingService.uploadImageFormData(formData);

    // }

    // function stopUpload() {
    //   alert('등록할 수 없는 URL입니다.');
    //   window.location.reload();
    // }

    // image.onerror = stopUpload;
    // image.onload = onload;
    // // image.setAttribute('crossOrigin', 'anonymous');
    // image.crossOrigin = 'anonymous';
    // image.src = url;

  }

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {

  //   if (event.ctrlKey && event.key.toString().toLowerCase() === 'v') {
  //     console.log(window['clipboardData']);
  //   }
  // }

  @HostListener('document:paste', ['$event'])
  onPaste(event) {

    for (let i = 0; i < event.clipboardData.items.length; i++) {
      const item = event.clipboardData.items[i];
      const type = item.type.toString();


      if (type.includes('image')) {
        this.uploading = true;
        this.photoService.uploadImage(item.getAsFile()).subscribe(response => {
          if (response.status === 201) {
            const storedImages = response.json();
            this.uploading = false;
            window.location.reload();
          }
        }, error => {
          if (error.status === 415) {
            $('#imageFile').val('');
            alert('지원하지 않는 파일 형식입니다.');
          } else {
            $('#imageFile').val('');
            alert('오류가 발생했습니다.');
          }

          this.uploading = false;
        });
      }
    }
  }


}
