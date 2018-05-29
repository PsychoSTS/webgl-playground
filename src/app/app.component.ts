import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { EventsService } from './services/events.service';
import { WebglDetectorService } from './services/webgl-detector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;

  private cube: THREE.Mesh;

  constructor(
    private eventService: EventsService,
    private detectorService: WebglDetectorService
  ) {
    const aspect = window.innerWidth / window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  ngOnInit() {

    if (this.detectorService.webgl) {
      this.start();
    } else {
      const warning = this.detectorService.getWebGLErrorMessage();
      return document.querySelector('#viewport').appendChild(warning);
    }

    document.querySelector('#viewport').appendChild(this.renderer.domElement);

    this.eventService.update.subscribe(deltaTime => this.update(deltaTime));

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;
  }

  private start() {
    this.eventService.start();
  }

  private animateCube() {
    this.cube.rotation.x += 0.1;
    this.cube.rotation.z += 0.1;
  }

  update(deltaTime: number) {
    this.animateCube();
    this.renderer.render(this.scene, this.camera);
  }
}
