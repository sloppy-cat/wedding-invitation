import { useEffect, useRef } from "react"
import patelUrl from "../../icons/petal.png"
import veilUrl from "../../icons/veil.png"

const X_SPEED = 0.6
const X_SPEED_VARIANCE = 0.8

const Y_SPEED = 0.4
const Y_SPEED_VARIANCE = 0.4

const FLIP_SPEED_VARIANCE = 0.02

// Petal class
class Petal {
  x: number
  y: number
  w: number = 0
  h: number = 0
  opacity: number = 0
  flip: number = 0
  xSpeed: number = 0
  ySpeed: number = 0
  flipSpeed: number = 0

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private petalImg: HTMLImageElement,
  ) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height * 2 - canvas.height

    this.initialize()
  }

  initialize() {
    this.w = 35 + Math.random() * 15
    this.h = 30 + Math.random() * 10
    this.opacity = this.w / 80
    this.flip = Math.random()

    this.xSpeed = X_SPEED + Math.random() * X_SPEED_VARIANCE
    this.ySpeed = Y_SPEED + Math.random() * Y_SPEED_VARIANCE
    this.flipSpeed = Math.random() * FLIP_SPEED_VARIANCE
  }

  draw() {
    if (this.y > this.canvas.height || this.x > this.canvas.width) {
      this.initialize()

      const rand = Math.random() * (this.canvas.width + this.canvas.height)
      if (rand > this.canvas.width) {
        this.x = 0
        this.y = rand - this.canvas.width
      } else {
        this.x = rand
        this.y = 0
      }
    }
    this.ctx.globalAlpha = this.opacity
    this.ctx.drawImage(
      this.petalImg,
      this.x,
      this.y,
      this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
      this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5),
    )
  }

  animate() {
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.flip += this.flipSpeed
    this.draw()
  }
}
class VeilParticle {
  x!: number
  y!: number
  scale!: number
  speed!: number
  sway!: number
  rotation!: number
  rotateSpeed!: number
  alpha!: number

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D,
    private img: HTMLImageElement
  ) {
    this.reset(true)
  }

  reset(initial = false) {
    this.x = Math.random() * this.canvas.width
    this.y = initial ? Math.random() * this.canvas.height : -300

this.scale = 0.28 + Math.random() * 0.32
    this.speed = 0.25 + Math.random() * 0.4
    this.sway = 0.6 + Math.random() * 1.2

    this.rotation = Math.random() * Math.PI * 2
    this.rotateSpeed = (Math.random() - 0.5) * 0.003

this.alpha = 0.28 + Math.random() * 0.22
  }

  animate() {
    this.y += this.speed
    this.rotation += this.rotateSpeed
    this.x += Math.sin(this.y * 0.01) * this.sway

    if (this.y > this.canvas.height + 400) {
      this.reset()
    }

    const ctx = this.ctx
    ctx.save()

    ctx.translate(this.x, this.y)
    ctx.rotate(this.rotation)

    ctx.globalAlpha = this.alpha
    ctx.drawImage(
      this.img,
      -this.img.width * this.scale / 2,
      -this.img.height * this.scale / 2,
      this.img.width * this.scale,
      this.img.height * this.scale
    )

    ctx.restore()
  }
}

export const BGEffect = () => {
  const ref = useRef<HTMLCanvasElement>(null!)
  const particlesRef = useRef<Confetti[]>([])
  const animationFrameIdRef = useRef(0)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext("2d")!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const getCount = () => Math.min(45, Math.floor(window.innerWidth * window.innerHeight / 35000))

    const init = () => {
      const count = getCount()
      particlesRef.current = Array.from({ length: count }, () => new Confetti(canvas, ctx))
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach(p => p.animate())
      animationFrameIdRef.current = requestAnimationFrame(render)
    }

    init()
    render()

    const onResize = () => {
      resize()
      init()
    }

    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return <canvas ref={ref} className="bg-effect" />
}

class Confetti {
  x!: number
  y!: number
  size!: number
  speed!: number
  sway!: number
  alpha!: number
  color!: string

  private colors = [
    "rgba(255,250,240,0.9)",  // 아이보리
    "rgba(200,215,205,0.9)",  // 세이지
    "rgba(245,200,180,0.9)"   // 살구
  ]

  constructor(
    private canvas: HTMLCanvasElement,
    private ctx: CanvasRenderingContext2D
  ) {
    this.reset(true)
  }

  reset(initial = false) {
    this.x = Math.random() * this.canvas.width
    this.y = initial ? Math.random() * this.canvas.height : -20

    this.size = 4 + Math.random() * 6
    this.speed = 0.4 + Math.random() * 0.8
    this.sway = Math.random() * 0.6
    this.alpha = 0.35 + Math.random() * 0.5

    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
  }

  animate() {
    this.y += this.speed
    this.x += Math.sin(this.y * 0.01) * this.sway

    if (this.y > this.canvas.height + 20) {
      this.reset()
    }

    const ctx = this.ctx
    ctx.save()

    ctx.globalAlpha = this.alpha
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }
}
