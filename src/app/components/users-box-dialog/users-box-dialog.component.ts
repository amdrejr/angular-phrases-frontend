import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Page } from '../../models/page';
import { PhraseDataService } from '../../services/phrase-data/phrase-data.service';

@Component({
  selector: 'app-users-liked-box',
  standalone: true,
  imports: [],
  templateUrl: './users-box-dialog.component.html',
  styleUrl: './users-box-dialog.component.css'
})
export class UsersBoxDialogComponent implements OnInit {
  page: number = 0;
  loadBtn: boolean = true;

  array: {id:number, username:string}[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      idContent: number,
      noContent: string,
      requestFunc: Function
    },
    private router: Router,
    private dialog: MatDialog,
    private phraseDataService: PhraseDataService,
  ) { }

  ngOnInit(): void {
    this.load();
  }

  redirectToUserProfile(id: number) {
    this.dialog.closeAll();
    this.router.navigate(['/home/users/' + id]);
  }

  load() {
    this.data.requestFunc(this.data.idContent, this.page).subscribe({
      next: (page: Page<{id: number, username: string}>) => {
        this.array = page.content;
        this.loadBtn = !page.last;
      },
    });
  }

  loadMore() {
    this.page++;
    this.data.requestFunc(this.data.idContent, this.page).subscribe({
      next: (page: Page<{id: number, username: string}>) => {
        console.log(this.page, 'page last: ', page.last);
        this.array = this.array.concat(page.content);
        this.loadBtn = !page.last;
      },
    });
  }
}
