import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-liked-box',
  standalone: true,
  imports: [],
  templateUrl: './users-box-dialog.component.html',
  styleUrl: './users-box-dialog.component.css'
})
export class UsersBoxDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      title: string,
      array: {id:number, username:string}[],
      noContent: string
    },
    private router: Router,
    private dialog: MatDialog,
  ) { }

  redirectToUserProfile(id: number) {
    this.dialog.closeAll();
    this.router.navigate(['/home/users/' + id]);
  }
}
