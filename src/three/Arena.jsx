import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';
import { roleList } from '../data/roles.js';

// Regulation table, in meters.
const L = 2.74;
const W = 1.525;
const TOP = 0.76;
const BALL_R = 0.02;
const HALF = L / 2;

const ZONE_W = W / 3 - 0.03;
const ZONE_Z = -0.72; // centre of the far half
const ZONE_D = 1.0;
const zoneX = (i) => (i - 1) * (W / 3);

// Orbit camera around the table.
const ORBIT_TARGET = new THREE.Vector3(0, TOP + 0.22, -0.1);
const ORBIT_R = 4.5;
const AZ0 = 0.32; // radians; slightly off the near end
const EL0 = 0.55;

const rand = (a, b) => a + Math.random() * (b - a);
const ONE = new THREE.Vector3(1, 1, 1);
const NEAR_OFF = new THREE.Vector3(0.06, 0, 0.04);
const FAR_OFF = new THREE.Vector3(-0.06, 0, -0.04);
const tmpP = new THREE.Vector3();

const setCursor = (state) => window.dispatchEvent(new CustomEvent('cursor', { detail: state }));

/** Typical rally spin, in revolutions per second; a heavy loop now and then. */
const spin = () => Math.round(Math.random() < 0.85 ? rand(50, 100) : rand(100, 180));

/**
 * One shot: hitter -> bounce on the other half -> next hitter.
 * The ball travels in a straight line when seen from above (no side spin),
 * so the bounce point always sits on the line between the two hit points.
 */
function makeShot(from, towardFar, target) {
  const sign = towardFar ? -1 : 1;
  const toZ = sign * (HALF + rand(0.15, 0.35));
  let bounce;
  let to;
  if (target) {
    bounce = target.clone();
    const t = (toZ - bounce.z) / (bounce.z - from.z);
    to = new THREE.Vector3(bounce.x + (bounce.x - from.x) * t, rand(0.92, 1.02), toZ);
  } else {
    const toX = rand(-0.55, 0.55);
    const bz = sign * rand(0.35, 1.15);
    const f = (bz - from.z) / (toZ - from.z);
    bounce = new THREE.Vector3(from.x + (toX - from.x) * f, TOP + BALL_R, bz);
    to = new THREE.Vector3(toX, rand(0.92, 1.02), toZ);
  }
  const speed = target ? 4.2 : rand(4.6, 6.4); // animation clock, not real-world m/s
  return {
    from: from.clone(),
    bounce,
    to,
    t1: from.distanceTo(bounce) / speed,
    t2: bounce.distanceTo(to) / speed,
    h1: target ? 0.18 : rand(0.1, 0.22),
    h2: rand(0.14, 0.26),
    t: 0,
    towardFar,
    serve: !!target,
    kmh: Math.round(rand(40, 95)),
    rps: spin(),
  };
}

function arc(a, b, h, s, out) {
  out.lerpVectors(a, b, s);
  out.y += 4 * h * s * (1 - s);
  return out;
}

