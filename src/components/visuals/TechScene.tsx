import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { useMotionSettings } from "./MotionSettings";
import SceneFallback from "./SceneFallback";

type Variant = "workspace" | "keyboard" | "globe";
const palette = ["#548cff", "#53d9f5", "#8aa5ff", "#74e7b5", "#ffc578"];

function labelTexture(label: string, screen = false) {
  const canvas = document.createElement("canvas");
  canvas.width = screen ? 768 : 192;
  canvas.height = screen ? 480 : 192;
  const context = canvas.getContext("2d")!;
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (screen) {
    context.fillStyle = "#080b21";
    context.fillRect(0, 0, 768, 480);
    context.fillStyle = "#191a39";
    context.fillRect(0, 0, 768, 53);
    ["#fa95ca", "#ffc578", "#74e7b5"].forEach((color, index) => {
      context.fillStyle = color;
      context.beginPath();
      context.arc(26 + index * 25, 26, 6, 0, Math.PI * 2);
      context.fill();
    });
    context.font = "21px monospace";
    context.fillStyle = "#b6bad2";
    context.fillText("jean-jaures@portfolio:~", 245, 33);
    const lines = [
      "$ whoami",
      "KOUASSI Jean-Jaures",
      "$ cat expertise.txt",
      "Systèmes · Réseaux · SecOps",
      "$ echo $OBJECTIF",
      "Alternance @ Île-de-France",
      "> construire. connecter. sécuriser.",
    ];
    lines.forEach((text, index) => {
      context.font = `${index === 1 ? "bold " : ""}25px monospace`;
      context.fillStyle = index % 2 === 0 ? "#a68aff" : "#74e7b5";
      context.fillText(text, 38, 112 + index * 48);
    });
  } else {
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#21172f";
    context.font = `bold ${label.length > 5 ? 24 : 34}px monospace`;
    context.fillText(label, 96, 100);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function buildWorld(scene: THREE.Scene, variant: Variant) {
  const root = new THREE.Group();
  scene.add(root);
  const animated: { object: THREE.Object3D; phase: number; baseY: number }[] =
    [];
  const keys: THREE.Mesh[] = [];
  const metal = new THREE.MeshStandardMaterial({
    color: "#282744",
    metalness: 0.65,
    roughness: 0.32,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: "#151528",
    metalness: 0.3,
    roughness: 0.5,
  });
  const makeBox = (
    w: number,
    h: number,
    d: number,
    material: THREE.Material,
    x: number,
    y: number,
    z: number,
    parent: THREE.Object3D = root,
  ) => {
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(w, h, d, 3, Math.min(0.065, h / 3)),
      material,
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };
  const addLabel = (
    parent: THREE.Object3D,
    label: string,
    size: number,
    position: THREE.Vector3,
    top = false,
  ) => {
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({
        map: labelTexture(label),
        transparent: true,
        depthWrite: false,
      }),
    );
    plane.position.copy(position);
    if (top) plane.rotation.x = -Math.PI / 2;
    parent.add(plane);
  };
  let spinner: THREE.Object3D | undefined;
  if (variant === "globe") {
    const globe = new THREE.Group();
    root.add(globe);
    spinner = globe;
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshStandardMaterial({
        color: "#8074ff",
        metalness: 0.8,
        roughness: 0.2,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
      }),
    );
    globe.add(core);
    for (let index = 0; index < 12; index++) {
      const latitude = (index / 11 - 0.5) * Math.PI * 0.85;
      const radius = Math.cos(latitude) * 1.9;
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.052, 8, 90),
        new THREE.MeshStandardMaterial({
          color:
            index % 3 === 0
              ? "#56d9ef"
              : index % 3 === 1
                ? "#a48aff"
                : "#f6a1cf",
          metalness: 0.6,
          roughness: 0.27,
          emissive: index % 3 === 0 ? "#105165" : "#281142",
          emissiveIntensity: 0.5,
        }),
      );
      ring.rotation.x = Math.PI / 2 + index * 0.026;
      ring.position.y = Math.sin(latitude) * 1.9;
      globe.add(ring);
    }
    globe.rotation.z = -0.3;
    const satellites = new THREE.Group();
    globe.add(satellites);
    for (let index = 0; index < 5; index++) {
      const angle = (index / 5) * Math.PI * 2;
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 12, 12),
        new THREE.MeshBasicMaterial({ color: palette[index] }),
      );
      node.position.set(
        Math.cos(angle) * 2.35,
        Math.sin(angle * 2) * 0.5,
        Math.sin(angle) * 2.35,
      );
      satellites.add(node);
    }
  } else {
    if (variant === "workspace") {
      const platform = new THREE.Mesh(
        new THREE.CylinderGeometry(3.1, 3.25, 0.2, 80),
        metal,
      );
      platform.position.y = -0.55;
      platform.receiveShadow = true;
      root.add(platform);
      const lightRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.1, 0.025, 8, 90),
        new THREE.MeshBasicMaterial({ color: "#9874ff" }),
      );
      lightRing.rotation.x = Math.PI / 2;
      lightRing.position.y = -0.46;
      root.add(lightRing);
      makeBox(2.98, 1.95, 0.18, metal, 0, 1.58, -0.65);
      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(2.75, 1.72),
        new THREE.MeshBasicMaterial({ map: labelTexture("", true) }),
      );
      screen.position.set(0, 1.58, -0.55);
      root.add(screen);
      makeBox(0.16, 0.74, 0.18, metal, 0, 0.3, -0.65);
      makeBox(1.04, 0.08, 0.65, metal, 0, -0.08, -0.65);
      makeBox(0.56, 1.6, 0.92, dark, 2, 0.37, -0.6);
      for (let index = 0; index < 3; index++)
        makeBox(
          0.36,
          0.17,
          0.025,
          new THREE.MeshStandardMaterial({
            color: palette[index],
            emissive: palette[index],
            emissiveIntensity: 0.6,
          }),
          2,
          0.91 - index * 0.35,
          -0.126,
        );
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(2.7, 0.012, 6, 100),
        new THREE.MeshBasicMaterial({
          color: "#6b4fb3",
          transparent: true,
          opacity: 0.65,
        }),
      );
      orbit.position.y = 1;
      orbit.rotation.set(0.3, 0.8, 0.4);
      root.add(orbit);
    }
    const keyboard = new THREE.Group();
    root.add(keyboard);
    keyboard.position.set(
      0,
      variant === "workspace" ? -0.15 : -0.12,
      variant === "workspace" ? 1.1 : 0,
    );
    const labels = [
      "HTML",
      "CSS",
      "JS",
      "TS",
      "PHP",
      "SQL",
      "React",
      "Next",
      "Node",
      "Git",
      "Bash",
      "Linux",
      "DNS",
      "DHCP",
      "VLAN",
      "NAT",
      "VM",
      "Zabbix",
      "Grafana",
      "SecOps",
      "Figma",
      "UI/UX",
      "OVH",
      "Canva",
    ];
    const rows = 4,
      columns = variant === "workspace" ? 10 : 6;
    const size = variant === "workspace" ? 0.22 : 0.56;
    const spacing = size + (variant === "workspace" ? 0.04 : 0.09);
    makeBox(
      columns * spacing + 0.22,
      0.15,
      rows * spacing + 0.22,
      dark,
      0,
      -0.12,
      0,
      keyboard,
    );
    for (let row = 0; row < rows; row++)
      for (let column = 0; column < columns; column++) {
        const index = row * columns + column;
        const color = palette[(row + column * 2) % palette.length];
        const material = new THREE.MeshStandardMaterial({
          color,
          metalness: 0.2,
          roughness: 0.3,
          emissive: color,
          emissiveIntensity: 0.07,
        });
        const key = makeBox(
          size,
          variant === "workspace" ? 0.13 : 0.3,
          size,
          material,
          (column - (columns - 1) / 2) * spacing,
          variant === "workspace" ? 0.015 : 0.08,
          (row - 1.5) * spacing,
          keyboard,
        );
        key.userData.baseY = key.position.y;
        key.userData.label = labels[index % labels.length];
        keys.push(key);
        if (variant === "keyboard")
          addLabel(
            key,
            labels[index],
            size * 0.8,
            new THREE.Vector3(0, 0.155, 0),
            true,
          );
      }
    if (variant === "workspace") {
      ["</>", "TCP/IP", "SEC"].forEach((label, index) => {
        const tile = makeBox(
          0.64,
          0.64,
          0.15,
          new THREE.MeshStandardMaterial({
            color: palette[index],
            metalness: 0.25,
            roughness: 0.3,
          }),
          [-2.35, 2.6, -1.9][index],
          [2.4, 1.9, 0.35][index],
          [-0.9, 0.8, 1.7][index],
        );
        tile.rotation.y = index * 0.3;
        addLabel(tile, label, 0.54, new THREE.Vector3(0, 0, 0.085));
        animated.push({
          object: tile,
          baseY: tile.position.y,
          phase: index * 2,
        });
      });
    }
    root.rotation.y = -0.2;
  }
  const stars = new THREE.BufferGeometry();
  const points = new Float32Array(90 * 3);
  for (let index = 0; index < 90; index++) {
    // A deterministic distribution makes the scene stable between reloads.
    const angle = index * 2.399963;
    const radius = 3.5 + (index % 11) * 0.19;
    points[index * 3] = Math.cos(angle) * radius;
    points[index * 3 + 1] = Math.sin(index * 1.7) * 2.6;
    points[index * 3 + 2] = Math.sin(angle) * radius;
  }
  stars.setAttribute("position", new THREE.BufferAttribute(points, 3));
  scene.add(
    new THREE.Points(
      stars,
      new THREE.PointsMaterial({
        color: "#b99cff",
        size: 0.025,
        transparent: true,
        opacity: 0.6,
      }),
    ),
  );
  return { root, animated, keys, spinner };
}

