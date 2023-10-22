const SketchPad = (container, size = 400) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  let paths = [];
  let isDrawing = false;

  canvas.width = size;
  canvas.height = size;
  canvas.style = `
    background-color:white;
    box-shadow: 0px 0px 10px 2px black;
  `;
  container.appendChild(canvas);

  addEventListeners();

  function addEventListeners() {
    canvas.onmousedown = (evt) => {
      const mouse = getMouse(evt);
      paths.push([mouse]);
      isDrawing = true;

      redraw();
    };

    canvas.onmousemove = (evt) => {
      if (isDrawing) {
        const mouse = getMouse(evt);
        const lastPath = paths[paths.length - 1];
        lastPath.push(mouse);

        redraw();
      }
    };

    canvas.onmouseup = (evt) => {
      isDrawing = false;
    };
  }

  function redraw() {
    ctx.clearRect(0, 0, size, size);
    draw.paths(ctx, paths);
  }

  function getMouse(evt) {
    const rect = canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  }

  return {};
};