/** Court label painted onto the table surface. */
function useZoneTexture(role) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = Math.round(256 * (ZONE_D / ZONE_W));
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, []);

  useEffect(() => {
    let alive = true;
    const draw = () => {
      if (!alive) return;
      const c = tex.image;
      const g = c.getContext('2d');
      const { width: w, height: h } = c;
      g.clearRect(0, 0, w, h);
      g.fillStyle = role.hex + '38';
      g.fillRect(0, 0, w, h);
      g.strokeStyle = role.hex;
      g.lineWidth = 8;
      g.setLineDash([22, 14]);
      g.strokeRect(6, 6, w - 12, h - 12);
      g.setLineDash([]);
      g.textAlign = 'center';
      g.fillStyle = '#ffffff';
      // Fit text inside the lane with some padding.
      const fit = (text, weight, max, maxW) => {
        let size = max;
        do {
          g.font = `${weight} ${size}px Unbounded, sans-serif`;
        } while (g.measureText(text).width > maxW && --size > 10);
      };
      fit(role.court, 900, 96, w * 0.7);
      g.globalAlpha = 0.85;
      g.fillText(role.court, w / 2, h * 0.42);
      g.globalAlpha = 1;
      fit(role.label.toUpperCase(), 800, 40, w * 0.8);
      g.fillText(role.label.toUpperCase(), w / 2, h * 0.56);
      g.fillStyle = role.hex;
      g.font = '700 20px "JetBrains Mono", monospace';
      g.fillText('CLICK TO SERVE', w / 2, h * 0.7);
      tex.needsUpdate = true;
    };
    draw();
    // Redraw once the web fonts are ready.
    Promise.all([document.fonts.load('800 40px Unbounded'), document.fonts.load('700 20px "JetBrains Mono"')]).then(draw, draw);
    return () => {
      alive = false;
    };
  }, [role, tex]);

  return tex;
}

