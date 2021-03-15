import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from './shared/map.service';
import {MapObject} from './shared/map-object.model';
import {Subscription} from 'rxjs';

declare var ymaps: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  public map: any;
  mapSubscription$: Subscription;
  public mapObject: MapObject[];
  public placeMarks: any[] = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.initMap();

  }

  initMap() {
    ymaps.ready().then(() => {
      if (this.map) {
        this.map.destroy();
        this.map = null;
      }

      this.map = new ymaps.Map('map', {
        center: [50, 15],
        zoom: 5
      });

      this.map.behaviors.disable('scrollZoom');
      this.map.controls.add('zoomControl');

    });
  }

  getGeoObjects(type: string) {
    if (this.mapSubscription$) {
      this.mapSubscription$.unsubscribe();
    }
    this.mapSubscription$ = this.mapService.getMuseumObjects(type).subscribe(data => {
      this.mapObject = data;
      if (this.mapObject) {
        this.removePlaceMark();
        this.mapObject.forEach(place => {
          const gps = place.gps.split(',', 2);
          let x = parseFloat(gps[0]);
          let y = parseFloat(gps[1]);

          const placemark = new ymaps.Placemark([x, y], {
            balloonContent: place.description
          });
          this.placeMarks.push(placemark);
          this.map.geoObjects.add(placemark);
        });
      }

    });
  }

  removePlaceMark() {
    this.placeMarks.forEach(mark => {
      this.map.geoObjects.remove(mark);
    });
  }

  ngOnDestroy() {
    if (this.mapSubscription$) {
      this.mapSubscription$.unsubscribe();
    }
  }
}
