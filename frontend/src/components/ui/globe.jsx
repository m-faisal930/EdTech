import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "../../data/globe.json";

extend({ ThreeGlobe: ThreeGlobe });

const RING_PROPAGATION_SPEED = 3;
const aspect = 1.2;
const cameraZ = 300;

// let numbersOfRings = [0];

function GlobeRenderer({ globeConfig = {}, data = [] }) {
    const globeRef = useRef(null);
    const groupRef = useRef();
    const [isInitialized, setIsInitialized] = useState(false);
  
    const defaultProps = {
      pointSize: 1,
      atmosphereColor: "#ffffff",
      showAtmosphere: true,
      atmosphereAltitude: 0.1,
      polygonColor: "rgba(255,255,255,0.7)",
      globeColor: "#d89afc", // pastel purplish-pink base
      emissive: "#a35dfc",   // deep purple glow
      emissiveIntensity: 0.1,
      shininess: 0.9,
      arcTime: 2000,
      arcLength: 0.9,
      rings: 1,
      maxRings: 3,
      ...globeConfig,
    };
  
    useEffect(() => {
      if (!groupRef.current || globeRef.current) return;
  
      globeRef.current = new ThreeGlobe()
        // .globeImageUrl("//unpkg.com/three-globe/example/img/earth.jpg")
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(defaultProps.showAtmosphere)
        .atmosphereColor(defaultProps.atmosphereColor)
        .atmosphereAltitude(defaultProps.atmosphereAltitude)
        .hexPolygonColor(() => defaultProps.polygonColor);
  
      groupRef.current.add(globeRef.current);
      const globeMaterial = globeRef.current.globeMaterial();
      globeMaterial.color = new Color(defaultProps.globeColor);
      globeMaterial.emissive = new Color(defaultProps.emissive);
      globeMaterial.emissiveIntensity = defaultProps.emissiveIntensity;
      globeMaterial.shininess = defaultProps.shininess;

      setIsInitialized(true);
    }, []);
  
    useEffect(() => {
        if (!globeRef.current || !isInitialized || !data.length) return;
      
        let frame = 0;
      
        const interval = setInterval(() => {
          const animatedArcs = data.map((arc, i) => ({
            ...arc,
            order: frame + i // Add some variation
          }));
      
          globeRef.current
            .arcsData(animatedArcs)
            .arcStartLat(d => d.startLat)
            .arcStartLng(d => d.startLng)
            .arcEndLat(d => d.endLat)
            .arcEndLng(d => d.endLng)
            .arcColor(d => d.color)
            .arcAltitude(d => d.arcAlt || 0.2)
            .arcDashLength(defaultProps.arcLength)
            .arcDashGap(15)
            .arcDashAnimateTime(defaultProps.arcTime);
      
          globeRef.current
            .pointsData(data)
            .pointColor(d => d.color)
            .pointsMerge(true)
            .pointAltitude(0.01)
            .pointRadius(2);
      
          frame++;
        }, 2000); // Run every 2 seconds
      
        return () => clearInterval(interval);
      }, [isInitialized, data]);
      
  
    return <group ref={groupRef} />;
  }  

export function WebGLRendererConfig() {
  const { gl, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(window.devicePixelRatio);
    gl.setSize(size.width, size.height);
    gl.setClearColor(0xffaaff, 0);
  }, [gl, size.height, size.width]);

  return null;
}

export function World(props) {
    const { globeConfig = {}, data = [] } = props;
  
    return (
      <Canvas camera={{ position: [0, 0, 300], fov: 45 }}>
        <WebGLRendererConfig />
        <ambientLight intensity={0.6} />
        <directionalLight
          color={globeConfig.directionalLeftLight || "#ffffff"}
          position={[-400, 100, 400]} />
        <directionalLight
          color={globeConfig.directionalTopLight || "#ffffff"}
          position={[-200, 500, 200]} />
        <pointLight
          color={globeConfig.pointLight || "#ffffff"}
          position={[-200, 500, 200]}
          intensity={0.8} />
        <GlobeRenderer globeConfig={globeConfig} data={data} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3} />
      </Canvas>
    );
  }
  

export function hexToRgb(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function genRandomNumbers(min, max, count) {
  const arr = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }

  return arr;
}
