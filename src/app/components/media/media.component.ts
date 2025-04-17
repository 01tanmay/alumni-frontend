import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  imageMedia: any[] = [];
  videoMedia: any[] = [];
  totalCount: number = 0;

  constructor(private mediaService: MediaService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getMedia();
  }

  getMedia(): void {
    this.mediaService.getMedia().subscribe({
      next: (data) => {
        this.imageMedia = data.filter((m: any) => m.fileType?.includes('image'));
        this.videoMedia = data.filter((m: any) => m.fileType?.includes('video'));
        this.totalCount = data.length;
      },
      error: () => {
        this.snackBar.open('Failed to load media list', 'Close', { duration: 3000 });
      }
    });
  }
}
