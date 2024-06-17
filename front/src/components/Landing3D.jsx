import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ThreeModelViewer = () => {
    const containerRef = useRef();
    const rendererRef = useRef();

    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            console.error("Canvas container not found!");
            return;
        }

        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            2000
        );
        camera.position.set(0, 800, 800);

        const scene = new THREE.Scene();

        // 조명 세팅
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(-100, 200, -100).normalize();
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(100, -200, 100).normalize();
        scene.add(directionalLight2);

        // 정면 좌우측 조명 추가
        const frontLightLeft = new THREE.DirectionalLight(0xffffff, 0.5);
        frontLightLeft.position.set(-300, 200, 300);
        scene.add(frontLightLeft);

        const frontLightRight = new THREE.DirectionalLight(0xffffff, 0.5);
        frontLightRight.position.set(300, 200, 300);
        scene.add(frontLightRight);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x88c9a1);
        renderer.outputEncoding = THREE.sRGBEncoding;
        rendererRef.current = renderer;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.125;

        window.addEventListener("resize", onWindowResize);

        function onWindowResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        const loader = new GLTFLoader();
        const textureLoader = new THREE.TextureLoader();
        let model;

        const textures = {
            baseColor: textureLoader.load(
                "models/solModel/Sol_color/Sol_Texture5.png",
                (texture) => {
                    texture.encoding = THREE.sRGBEncoding;
                    texture.flipY = false;
                },
                undefined,
                (err) => console.error("Texture loading error:", err)
            ),
            normal: textureLoader.load(
                "models/solModel/Sol_color/Sol_color_normal.png",
                (texture) => {
                    texture.flipY = false;
                },
                undefined,
                (err) => console.error("Texture loading error:", err)
            ),
        };

        loader.load("models/solModel/Sol6.gltf", (gltf) => {
            model = gltf.scene;
            scene.add(model);

            model.scale.set(1000, 1000, 1000);
            model.rotation.y = Math.PI;
            model.position.set(0, -1000, 0); // 모델의 위치를 Y축 기준으로 아래로 이동

            model.traverse((node) => {
                if (node.isMesh) {
                    node.material = new THREE.MeshStandardMaterial({
                        map: textures.baseColor,
                        normalMap: textures.normal,
                    });
                    node.material.needsUpdate = true;
                }
            });
        });

        const handleMouseMove = (event) => {
            if (model) {
                const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

                // 하한선 설정 (예: mouseY가 -0.5 이하로 내려가지 않도록 설정)
                const lowerBound = 0.05;
                if (mouseY < lowerBound) {
                    mouseY = lowerBound;
                }

                model.rotation.y = mouseX * Math.PI * 0.45;
                model.rotation.x = -mouseY * Math.PI * 0.38;
            }
        };

        document.addEventListener("mousemove", handleMouseMove);

        function animate() {
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", onWindowResize);
            controls.dispose();
            renderer.dispose();
            scene.clear();
            if (renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: "400px",
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
            }}
        />
    );
};

export default ThreeModelViewer;
