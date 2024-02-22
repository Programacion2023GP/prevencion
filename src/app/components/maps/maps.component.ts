import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import * as THREE from 'three';
import { fromLonLat } from 'ol/proj';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Point } from 'ol/geom';
import { Feature } from 'ol';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Text from 'ol/style/Text';
import Overlay from 'ol/Overlay';
import Fill from 'ol/style/Fill';
import { ServiceService } from 'src/app/service.service';

@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit {
    map: Map;
     arrayNew =[]

    constructor(private service :ServiceService<any>) { 
      this.getData()
    }
    getData(){
      this.service.Data("map/index").subscribe({
        next:(n)=>{
          n["data"]["result"].forEach((item)=>{
            this.arrayNew.push({
              nombre:item.nombre,
              conteos:item.conteos,
              coordinates:[item.longitud,item.latitud]
            })
          })
         
        },
        complete:()=>{
          this.initializeMap();

        }
      })
    }

    ngOnInit(): void {
    }
    // ngAfterViewInit() {
    //   this.viewer = new Viewer('cesiumContainer'); // 'cesiumContainer' es el ID del contenedor HTML donde se renderizará el mapa
    // }
    initializeMap() {
      // Capa de base
      const baseLayer = new TileLayer({
        source: new XYZ({
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      });
    
      // Coordenadas de las colonias y número de muertos (ejemplo)
     
      
    
      // Capa de marcadores con iconos y texto para representar las colonias
      const markerLayer = new VectorLayer({
        source: new VectorSource({
          features: this.arrayNew.map(colonia => {
            return new Feature({
              geometry: new Point(fromLonLat(colonia.coordinates)),
              nombre: colonia.nombre,
              conteos: colonia.conteos
            });
          })
        }),
        style: function(feature) {
          return new Style({
            image: new Icon({
              anchor: [0.5, 1],
              src: 'https://svgsilh.com/svg/1093169.svg', // URL del icono
              scale: 0.03 // Escala del icono
            }),
            text: new Text({
              text: feature.get('nombre') + '\n' + feature.get('conteos') + ' casos',
              offsetY: -68,
              scale:1.3,
              // Ajusta la posición vertical del texto
              textAlign: 'center',
              fill: new Fill({
                color: 'blue' // Establecer el color del texto en azul fuerte
            }), // Alineación del texto
            })
          });
        }
      });
    const defaultLongitude =-103.4989448
    const defaultLatitude =25.5700619
      // Configuración de la vista
      const view = new View({
        center: fromLonLat([defaultLongitude, defaultLatitude]), // Centrar el mapa en una ubicación predeterminada
        zoom: 17 // Zoom inicial
      });
    
      // Crear el mapa con las capas y la vista configurada
      this.map = new Map({
        
        target: 'map',
        layers: [baseLayer, markerLayer],
        view: view
      });
    }
    
    
    
}



