'use strict';

import { Tool } from './tool';

export class Rectangle extends Tool {
    constructor(context, contexto) {
        super(context, contexto);
        this.x,
        this.y,
        this.w,
        this.h = 0;

        this.mousedown = ev => {
            this.started = true;

            this.selectedColor = this.context.strokeStyle;
            this.lineWidth = this.context.lineWidth;
            this.x0 = ev.offsetX;
            this.y0 = ev.offsetY;
        };

        this.mousemove = ev => {
            if(!this.started) {
                return;
            }

            let x = Math.min(ev.offsetX, this.x0),
                y = Math.min(ev.offsetY, this.y0),
                w = Math.abs(ev.offsetX - this.x0),
                h = Math.abs(ev.offsetY - this.y0);

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            if(!w || !h) {
                return;
            }

            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.context.strokeRect(x, y, w, h);
        };

        this.mouseup = ev => {
            if(!this.started) {
                return;
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.started = false;
            return this.getShape();
        }

        this.getShape = () => {
            return {
                type: 'rect', 
                startX: this.x, 
                startY: this.y, 
                width: this.w, 
                height: this.h,
                color: this.selectedColor,
                lineWidth: this.lineWidth,
                render: (o) => {
                    this.contexto.strokeRect(o.startX, o.startY, o.width, o.height);
                }
            };
        }
    }
}