function Table() {
  const lineMat = <meshStandardMaterial color="#f4f7ff" roughness={0.4} />;
  const y = TOP + 0.0006;
  const lw = 0.02;
  return (
    <group>
      <mesh position={[0, TOP - 0.015, 0]} castShadow receiveShadow>
        <boxGeometry args={[W, 0.03, L]} />
        <meshStandardMaterial color="#1f5fe0" roughness={0.55} metalness={0.05} />
      </mesh>
      <mesh position={[0, y, 0]}><boxGeometry args={[0.004, 0.001, L - 0.04]} />{lineMat}</mesh>
      {[-1, 1].map((s) => (
        <mesh key={`e${s}`} position={[0, y, s * (HALF - lw / 2)]}><boxGeometry args={[W, 0.001, lw]} />{lineMat}</mesh>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={`s${s}`} position={[s * (W / 2 - lw / 2), y, 0]}><boxGeometry args={[lw, 0.001, L]} />{lineMat}</mesh>
      ))}
      {[[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => (
        <mesh key={`${sx}${sz}`} position={[sx * (W / 2 - 0.12), (TOP - 0.03) / 2, sz * (HALF - 0.3)]} castShadow>
          <boxGeometry args={[0.05, TOP - 0.03, 0.05]} />
          <meshStandardMaterial color="#0d1220" metalness={0.6} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[0, TOP - 0.07, 0]}>
        <boxGeometry args={[W - 0.2, 0.05, L - 0.5]} />
        <meshStandardMaterial color="#0d1220" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, TOP + 0.1525 / 2, 0]}>
        <planeGeometry args={[W + 0.3, 0.1525]} />
        <meshStandardMaterial color="#0a0f1c" transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, TOP + 0.1525, 0]}>
        <boxGeometry args={[W + 0.3, 0.012, 0.004]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={`p${s}`} position={[s * (W / 2 + 0.15), TOP + 0.08, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.17, 12]} />
          <meshStandardMaterial color="#1b2333" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Paddle({ color, paddleRef }) {
  return (
    <group ref={paddleRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.078, 0.078, 0.012, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.11, 0]}>
        <boxGeometry args={[0.028, 0.1, 0.022]} />
        <meshStandardMaterial color="#c79a62" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Zone({ role, i, hover, setHover, onPick, picked }) {
  const mat = useRef();
  const tex = useZoneTexture(role);
  useFrame((state) => {
    if (!mat.current) return;
    const active = hover === role.id || picked === role.id;
    const target = active ? 1 : 0.55 + 0.1 * Math.sin(state.clock.elapsedTime * 2 + i);
    mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, target, 0.15);
  });
  return (
    <mesh
      position={[zoneX(i), TOP + 0.002, ZONE_Z]}
      rotation={[-Math.PI / 2, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(role.id);
        setCursor('hover');
      }}
      onPointerOut={() => {
        setHover(null);
        setCursor('grab');
      }}
      onClick={(e) => {
        // Ignore the click that ends a drag-rotate.
        if (e.delta > 6) return;
        e.stopPropagation();
        onPick(role.id);
      }}
    >
      <planeGeometry args={[ZONE_W, ZONE_D]} />
      <meshBasicMaterial ref={mat} map={tex} transparent opacity={0.6} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function Rally({ serve, onShot, onLanded }) {
  const ball = useRef();
  const mark = useRef();
  const markMat = useRef();
  const near = useRef();
  const far = useRef();
  const shot = useRef(null);
  const rally = useRef(0);
  const landed = useRef(false);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const nearTarget = useMemo(() => new THREE.Vector3(0.2, 0.98, HALF + 0.25), []);
  const farTarget = useMemo(() => new THREE.Vector3(-0.2, 0.98, -HALF - 0.25), []);

  const start = (s) => {
    shot.current = s;
    landed.current = false;
    rally.current = s.serve ? 1 : rally.current + 1;
    onShot?.({ kmh: s.kmh, rps: s.rps, rally: rally.current });
    (s.towardFar ? farTarget : nearTarget).copy(s.to);
  };

  useEffect(() => {
    start(makeShot(new THREE.Vector3(0.2, 0.98, HALF + 0.25), true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!serve) return;
    const i = roleList.findIndex((r) => r.id === serve);
    const from = new THREE.Vector3(zoneX(i) * 0.4, 0.98, HALF + 0.2);
    nearTarget.copy(from);
    if (near.current) near.current.position.copy(from).add(NEAR_OFF);
    start(makeShot(from, true, new THREE.Vector3(zoneX(i), TOP + BALL_R, ZONE_Z)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serve]);

  useFrame((_, dt) => {
    const s = shot.current;
    if (!s || !ball.current) return;
    s.t += Math.min(dt, 1 / 30);

    if (s.t < s.t1) {
      arc(s.from, s.bounce, s.h1, s.t / s.t1, tmp);
    } else {
      if (!landed.current) {
        landed.current = true;
        mark.current.position.set(s.bounce.x, TOP + 0.003, s.bounce.z);
        mark.current.scale.setScalar(0.2);
        markMat.current.opacity = 1;
        if (s.serve) onLanded?.();
      }
      const u = Math.min((s.t - s.t1) / s.t2, 1);
      arc(s.bounce, s.to, s.h2, u, tmp);
      if (u >= 1 && !s.serve) start(makeShot(s.to, !s.towardFar));
    }
    ball.current.position.copy(tmp);

    // Hawk-Eye bounce mark expands and fades.
    mark.current.scale.lerp(ONE, 0.08);
    markMat.current.opacity = Math.max(0, markMat.current.opacity - dt * 0.6);

    near.current.position.lerp(tmpP.copy(nearTarget).add(NEAR_OFF), 0.06);
    far.current.position.lerp(tmpP.copy(farTarget).add(FAR_OFF), 0.06);
  });

  return (
    <>
      <Trail width={0.7} length={3} color="#ffb37a" attenuation={(w) => w * w} decay={1.2}>
        <mesh ref={ball} castShadow>
          <sphereGeometry args={[BALL_R, 24, 24]} />
          <meshStandardMaterial color="#ff6a1a" emissive="#ff4a00" emissiveIntensity={0.9} roughness={0.35} />
        </mesh>
      </Trail>
      <mesh ref={mark} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.03, 0.045, 40]} />
        <meshBasicMaterial ref={markMat} color="#ffffff" transparent opacity={0} depthWrite={false} />
      </mesh>
      <Paddle paddleRef={near} color="#e8243f" />
      <Paddle paddleRef={far} color="#19c37d" />
    </>
  );
}

/** Drag to orbit 360°, with a little inertia. Pushes in on the picked court when serving. */
function CameraRig({ serve, orbit }) {
  const { camera } = useThree();
  const look = useMemo(() => ORBIT_TARGET.clone(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const pos = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const o = orbit.current;
    if (serve) {
      const i = roleList.findIndex((r) => r.id === serve);
      pos.set(zoneX(i) * 0.5, 1.15, 0.55);
      lookTarget.set(zoneX(i), TOP, ZONE_Z);
      camera.position.lerp(pos, 0.045);
    } else {
      if (!o.dragging) {
        o.az += o.vAz;
        o.el += o.vEl;
        o.vAz *= 0.93;
        o.vEl *= 0.9;
      }
      o.el = THREE.MathUtils.clamp(o.el, 0.18, 1.2);
      pos.set(
        ORBIT_TARGET.x + ORBIT_R * Math.sin(o.az) * Math.cos(o.el),
        ORBIT_TARGET.y + ORBIT_R * Math.sin(o.el),
        ORBIT_TARGET.z + ORBIT_R * Math.cos(o.az) * Math.cos(o.el)
      );
      lookTarget.copy(ORBIT_TARGET);
      camera.position.lerp(pos, o.dragging ? 0.35 : 0.12);
    }
    look.lerp(lookTarget, 0.08);
    camera.lookAt(look);
  });
  return null;
}

export default function Arena({ hover, setHover, serve, onPick, onShot, onLanded }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  const orbit = useRef({ az: AZ0, el: EL0, vAz: 0, vEl: 0, dragging: false, x: 0, y: 0 });

  useEffect(() => {
    const el = wrap.current;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);

    const o = orbit.current;
    const down = (e) => {
      if (e.button !== 0) return;
      o.dragging = true;
      o.x = e.clientX;
      o.y = e.clientY;
      o.vAz = o.vEl = 0;
      setCursor('drag');
    };
    const move = (e) => {
      if (!o.dragging) return;
      const dx = e.clientX - o.x;
      const dy = e.clientY - o.y;
      o.x = e.clientX;
      o.y = e.clientY;
      // Drag right -> the table turns right, like spinning it with your hand.
      o.vAz = -dx * 0.006;
      o.vEl = dy * 0.004;
      o.az += o.vAz;
      o.el += o.vEl;
    };
    const up = () => {
      if (!o.dragging) return;
      o.dragging = false;
      setCursor(el.matches(':hover') ? 'grab' : null);
    };
    const enter = () => !o.dragging && setCursor('grab');
    const leave = () => !o.dragging && setCursor(null);

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointerleave', leave);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      io.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointerleave', leave);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      setCursor(null);
    };
  }, []);

  return (
    <div ref={wrap} className="arena-canvas" style={{ touchAction: 'none' }}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [1.0, 2.4, 3.0], fov: 38, near: 0.05, far: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ scene }) => {
          scene.background = new THREE.Color('#05070c');
          scene.fog = new THREE.Fog('#05070c', 4.5, 12);
        }}
      >
        <ambientLight intensity={0.3} />
        <spotLight position={[0, 5, 0.2]} angle={0.6} penumbra={0.6} intensity={60} castShadow shadow-mapSize={[512, 512]} color="#eaf0ff" />
        <pointLight position={[-3, 1.2, -2]} intensity={6} color="#ff3b5c" />
        <pointLight position={[3, 1.2, -2]} intensity={6} color="#a78bfa" />
        <pointLight position={[0, 1.5, -3.5]} intensity={5} color="#22d3ee" />

        <Table />
        {roleList.map((r, i) => (
          <Zone key={r.id} role={r} i={i} hover={hover} setHover={setHover} onPick={onPick} picked={serve} />
        ))}
        <Rally serve={serve} onShot={onShot} onLanded={onLanded} />
        <CameraRig serve={serve} orbit={orbit} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#0a0d16" roughness={0.75} metalness={0.3} />
        </mesh>
      </Canvas>
    </div>
  );
}
