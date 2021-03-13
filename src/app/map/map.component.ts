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

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.getGeoObjects();

    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: [50, 15],
        zoom: 5
      });

      this.map.behaviors.disable('scrollZoom');
      this.map.controls.add('zoomControl');
      this.mapObject.forEach(place => {
        const gps = place.gps.split(',', 2);
        let x = parseFloat(gps[0]);
        let y = parseFloat(gps[1]);

        const placemark = new ymaps.Placemark([x, y]);
        this.map.geoObjects.add(placemark);
      })

    });
  }

  getGeoObjects() {
    this.mapService.getMuseumObjects().subscribe(data => {
      this.mapObject = data;
      console.log(data);
    });
  }
}
