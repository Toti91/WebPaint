'use strict';

import { Tool } from './tool';

function oval(x0, y0, x1, y1, ctx) {
    ctx.beginPath();
    ctx.moveTo(x0, y0 + (y1-y0)/2);
    ctx.bezierCurveTo(x0, y0, x1, y0, x1, y0 + (y1-y0)/2);
    ctx.bezierCurveTo(x1, y1, x0, y1, x0, y0 + (y1-y0)/2);
    ctx.closePath();
    ctx.stroke();
}

export class Circle extends Tool {
    constructor(context, contexto) {
        super(context, contexto);
        this.x1,
        this.y1 = 0;

        this.drawOval = function(x, y, ctx, eX = null, eY = null){
            if (eX && eY) {
                oval(x, y, eX, eY, ctx);
                return;
            }

            oval(this.x0, this.y0, x, y, ctx);
        }

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

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawOval(ev.offsetX, ev.offsetY, this.context);
        };

        this.mouseup = ev => {
            if(!this.started) {
                return;
            }

            this.x1 = ev.offsetX;
            this.y1 = ev.offsetY;

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.started = false;
            return this.getShape();
        }

        this.getShape = () => {
            return {
                type: 'circle', 
                startX: this.x0, 
                startY: this.y0,
                endX: this.x1,
                endY: this.y1,
                color: this.selectedColor,
                lineWidth: this.lineWidth,
                render: (o) => {
                    this.drawOval(o.startX, o.startY, this.contexto, o.endX, o.endY);
                }
            };
        }
    }
}