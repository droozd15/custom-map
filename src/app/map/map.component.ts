import {Component, OnDestroy, OnInit} from '@angular/core';

declare var ymaps: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  public map: any;

  ngOnInit() {
    ymaps.ready().then(() => {
      this.map = new ymaps.Map('map', {
        center: [50.450100, 30.523400],
        zoom: 12
      });
    });
  }
}
