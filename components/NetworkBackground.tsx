'use client'

import { useEffect, useRef } from 'react'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hub: boolean
}

type Packet = {
  a: number // from node index
  b: number // to node index
  t: number // 0..1 progress
  speed: number
}

/**
 * Animated decentralized-network background: nodes drift, links form between
 * nearby nodes, and data packets travel along the links - a visual of blockchain
 * peers relaying messages. Pure canvas, no libraries. Fixed, non-interactive,
 * low opacity so text stays readable. Respects prefers-reduced-motion.
 */
export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    // Theme-aware colors (site is light; accent is emerald green)
    const ACCENT = '0, 168, 150' // #00A896
    const LINE = '90, 107, 100' // muted gray-green

    let width = 0
    let height = 0
    let lastW = -1
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: Node[] = []
    let packets: Packet[] = []
    let raf = 0
    let resizeTimer = 0
    const LINK_DIST = 200

    const rand = (min: number, max: number) => min + Math.random() * (max - min)

    function build() {
      const area = width * height
      const count = Math.max(20, Math.min(72, Math.round(area / 17000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.28, 0.28),
        vy: rand(-0.28, 0.28),
        r: Math.random() < 0.22 ? rand(3.6, 5.4) : rand(1.8, 3),
        hub: false,
      }))
      nodes.forEach((n) => (n.hub = n.r > 3))
      packets = []
    }

    function resize() {
      width = canvas!.clientWidth
      height = canvas!.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Only rebuild nodes when WIDTH changes. On mobile, scrolling collapses the
      // URL bar → height-only resize; rebuilding there reshuffles the whole
      // network and looks like it "breaks". Keep the nodes, just resize the buffer.
      if (width !== lastW) {
        lastW = width
        build()
      }
    }

    // Debounce resize so rapid mobile URL-bar events don't thrash.
    function onResize() {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 150)
    }

    function spawnPacket() {
      if (nodes.length < 2) return
      const a = Math.floor(Math.random() * nodes.length)
      // pick a nearby node as destination
      let best = -1
      let bestD = LINK_DIST * LINK_DIST
      for (let i = 0; i < nodes.length; i++) {
        if (i === a) continue
        const dx = nodes[i].x - nodes[a].x
        const dy = nodes[i].y - nodes[a].y
        const d = dx * dx + dy * dy
        if (d < bestD && Math.random() < 0.5) {
          bestD = d
          best = i
        }
      }
      if (best >= 0) packets.push({ a, b: best, t: 0, speed: rand(0.006, 0.014) })
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, width, height)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const o = (1 - dist / LINK_DIST) * 0.5
            ctx!.strokeStyle = `rgba(${LINE}, ${o})`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx!.fillStyle = n.hub ? `rgba(${ACCENT}, 0.85)` : `rgba(${LINE}, 0.75)`
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    let last = 0
    function frame(now: number) {
      if (!animating) return
      raf = requestAnimationFrame(frame)
      if (now - last < 1000 / 40) return // cap ~40fps
      last = now

      ctx!.clearRect(0, 0, width, height)

      // move nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const o = (1 - dist / LINK_DIST) * 0.5
            const near = dist < LINK_DIST * 0.55
            ctx!.strokeStyle = near ? `rgba(${ACCENT}, ${o})` : `rgba(${LINE}, ${o})`
            ctx!.lineWidth = near ? 1.3 : 1
            ctx!.beginPath()
            ctx!.moveTo(nodes[i].x, nodes[i].y)
            ctx!.lineTo(nodes[j].x, nodes[j].y)
            ctx!.stroke()
          }
        }
      }

      // nodes
      for (const n of nodes) {
        if (n.hub) {
          ctx!.fillStyle = `rgba(${ACCENT}, 0.22)`
          ctx!.beginPath()
          ctx!.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2)
          ctx!.fill()
        }
        ctx!.fillStyle = n.hub ? `rgba(${ACCENT}, 0.9)` : `rgba(${LINE}, 0.8)`
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx!.fill()
      }

      // packets (data flying between peers)
      if (packets.length < nodes.length * 0.8 && Math.random() < 0.3) spawnPacket()
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k]
        p.t += p.speed
        if (p.t >= 1) {
          packets.splice(k, 1)
          continue
        }
        const na = nodes[p.a]
        const nb = nodes[p.b]
        if (!na || !nb) {
          packets.splice(k, 1)
          continue
        }
        const x = na.x + (nb.x - na.x) * p.t
        const y = na.y + (nb.y - na.y) * p.t
        // glowing trail
        ctx!.fillStyle = `rgba(${ACCENT}, 0.22)`
        ctx!.beginPath()
        ctx!.arc(x, y, 7, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.fillStyle = `rgba(${ACCENT}, 1)`
        ctx!.beginPath()
        ctx!.arc(x, y, 2.8, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    let animating = false
    function start() {
      if (reduce || animating || document.hidden) return
      animating = true
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      animating = false
      cancelAnimationFrame(raf)
    }

    // Pause the loop once the user scrolls past the first couple of screens -
    // the canvas is fixed/decorative, so freezing it deep in the page saves
    // main-thread work (better INP / Core Web Vitals). Resume near the top.
    function onScroll() {
      if (window.scrollY > window.innerHeight * 1.5) stop()
      else start()
    }
    function onVisibility() {
      if (document.hidden) stop()
      else onScroll()
    }

    resize()
    if (reduce) {
      drawStatic()
    } else {
      start()
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.7 }}
    />
  )
}
