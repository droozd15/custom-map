import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapService} from './shared/map.service';
import {MapObject} from './shared/map-object.model';

declare var ymaps: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public map: any;
  public mapObject: MapObject[];
  public placeMarks: any[] = [];

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    // this.getGeoObjects();
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
    this.mapService.getMuseumObjects(type).subscribe(data => {
      this.mapObject = data;
      console.log(data);
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
    //this.initMap();

    console.log(this.map.geoObjects);

  }

  removePlaceMark() {
    this.placeMarks.forEach(mark => {
      this.map.geoObjects.remove(mark);
    });
  }
}