export default function TechScene({
  variant = "workspace",
  selectedTechnology = "",
  onTechnologySelect,
}: {
  variant?: Variant;
  selectedTechnology?: string;
  onTechnologySelect?: (label: string) => void;
}) {
  const callbackRef = useRef(onTechnologySelect);
  callbackRef.current = onTechnologySelect;
  const selectionRef = useRef(selectedTechnology);
  selectionRef.current = selectedTechnology;
  const applySelectionRef = useRef<((label: string) => void) | null>(null);
  useEffect(() => {
    applySelectionRef.current?.(selectedTechnology);
  }, [selectedTechnology]);
  const hostRef = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionSettings();
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;
  const [state, setState] = useState<"loading" | "ready" | "fallback">(
    "loading",
  );
  const [hoverLabel, setHoverLabel] = useState("");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      if (!context) {
        setState("fallback");
        return;
      }
      renderer = new THREE.WebGLRenderer({
        canvas,
        context,
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      setState("fallback");
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      variant === "workspace" ? 36 : 34,
      1,
      0.1,
      60,
    );
    camera.position.set(
      variant === "globe" ? 4 : 5.9,
      variant === "globe" ? 2 : 5.4,
      variant === "globe" ? 7 : 7.5,
    );
    camera.lookAt(0, variant === "workspace" ? 0.8 : 0, 0);
    scene.add(new THREE.AmbientLight(0xc7c6ff, 2));
    const light = new THREE.DirectionalLight(0xffffff, 3.5);
    light.position.set(4, 7, 6);
    scene.add(light);
    const purple = new THREE.PointLight(0x426cff, 24, 20);
    purple.position.set(-3, 2, 0);
    scene.add(purple);
    const cyan = new THREE.PointLight(0x64d9ff, 18, 20);
    cyan.position.set(3, 2, -3);
    scene.add(cyan);
    const { root, animated, keys, spinner } = buildWorld(scene, variant);
    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let selectedKey: THREE.Mesh | null = null;
    let visible = true,
      disposed = false,
      frame = 0,
      elapsed = 0,
      last = 0;
    let previousEnabled = enabledRef.current;
    let previousLabel = "";
    const resize = () => {
      const width = host.clientWidth,
        height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(host);
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
      },
      { rootMargin: "100px" },
    );
    visibilityObserver.observe(host);
    const applySelection = (label: string) => {
      selectedKey =
        keys.find(
          (key) => key.userData.label.toLowerCase() === label.toLowerCase(),
        ) || null;
      keys.forEach((key) => {
        key.position.y = key.userData.baseY + (key === selectedKey ? 0.2 : 0);
      });
      setHoverLabel(label);
      renderer.render(scene, camera);
    };
    applySelectionRef.current = applySelection;
    applySelection(selectionRef.current);
    const pick = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointer.set(
        ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
        -((event.clientY - bounds.top) / bounds.height) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      return (
        (raycaster.intersectObjects(keys, false)[0]?.object as THREE.Mesh) ||
        null
      );
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabledRef.current) return;
      const key = pick(event);
      if (variant === "keyboard") {
        selectedKey = key;
        const label = key?.userData.label || selectionRef.current;
        if (label !== previousLabel) {
          previousLabel = label;
          setHoverLabel(label);
        }
      }
    };
    const leave = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.set(0, 0);
      previousLabel = "";
      applySelection(selectionRef.current);
    };
    let start: { x: number; y: number; time: number } | null = null;
    const down = (event: PointerEvent) => {
      start = { x: event.clientX, y: event.clientY, time: performance.now() };
    };
    const cancel = () => {
      start = null;
    };
    const up = (event: PointerEvent) => {
      if (variant !== "keyboard" || !start) return;
      const tap =
        Math.hypot(event.clientX - start.x, event.clientY - start.y) < 12 &&
        performance.now() - start.time < 800;
      start = null;
      if (!tap) return;
      const key = pick(event);
      if (key) {
        applySelection(key.userData.label);
        callbackRef.current?.(key.userData.label);
      }
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    host.addEventListener("pointerdown", down);
    host.addEventListener("pointerup", up);
    host.addEventListener("pointercancel", cancel);
    const lost = (event: Event) => {
      event.preventDefault();
      if (!disposed) setState("fallback");
    };
    renderer.domElement.addEventListener("webglcontextlost", lost);
    resize();
    setState("ready");
    const render = (time: number) => {
      if (disposed) return;
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden || time - last < 1000 / 30) return;
      const active = enabledRef.current;
      if (!active && !previousEnabled) return;
      elapsed += active ? Math.min((time - last) / 1000, 0.05) : 0;
      last = time;
      const targetY = active
        ? variant === "globe"
          ? elapsed * 0.14
          : -0.2 + Math.sin(elapsed * 0.35) * 0.1 + pointer.x * 0.16
        : -0.2;
      root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, targetY, 0.06);
      root.rotation.x = THREE.MathUtils.lerp(
        root.rotation.x,
        active ? pointer.y * -0.055 : 0,
        0.06,
      );
      root.position.y = active ? Math.sin(elapsed * 0.7) * 0.055 : 0;
      animated.forEach((item) => {
        item.object.position.y =
          item.baseY + (active ? Math.sin(elapsed + item.phase) * 0.12 : 0);
      });
      keys.forEach((key) => {
        key.position.y = THREE.MathUtils.lerp(
          key.position.y,
          key.userData.baseY + (key === selectedKey ? 0.2 : 0),
          0.16,
        );
      });
      if (spinner)
        spinner.rotation.z =
          -0.3 + (active ? Math.sin(elapsed * 0.2) * 0.1 : 0);
      renderer.render(scene, camera);
      previousEnabled = active;
    };
    frame = requestAnimationFrame(render);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      sizeObserver.disconnect();
      visibilityObserver.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", cancel);
      applySelectionRef.current = null;
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      const textures = new Set<THREE.Texture>();
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.Line
        ) {
          geometries.add(object.geometry);
          const entries = Array.isArray(object.material)
            ? object.material
            : [object.material];
          entries.forEach((material) => {
            materials.add(material);
            const map = (material as THREE.MeshBasicMaterial).map;
            if (map) textures.add(map);
          });
        }
      });
      textures.forEach((texture) => texture.dispose());
      materials.forEach((material) => material.dispose());
      geometries.forEach((geometry) => geometry.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [variant]);

  return (
    <div
      className={`tech-scene tech-scene-${variant}`}
      data-render-state={state}
    >
      <div ref={hostRef} className="webgl-host" aria-hidden="true" />
      {state !== "ready" && <SceneFallback variant={variant} />}
      {variant === "keyboard" && (
        <span className="keyboard-label" aria-hidden="true">
          {hoverLabel || "Un aperçu de ma boîte à outils"}
        </span>
      )}
    </div>
  );
}
