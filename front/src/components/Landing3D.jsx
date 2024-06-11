// src/components/ThreeModelViewer.js
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

        // 카메라 설정
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            2000 // 더 넓은 범위를 볼 수 있도록 far 값을 증가시킵니다.
        );
        camera.position.set(0, 400, 800); // 카메라 위치를 조정하여 모델이 보이도록 합니다.

        const scene = new THREE.Scene();

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight1.position.set(-100, 200, -100).normalize();
        scene.add(directionalLight1);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight2.position.set(100, -200, 100).normalize();
        scene.add(directionalLight2);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight); // 렌더러 크기 조정
        renderer.setClearColor(0x88c9a1); // 캔버스 배경색 설정
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
            renderer.setSize(container.clientWidth, container.clientHeight); // 창 크기 변경 시 렌더러 크기 재조정
        }

        const loader = new GLTFLoader();
        let model;

        loader.load(
            "/models/landingModel/scene.gltf",
            (gltf) => {
                model = gltf.scene;
                scene.add(model);

                model.scale.set(500, 500, 500); // 모델의 크기를 더 크게 조정합니다.
                model.rotation.y = Math.PI;

                // 텍스처가 없는 경우 기본 재질 적용
                model.traverse((node) => {
                    if (node.isMesh) {
                        if (!node.material.map) {
                            node.material = new THREE.MeshStandardMaterial({
                                color: 0x808080,
                            }); // 기본 회색 재질
                        }
                    }
                });
            },
            undefined,
            (error) => {
                console.error("An error happened during model loading:", error);
            }
        );

        // 마우스 이벤트로 모델 회전
        const handleMouseMove = (event) => {
            if (model) {
                const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
                const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

                model.rotation.y = mouseX * Math.PI * 0.35;
                model.rotation.x = -mouseY * Math.PI * 0.35; // 위아래 반전을 없애기 위해 -를 붙임
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
            container.removeChild(renderer.domElement);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            //임시 스타일 지정
            style={{
                width: "100%", // 컨테이너 너비 조정
                height: "300px", // 컨테이너 높이 조정
                position: "absolute", // 절대 위치
                bottom: 0, // 하단에 위치
                left: "50%", // 수평 중앙 정렬
                transform: "translateX(-50%)", // 수평 중앙 정렬 보정
            }}
        />
    );
};

export default ThreeModelViewer;
