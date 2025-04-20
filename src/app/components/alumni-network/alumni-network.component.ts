import { Component, OnInit } from '@angular/core';
import { Alumni, AlumniService } from '../../services/alumni.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-alumni-network',
  templateUrl: './alumni-network.component.html',
  styleUrls: ['./alumni-network.component.css']
})
export class AlumniNetworkComponent implements OnInit {
  alumniList: Alumni[] = [];
  searchTerm: string = '';
  page: number = 0;
  size: number = 6; // You can change this
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private alumniService: AlumniService, private router: Router) {}

  ngOnInit() {
    this.loadAlumni();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.page = 0;
      this.alumniList = [];
      this.loadAlumni();
    });
  }

  loadAlumni() {
    this.alumniService.getAlumni(this.searchTerm, this.page, this.size).subscribe(response => {
      if (this.page === 0) {
        this.alumniList = response.content; // ✅ New search: replace list
      } else {
        this.alumniList = [...this.alumniList, ...response.content]; // ✅ Load more: append
      }
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
    });
  }

  searchAlumni() {
    this.page = 0;
    this.alumniList = [];
    this.loadAlumni();
  }

  loadMore() {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.loadAlumni();
    }
  }
}
