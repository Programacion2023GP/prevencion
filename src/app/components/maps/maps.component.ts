import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';
import * as THREE from 'three';
import { fromLonLat, toLonLat } from 'ol/proj';
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
import { toStringHDMS } from 'ol/coordinate';
import {MatExpansionModule} from '@angular/material/expansion';
import { ListboxModule } from 'primeng/listbox';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [MatExpansionModule,ListboxModule,ReactiveFormsModule,CommonModule],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.scss'
})
export class MapsComponent implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @ViewChild('popup', { static: true }) popupElement: ElementRef;
  @ViewChild('popupContent', { static: true }) popupContentElement: ElementRef;
  @ViewChild('popupCloser', { static: true }) popupCloserElement: ElementRef;
    defaultLongitude =-103.4902641178344

    defaultLatitude =25.5696911034653
    clear : any
    dataSelected =[]
    map: Map;
     arrayNew =[]
    options =[]
    constructor(private service :ServiceService<any>) { 
      this.getData()
    }
    
    getData(){
      this.service.Data("map/index").subscribe({
        next:(n)=>{
          n["data"]["result"].forEach((item)=>{
            this.arrayNew.push({
              ids:item.ids,
              nombre:item.nombre,
              conteos:item.conteos,
              coordinates:[item.longitud,item.latitud]
            })
          
          
            this.options.push({
              name:item.nombre,
              code:[item.longitud,item.latitud]
            })

        
            this.options = [...this.options];


          })
         
        },
        complete:()=>{
          this.initializeMap();

        }
      })
    }
    url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    ngOnInit(): void {
      this.clear = document.getElementById("clear").innerHTML
      console.log(this.clear)
    }
    onsSelected(event: any) {
      this.defaultLongitude = event.value.code[0]
      this.defaultLatitude = event.value.code[1]
      this.initializeMap()
      }
    // ngAfterViewInit() {
    //   this.viewer = new Viewer('cesiumContainer'); // 'cesiumContainer' es el ID del contenedor HTML donde se renderizará el mapa
    // }
    
    initializeMap() {
      // Capa de base
      document.getElementById("clear").innerHTML = this.clear
      const map = document.getElementById("map")
      map.innerHTML = ''
      const container = document.getElementById("popup");
      const content = document.getElementById("popup-content")
      const closer = document.getElementById("popup-closer")

      const baseLayer = new TileLayer({
        source: new XYZ({
          url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        })
      });
    
      // Coordenadas de las colonias y número de muertos (ejemplo)
     
      
    console.warn(content)
      // Capa de marcadores con iconos y texto para representar las colonias
      const markerLayer = new VectorLayer({
        source: new VectorSource({
          features: this.arrayNew.map(colonia => {
            return new Feature({
              geometry: new Point(fromLonLat(colonia.coordinates)),
              ids: colonia.ids,

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
              scale: 0.015 // Escala del icono
            }),
            text: new Text({
              text: feature.get('nombre') + '\n' + feature.get('conteos') + ' casos',
              offsetY: -38,
              scale:1.0,
              // Ajusta la posición vertical del texto
              textAlign: 'center',
              fill: new Fill({
                color: 'blue' // Establecer el color del texto en azul fuerte
            }), // Alineación del texto
            })
          });
        }
      });

      // Configuración de la vista
      const view = new View({
        center: fromLonLat([this.defaultLongitude, this.defaultLatitude]), // Centrar el mapa en una ubicación predeterminada
        zoom: 17 // Zoom inicial
      });
      const overlay = new Overlay({
        element:container,
        autoPan:true,
        // autoPanAnimation:{
        //   duration:250
        // }
      })
      // Crear el mapa con las capas y la vista configurada
      this.map = new Map({
        overlays:[overlay],
        target: 'map',
        layers: [baseLayer, markerLayer],
        view: view
      });
      this.map.on('singleclick', (evt) => {
        const coordinate = evt.coordinate;
        const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feature) => feature);
        if (feature) {
            let ids = feature.get('ids');
             ids = ids.split(",")
             const div = document.createElement("div")
             div.classList.add("row","g-4")

             const p = document.createElement("p")
              p.classList.add("text-center","mt-4");
              p.textContent= "Folios"
             div.appendChild(p)
             content.innerHTML = ""
             content.appendChild(div)
            ids.forEach(item=> {this.MapData(item,div)})
            // const conteos = feature.get('conteos');
            // const contenidoHTML = `
            //     <div>
            //         <h3>${nombre}</h3>
            //         <p>Casos: ${conteos}</p>
            //     </div>
            // `;
            // content.innerHTML = contenidoHTML;
            overlay.setPosition(coordinate);
        } else {
            overlay.setPosition(undefined);
        }
    });
    
      closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur(); // Desenfocar el botón de cierre para evitar que reciba eventos de teclado
        return false; // Detener el comportamiento predeterminado del enlace
    };
    
    }

    MapData(id, div) {
      this.service.Data(`map/data/${id}`).subscribe({
        next:(n)=>{
     
          const info = n["data"]["result"][0];
            console.error(info)
            const accordion = document.createElement("div");
            div.appendChild(accordion);
            accordion.classList.add("col-2","mt-1","ml-1","mr-1","mb-1")
            const button = document.createElement("button");
            button.setAttribute("class", "btn btn-primary");
            button.setAttribute("type", "button");
            button.setAttribute("data-bs-toggle", "modal");
            button.setAttribute("data-bs-target", "#exampleModal");
            button.addEventListener("click", () => {
                this.infoSelected(info);
            });
            button.textContent = info.invoice;
            accordion.appendChild(button);
        
        //   const   innerHTML = `
        //   <button click="infoSelected()" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
        //   Button with data-bs-target
        // </button>
        //    <br>
        //   `;
      
          // Actualizar el contenido de popup-content
          accordion.appendChild(button)
          
        }
      })
    }
  
    infoSelected(info) {
      this.dataSelected = [];
      this.dataSelected.push(info)
      console.warn(this.dataSelected)
  }
    
}



