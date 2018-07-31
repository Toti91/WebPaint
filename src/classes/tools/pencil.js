'use strict';

import { Tool } from "./tool";

export class Pencil extends Tool {
    constructor(context, contexto) {
        super(context, contexto);
        this.path;

        this.mousedown = ev => {
            this.path = [];
            this.selectedColor = this.context.strokeStyle;
            this.lineWidth = this.context.lineWidth;
            this.context.beginPath();
            this.x0 = ev.offsetX;
            this.y0 = ev.offsetY;
            this.context.moveTo(ev.offsetX, ev.offsetY);
            this.started = true;
        };
        
        this.mousemove = ev => {
            if(this.started) {
                this.context.lineTo(ev.offsetX, ev.offsetY);
                this.context.stroke();
                this.path.push({x: ev.offsetX, y: ev.offsetY});
            }
        };
        
        this.mouseup = ev => {
            if(this.started) {
                this.started = false;
            }

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return this.getShape();
        }

        this.getShape = () => {
            return {
                type: 'pencil',
                startX: this.x0, 
                startY: this.y0,
                path: this.path,
                color: this.selectedColor,
                lineWidth: this.lineWidth,
                render: (o) => {
                    this.contexto.beginPath();
                    this.contexto.moveTo(o.startX, o.startY);
                    let p = o.path;

                    for (let i = 0; i < p.length; i++) {
                        this.contexto.lineTo(p[i].x, p[i].y);
                    }
                    this.contexto.stroke();
                }
            };
        }
    }
}