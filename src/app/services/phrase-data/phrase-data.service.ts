import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Phrase } from '../../models/phrase';

@Injectable({
  providedIn: 'root'
})
export class PhraseDataService {
  url: string = 'http://localhost:8080/phrases';

  constructor(private http: HttpClient) { }

  getPhrases(): Observable<Phrase[]> {
    return this.http.get<Phrase[]>(
      this.url,
      { headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } }
    );
  }

  likePhrase(phraseId: number): Observable<Phrase> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.put<Phrase>(`${this.url}/${phraseId}/like`, {}, { headers: headers });
  }

}
