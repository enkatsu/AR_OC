import { loadGLTF } from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async () => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/QR_bird.mind'
    });
    const { renderer, scene, camera } = mindarThree;

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const raccoon = await loadGLTF('./assets/models/musicband-raccoon/racoon.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, 0, 0);

    const raccoonAncor = mindarThree.addAnchor(0);
    raccoonAncor.group.add(raccoon.scene);

    await mindarThree.start();

    let direction = -1;
    const speed = 0.01;

    renderer.setAnimationLoop(() => {
      // 直線的な動きを追加
      raccoon.scene.position.y += direction * speed;
      raccoon.scene.position.x += direction * speed;
      // 一定距離動いたら方向を反転
      if (raccoon.scene.position.y > 1 || raccoon.scene.position.y < -1) {
        direction *= -1;
      }

      renderer.render(scene, camera);
    });
  }
  start();
});
