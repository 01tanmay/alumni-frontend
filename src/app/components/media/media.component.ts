import { Component } from '@angular/core';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent {
  mediaFiles: any[] = [];
  selectedFile: File | null = null;

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    const fileUrl = URL.createObjectURL(this.selectedFile);
    const fileType = this.selectedFile.type.startsWith('image') ? 'image' : 'video';

    this.mediaFiles.push({ url: fileUrl, type: fileType });
    this.selectedFile = null;
  }
}
