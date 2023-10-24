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

  const undoBtn = document.createElement("button");
  undoBtn.innerText = "UNDO";

  container.appendChild(canvas);
  container.appendChild(document.createElement("br"));
  container.appendChild(undoBtn);

  addEventListeners();
  redraw();

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

    document.onmouseup = () => {
      isDrawing = false;
    };

    canvas.ontouchstart = (evt) => {
      const loc = evt.touches[0];
      canvas.onmousedown(loc);
    };

    canvas.ontouchmove = (evt) => {
      const loc = evt.touches[0];
      canvas.onmousemove(loc);
    };

    document.ontouchend = () => {
      canvas.onmouseup();
    };

    undoBtn.onclick = () => {
      paths.pop();
      redraw();
    };
  }

  function redraw() {
    ctx.clearRect(0, 0, size, size);
    draw.paths(ctx, paths);

    if (paths.length > 0) {
      undoBtn.disabled = false;
    } else {
      undoBtn.disabled = true;
    }
  }

  function getMouse(evt) {
    const rect = canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  }

  function getPaths() {
    return paths;
  }

  function reset() {
    paths = [];
    redraw();
  }

  return {
    getPaths,
    reset,
  };
};
