Layers.create(() => {
  new Layer({
    id: 'brushify',
    noLoop: true,
    menuDisabled: true,
    type: 'filter',

    menu: {},
    $: {
      smear: []
    },

    setup () {
      // Pick a bunch of random points to smear
      $smear = []
      for (let i = 0; i < 600; i++) {
        const x = random(width)
        const y = random(height)
        const thickness = random(minSize*.01, minSize*.95)

        for (let j = 0; j < thickness; j++) {
          $smear.push({
            x, y,
            height: random(minSize*.3, minSize),
          })
        }
      }
    },

    draw () {
      // Get the points
      $smear.forEach((point, n) => {
        point.color = get(point.x, point.y)
        if (!point.color[3]) {
          delete $smear[n]
        }
      })

      // Smear the points
      strokeWeight(minSize*.001)
      colorMode(RGB)
      $smear.forEach(point => {
        const col = [...point.color]
        // const darken = random(100, 255)
        col[0] += random(-100, 100)
        col[1] += random(-100, 100)
        col[2] += random(-100, 100)
        // col[1] -= darken
        // col[2] -= darken
        // col[3] = 0
        // col[3]=0// -= random(100, 255)

        const gradient = drawingContext.createLinearGradient(point.x, point.y, point.x, point.y-point.height)
        gradient.addColorStop(0, `rgba(${point.color[0]}, ${point.color[1]}, ${point.color[2]}, 0)`)
        gradient.addColorStop(1, `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${col[3]})`)
        drawingContext.strokeStyle = gradient

        drawingContext.beginPath()
        drawingContext.moveTo(point.x, point.y)
        drawingContext.lineTo(point.x, point.y-point.height/3)
        drawingContext.stroke()
      })
      colorMode(...this.colorMode)
    }
  })
})