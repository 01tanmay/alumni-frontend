import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent implements OnInit {
  mediaList: any[] = [];
  selectedFile: File | null = null;
  mediaCount: number = 0;

  constructor(private mediaService: MediaService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getMedia();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadMedia() {
    if (!this.selectedFile) {
      this.snackBar.open('Please select a file', 'Close', { duration: 3000 });
      return;
    }

    this.mediaService.uploadMedia(this.selectedFile).subscribe(
      (response) => {
        this.snackBar.open(response.message, 'Close', { duration: 3000 });
        this.selectedFile = null;
        this.getMedia();
      },
      (error) => {
        console.error('Upload error:', error);
        this.snackBar.open('Error uploading media. Try again.', 'Close', { duration: 3000 });
      }
    );
  }

  getMedia() {
    this.mediaService.getMedia().subscribe(
      (data) => {
        this.mediaList = data;
        this.mediaCount = data.length;
      },
      (error) => {
        console.error('Fetch error:', error);
        this.snackBar.open('Failed to load media list', 'Close', { duration: 3000 });
      }
    );
  }
}
