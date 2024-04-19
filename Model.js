import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler'

import {
	Color,
	AnimationMixer,
	PointsMaterial,
	Points,
	MeshMatcapMaterial,
	TextureLoader,
	Vector3,
	BufferGeometry,
	Float32BufferAttribute,
	AdditiveBlending,
	MeshBasicMaterial,
	Group,
	Mesh,
} from 'three'

// monitor model
export class monitorModel {
	constructor(scene) {
		this.scene = scene;
		this.file = '/monitor.glb';
		this.loader = new GLTFLoader();
		this.mesh = null; // pass to main.js
		this.init();
	}
    init() {
        this.loader.load(this.file, (glb) => {
			// console.log(glb.scene)

			//rotate 
			glb.scene.scale.set(1/200, 1/200, 1/200); 
			glb.scene.position.set(6, 7, -3);

            this.scene.add(glb.scene);
			this.mesh = glb.scene; 
			console.log('monitor loaded:3');
        }, undefined, function (error) {
            console.error('eRrOR', error);
        });
    }

}

export class emptyRoom {
    constructor(scene) {
        this.scene = scene;
		this.file = '/emptyScene.glb';
        this.loader = new GLTFLoader();
		this.init();
    }

	init() {
        this.loader.load(this.file, (glb) => {
			glb.scene.scale.set(2, 2, 2); 
            this.scene.add(glb.scene);
			glb.scene.position.set(-40, -0, 0);
            console.log("room loaded!");
        }, undefined, function (error) {
            console.error('error loading the room:', error);
        });
    }

}

