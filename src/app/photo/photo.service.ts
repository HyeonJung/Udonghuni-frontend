import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
declare const $: any;

@Injectable()
export class PhotoService {

    constructor(private http: Http, private router: Router) {}

    /**
     * 이미지 목록
     * @param row
     * @param page
     */
    getImages(row: number, page: number, sort: string, title: string) {

        return this.http.get(environment.apiUrl + '/photos?size=' + row  + '&page=' + page + '&sort=' + sort + '&title=' + title )
        .map(response => response.json());
    }

    getAllPhoto() {
      return this.http.get(environment.apiUrl + '/photos');
    }

    /**
     * 이미지 삭제
     */
    removeImages(imageNo: number) {

      return this.http.delete(environment.apiUrl + '/photos/' + imageNo);
    }

    /**
     * 이미지 업로드 (list)
     */
    uploadImages(files: File[]) {
      const formData = new FormData();
      for (const file of files) {
        formData.append('files', file);
      }

      return this.http.post(environment.apiUrl + '/photos', formData);
    }

    /**
     * 이미지 업로드
     */
    uploadImage(files: File) {
      const formData = new FormData();
      formData.append('files', files);
      return this.http.post(environment.apiUrl + '/photos', formData);
    }

    /**
     * 이미지 업로드
     */
    // uploadImageFormData(formData: FormData) {
    //   this.http.post(environment.apiUrl + '/images', formData).subscribe(response => {
    //     if (response.status === 201) {
    //       const storedImages = response.json();
    //         let count = 0;
    //         const convertCheckInterval = setInterval(() => {
    //           if (storedImages.length > 0) {
    //             this.checkConvertImage(storedImages, 'crop', 'thumbnail').subscribe(response => {
    //               if (response.status === 200) {
    //                 const ret = response.json();

    //                 if (count > 20) {
    //                   alert('응답시간이 초과되었습니다.');
    //                   clearInterval(convertCheckInterval);
    //                 }

    //                 if (ret) {
    //                   $('#imageFile').val('');
    //                   alert('이미지가 업로드 되었습니다.');
    //                   clearInterval(convertCheckInterval);

    //                   this.router.navigate(['/image/list']);
    //                 }

    //                 count++;

    //               }
    //             }, error => {
    //               if (error.status === 401 || error.status === 403) {
    //                 alert('로그인이 만료되었거나 잘못된 인증입니다.\n다시 로그인 해주세요');
    //                 this.userService.logout();
    //               } else {
    //                 console.log(error);
    //                 alert('오류가 발생했습니다.');
    //               }
    //               clearInterval(convertCheckInterval);
    //             });
    //           } else {
    //             clearInterval(convertCheckInterval);
    //           }
    //         }, 2000);

    //       }
    //   }, error => {
    //     if (error.status === 401 || error.status === 403) {
    //       alert('로그인이 만료되었거나 잘못된 인증입니다.\n다시 로그인 해주세요');
    //       this.userService.logout();
    //     } else if (error.status === 415) {
    //       $('#imageFile').val('');
    //       alert('지원하지 않는 파일 형식입니다.');
    //     } else {
    //       $('#imageFile').val('');
    //       alert('오류가 발생했습니다.');
    //     }

    //     });
    // }



}
