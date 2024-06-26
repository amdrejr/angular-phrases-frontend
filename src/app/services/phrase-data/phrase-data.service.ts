import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { customErrorException } from '../../exceptions/customErrorException';
import { Page } from '../../models/page';
import { Phrase } from '../../models/phrase';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PhraseDataService {
  url: string = 'http://localhost:8080/phrases';
  public myPhrases: WritableSignal<Phrase[]> = signal([]);
  public followingPhrases: WritableSignal<Phrase[]> = signal([]);
  public allPhrases: WritableSignal<Phrase[]> = signal([]);
  public isLastPageAllPhrases = signal(false);
  public isLastPageMyPhrases = signal(false);
  public isLastPageFollowingPhrases = signal(false);

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  public init(): void {
    // all phrases
    this.http.get<Page<Phrase>>(
      this.url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {page: '0', size: '10'}
      }
    ).subscribe(
      (page) => {
        this.allPhrases.set(page.content);
        this.isLastPageAllPhrases.set(page.last);
      }
    );
    // my phrases
    this.http.get<Page<Phrase>>(
      this.url + '/my-phrases',
      { headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }
    ).subscribe(
      (page) => {
        this.myPhrases.set(page.content);
        this.isLastPageMyPhrases.set(page.last);
      }
    );
    // following phrases
    this.http.get<Page<Phrase>>(
      this.url + '/following',
      { headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }
    ).subscribe(
      (page) => {
        this.followingPhrases.set(page.content);
        this.isLastPageFollowingPhrases.set(page.last);
      }
    );
  }

  public loadPhrases(page: number = 0, size: number = 10): Observable<Page<Phrase>> {
    return this.http.get<Page<Phrase>>(
      this.url,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {page: page.toString(), size: size.toString()}
      }
    )
  }

  public loadFollowingPhrases(page: number = 0, size: number = 10): Observable<Page<Phrase>> {
    return this.http.get<Page<Phrase>>(
      this.url + '/following',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {page: page.toString(), size: size.toString()}
      }
    )
  }

  public loadMyPhrases(page: number = 0, size: number = 10): Observable<Page<Phrase>> {
    return this.http.get<Page<Phrase>>(
      this.url + '/my-phrases',
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {page: page.toString(), size: size.toString()}
      }
    )
  }

  public requestWhoLiked(phraseId: number, pageNumber: number = 0): Observable<Page<{username: string, id: number}>> {
    return this.http.get<Page<{username: string, id: number}>>(
      `${this.url}/who-liked/${phraseId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        params: {page: pageNumber.toString(), size: '10'}
      }
    );
  };

  async likePhrase(phraseId: number) {
    const response = await fetch(`${this.url}/${phraseId}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    const data = await response.json();

    this.myPhrases.update(phrases => phrases.map(phrase => phrase.id === phraseId ? data : phrase));

    return data;
  }

  deletePhrase(phraseId: number): void {
    this.http.delete<void>(`${this.url}/${phraseId}`,
    {headers: {'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')}})
    .subscribe({
      next: (data) => {
        console.log('deleted', data);
        this.myPhrases().splice(this.myPhrases().findIndex(phrase => phrase.id === phraseId), 1);
        this.allPhrases().splice(this.allPhrases().findIndex(phrase => phrase.id === phraseId), 1);
        this.notificationService.openNotification('Phrase deleted!!');
      },
      error: (err) => {
        this.notificationService.openNotification('Error deleting phrase..');
        throw new customErrorException('Error posting phrase..', err.status);
      }
    });
  }

  createPhrase(phrase: Phrase): void {
    this.http.post<Phrase>(
      this.url,
      {"text": phrase.text},
      { headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }).subscribe({
      next: (newP) => {
        this.myPhrases.update(phrases => [...phrases, newP]);
        this.allPhrases.update(phrases => [...phrases, newP]);
        console.log('Phrase posted!', newP)
        this.notificationService.openNotification('Phrase posted!');
      },
      error: (err) => {
        this.notificationService.openNotification('Error posting phrase..');
        throw new customErrorException('Error posting phrase..', err.status);
      }
    });
  }


  getPhrasesByUserId(userId: number): Observable<Page<Phrase>> {
    return this.http.get<Page<Phrase>>(
      `${this.url}/${userId}`,
      { headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')}
    });
  }

  // get myPhrases(): WritableSignal<Phrase[]> {
  //   this.requestMyPhrases();
  //    console.log('Requesting my phrases', this.myPhrases())
  //    return this.myPhrases;
  //  }

  // get allPhrases(): WritableSignal<Phrase[]> {
  //   this.requestAllPhrases();
  //   console.log('Requesting all phrases', this.phrases())
  //   return this.phrases;
  // }

  // get followingPhrases(): WritableSignal<Phrase[]> {
  //   this.requestFollowingPhrases();
  //   console.log('Requesting following phrases', this.followingPhrasesSignal())
  //   return this.followingPhrasesSignal;
  // }
}
