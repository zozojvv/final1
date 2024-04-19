import * as THREE from 'three';

export function videoMesh1() {
    const video = document.createElement('video');
    video.src = '/3.mov';
    video.loop = true;
    video.autoplay = true;
    video.muted = true;
    video.load();

    const videoTexture = new THREE.VideoTexture(video);
    const geometry = new THREE.PlaneGeometry(16, 9);
    const material = new THREE.MeshBasicMaterial({ map: videoTexture });
    const videoMesh = new THREE.Mesh(geometry, material);
    videoMesh.scale.set(1/2, 1/2, 1/2);
    videoMesh.visible = false;
    videoMesh.position.set(-2, 5, 0);

    // return {
    //     mesh: videoMesh,
    //     toggleVisibility: function() {
    //         if (videoMesh.visible) {
    //             videoMesh.visible = false;
    //             video.pause();
    //         } else {
    //             videoMesh.visible = true;
    //             video.play();
    //         }
    //     }

    return videoMesh;
}
