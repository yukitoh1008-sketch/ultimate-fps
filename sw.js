// tools/make_offline_app.py が作る。手で直さない
// 中身を全部覚えておき、いつも覚えた中身から開く（通信なし・PCなしでも起動できる）。
// PC とつながっているときにこのファイルが変わっていたら、新しい中身をまるごと覚え直して入れ替える
const CACHE = 'ufps-fb95d991368d';
const FILES = ["./", "./index.html", "./match.html", "./game.html", "./practice.html", "./vendor/three/build/three.module.js", "./vendor/three/examples/jsm/loaders/GLTFLoader.js", "./vendor/three/examples/jsm/utils/SkeletonUtils.js", "./vendor/three/examples/jsm/utils/BufferGeometryUtils.js", "./assets/mocap/rig_rest.json", "./assets/vroid/vroid_f.vrm", "./assets/vroid/vroid_l.vrm", "./assets/vroid/vroid_m.vrm", "./assets/ui/keyvisual_a.jpg", "./assets/ui/keyvisual_team.jpg", "./assets/fonts/Oswald-Bold.ttf", "./assets/fonts/OFL.txt", "./assets/face/face_C.glb", "./assets/face/face_V.glb", "./assets/face/face_X.glb", "./assets/face/face_Y.glb", "./assets/face/face_Z.glb", "./assets/face/glasses_V.glb", "./assets/hair/vroid_hair1.glb", "./assets/hair/vroid_hair2.glb", "./assets/hair/vroid_hair3.glb", "./assets/hair/vroid_hair4.glb", "./assets/hair/vroid_hair5.glb", "./assets/hair/vroid_hair6.glb", "./assets/hair/vroid_hair_m1.glb", "./assets/hair/vroid_hair_m2.glb", "./assets/hair/vroid_hair_m3.glb", "./assets/hair/vroid_hair_m4.glb", "./assets/hair/vroid_hair_sC.glb", "./assets/hair/vroid_hair_sV.glb", "./assets/hair/vroid_hair_sX.glb", "./assets/hair/vroid_hair_sY.glb", "./assets/hair/vroid_hair_sZ.glb", "./assets/uniform/shirt_base.png", "./assets/uniform/font_atlas.png", "./assets/uniform/font_atlas.json", "./assets/uniform/OFL_Oswald.txt", "./assets/mocap/clip_backhand.json", "./assets/mocap/clip_catch.json", "./assets/mocap/clip_catch_2.json", "./assets/mocap/clip_catch_3.json", "./assets/mocap/clip_forehand.json", "./assets/mocap/clip_hold_fb.json", "./assets/mocap/clip_hold_fh.json", "./assets/mocap/clip_hold_hb.json", "./assets/mocap/clip_jump_catch.json", "./assets/mocap/clip_throw_backhand.json", "./assets/mocap/clip_throw_forehand.json", "./assets/mocap/loco_backpedal.json", "./assets/mocap/loco_defense_idle.json", "./assets/mocap/loco_idle.json", "./assets/mocap/loco_jog.json", "./assets/mocap/loco_sprint.json", "./assets/mocap/loco_strafe_left.json", "./assets/mocap/loco_strafe_right.json", "./assets/mocap/once_celebrate.json", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png", "./manifest.webmanifest"];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('ufps-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(caches.open(CACHE).then((c) => c.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req))));
});
