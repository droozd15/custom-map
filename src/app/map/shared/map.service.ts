import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MapObject} from './map-object.model';

@Injectable()
export class MapService {
  private urlMuseum = '../../../assets/lists/museums.json';

  constructor(private http: HttpClient) {
  }

  public getMuseumObjects(): Observable<MapObject[]> {
    return this.http.get<any[]>(this.urlMuseum);
  }
}
