import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { customErrorException } from '../../exceptions/customErrorException';
import { Page } from '../../models/page';
import { Phrase } from '../../models/phrase';
import { NotificationService } from '../notification-service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PhraseDataService implements OnInit {
  url: string = 'http://localhost:8080/phrases';
  private myPhrasesSignal: WritableSignal<Phrase[]> = signal([]);
  private followingPhrasesSignal: WritableSignal<Phrase[]> = signal([]);
  private phrases: WritableSignal<Phrase[]> = signal([]);

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void { }

  private requestAllPhrases(): void {
    this.http.get<Page<Phrase>>(
      this.url,
      { headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }
    ).subscribe(
      (page) => {
        this.phrases.set(page.content);
      }
    );
  }

  private requestMyPhrases(): void {
    this.http.get<Page<Phrase>>(
      this.url + '/my-phrases',
      { headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }
    ).subscribe(
      (page) => {
        this.myPhrasesSignal.set(page.content);
      }
    );
  }

  private requestFollowingPhrases(): void {
    this.http.get<Page<Phrase>>(
      this.url + '/following',
      { headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }
    ).subscribe(
      (page) => {
        this.followingPhrasesSignal.set(page.content);
      }
    );
  }

  async likePhrase(phraseId: number) {
    const response = await fetch(`${this.url}/${phraseId}/like`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    const data = await response.json();

    this.myPhrasesSignal.update(phrases => phrases.map(phrase => phrase.id === phraseId ? data : phrase));

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
        this.notificationService.openNotification('Phrase deleted!!');
      },
      error: (err) => {
        this.notificationService.openNotification('Error deleting phrase..');
        throw new customErrorException('Error posting phrase..', err.status);
      }
    });
  }

  createPhrase(phrase: Phrase): void {
    console.log(phrase)
    this.http.post<Phrase>(
      this.url,
      {"text": phrase.text},
      { headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + localStorage.getItem('token')}
      }).subscribe({
      next: (newP) => {
        this.myPhrasesSignal.update(phrases => [...phrases, newP]);
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

  get myPhrases(): WritableSignal<Phrase[]> {
    this.requestMyPhrases();
    console.log('Requesting my phrases', this.myPhrasesSignal())
    return this.myPhrasesSignal;
  }

  get allPhrases(): WritableSignal<Phrase[]> {
    this.requestAllPhrases();
    console.log('Requesting all phrases', this.phrases())
    return this.phrases;
  }

  get followingPhrases(): WritableSignal<Phrase[]> {
    this.requestFollowingPhrases();
    console.log('Requesting following phrases', this.followingPhrasesSignal())
    return this.followingPhrasesSignal;
  }
}
