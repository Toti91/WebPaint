'use strict';

import { Pencil } from './tools/pencil';
import { Rectangle } from './tools/rectangle';
import { Circle } from './tools/circle';
import { Line } from './tools/line';

const canvasTools = {
    PENCIL: 'pencil',
    RECTANGLE: 'rect',
    CIRCLE: 'circle',
    LINE: 'line'
}

export class Draw {
    constructor() {
        this.canvas = document.getElementById('draw');
        this.context = this.canvas.getContext('2d');
        this.tempCanvas = document.createElement('canvas');
        this.tempContext;
        this.selectedTool;
        this.shapes = [];
        this.undos = [];

        this.setCanvasSize();
        this.initCanvas();
        this.initTempCanvas();

        this.tools = {
            [canvasTools.PENCIL]: new Pencil(this.tempContext, this.context),
            [canvasTools.RECTANGLE]: new Rectangle(this.tempContext, this.context),
            [canvasTools.CIRCLE]: new Circle(this.tempContext, this.context),
            [canvasTools.LINE]: new Line(this.tempContext, this.context)
        };

        this.init();
    }
    
    init() {
        this.updateWidth(6);
        this.selectedTool = this.tools['pencil'];
    }

    setCanvasSize() {
        let container = document.getElementById('canv');
        let cRect = container.getBoundingClientRect();

        this.canvas.width = cRect.width;
        this.canvas.height = cRect.height;
    }

    initCanvas() {
        this.tempCanvas.addEventListener('mousedown', this.draw.bind(this), false);
		this.tempCanvas.addEventListener('mousemove', this.draw.bind(this), false);
        this.tempCanvas.addEventListener('mouseup', this.draw.bind(this), false);

        let btns = document.getElementsByClassName('toolselect');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', this.changeTool.bind(this), false);
        }

        document.getElementById('undo').addEventListener('click', this.undo.bind(this), false);
        document.getElementById('redo').addEventListener('click', this.redo.bind(this), false);
        document.getElementById('clear').addEventListener('click', this.clear.bind(this), false);
        document.getElementById('colors').addEventListener('change', this.color.bind(this), false);
        document.getElementById('widths').addEventListener('change', this.width.bind(this), false);
    }

    initTempCanvas() {
        this.tempCanvas.id = 'tempCanvas';
        this.tempCanvas.height = this.canvas.height;
        this.tempCanvas.width = this.canvas.width;
        this.tempContext = this.tempCanvas.getContext('2d');
        this.canvas.parentNode.appendChild(this.tempCanvas);
    }

    updateWidth(width) {
        this.context.lineWidth = width;
        this.tempContext.lineWidth = width;
    }

    updateColor(color) {
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.tempContext.strokeStyle = color;
        this.tempContext.fillStyle = color;
    }

    changeTool(ev) {
        this.selectedTool = this.tools[ev.srcElement.value];
    }

    render() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        let currColor = this.context.strokeStyle;
        let currWidth = this.context.lineWidth;

        for (let i = 0; i < this.shapes.length; i++) {
            let s = this.shapes[i];
            this.updateColor(s.color);
            this.updateWidth(s.lineWidth); 
            s.render(s);
        }

        this.updateColor(currColor);
        this.updateWidth(currWidth);
    }

    draw(ev) {
        let func = this.selectedTool[ev.type];

        if (ev.type === 'mouseup') {
            let shape = func(ev);
            this.shapes.push(shape);
            this.render();
            console.log(this.shapes);
        }
		else if (func){
			func(ev);
        }
        
    }

    color(ev) {
        this.updateColor(ev.srcElement.value);
    }

    width(ev) {
        this.updateWidth(ev.srcElement.value);
    }

    undo() {
        if (!this.shapes.length) {
            return;
        }

        this.undos.push(this.shapes.pop());
        this.render();
    }

    redo() {
        if (!this.undos.length) {
            return;
        }

        this.shapes.push(this.undos.pop());
        this.render();
    }

    clear() {
        if (!this.shapes.length) {
            return;
        }

        this.shapes = [];
        this.undos = [];
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}