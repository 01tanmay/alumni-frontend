import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent implements OnInit {
  mediaList: any[] = []; // Store uploaded media
  selectedFile: File | null = null;
  mediaCount: number = 0; // Holds the count of media items

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.getMedia(); // Fetch media when component loads
  }

  getMedia() {
    this.mediaService.getMedia().subscribe(
      (data: any) => {
        this.mediaList = data;
        this.mediaCount = this.mediaList.length; // Update media count
      },
      (error) => {
        console.error('Error fetching media:', error);
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  uploadMedia() {
    if (!this.selectedFile) {
      alert('Please select a file to upload.');
      return;
    }

    this.mediaService.uploadMedia(this.selectedFile).subscribe(
      (response) => {
        alert('Media uploaded successfully!');
        this.selectedFile = null;
        this.getMedia(); // Refresh media list and count after upload
      },
      (error) => {
        console.error('Error uploading media:', error);
      }
    );
  }
}
