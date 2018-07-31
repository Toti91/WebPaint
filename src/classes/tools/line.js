'use strict';

import { Tool } from "./tool";

export class Line extends Tool {
    constructor(context, contexto) {
        super(context, contexto);
        this.x1,
        this.y1 = 0;

        this.mousedown = ev => {
            this.x0 = ev.offsetX;
            this.y0 = ev.offsetY;
            this.selectedColor = this.context.strokeStyle;
            this.lineWidth = this.context.lineWidth;
            this.started = true;
        };
        
        this.mousemove = ev => {
            if(!this.started) {
                return;
            }
            
            this.context.beginPath();
            this.context.moveTo(this.x0, this.y0);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.context.lineTo(ev.offsetX, ev.offsetY);
			this.context.stroke();
        };
        
        this.mouseup = ev => {
            if(this.started) {
                this.started = false;
            }

            this.x1 = ev.offsetX;
            this.y1 = ev.offsetY;
            this.context.closePath();
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            return this.getShape();
        }

        this.getShape = () => {
            return {
                type: 'line',
                startX: this.x0, 
                startY: this.y0,
                endX: this.x1,
                endY: this.y1,
                color: this.selectedColor,
                lineWidth: this.lineWidth,
                render: (o) => {
                    this.contexto.beginPath();
                    this.contexto.moveTo(o.startX, o.startY);
                    this.contexto.lineTo(o.endX, o.endY);
                    this.contexto.stroke();
                    this.contexto.closePath();
                }
            };
        }
    }
}