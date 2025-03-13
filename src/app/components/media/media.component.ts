import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
})
export class MediaComponent implements OnInit {
  mediaList: any[] = [];
  selectedFile: File | null = null;

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.loadMedia();
  }

  loadMedia() {
    this.mediaService.getMedia().subscribe((data) => {
      this.mediaList = data;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadMedia() {
    if (this.selectedFile) {
      this.mediaService.uploadMedia(this.selectedFile).subscribe(() => {
        this.loadMedia();
        alert('Media uploaded successfully!');
      });
    }
  }
}
