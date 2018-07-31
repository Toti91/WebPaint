'use strict';

export class Tool {
    constructor(context, contexto) {
        this.context = context;
        this.contexto = contexto;
        this.canvas = context.canvas;
        this.selectedColor;
        this.lineWidth;
        this.started = false;
        this.x0;
        this.y0;
        this.mousedown;
        this.mousemove;
        this.mouseup;
        this.getShape;
    }
}