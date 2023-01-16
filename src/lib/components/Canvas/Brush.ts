import type Canvas from './Canvas';
import Draw from './Draw';
import Tool from './Tool';

export default class Brush extends Tool {
	private _strokeWeight: number;
	private _strokeColor: string;
	private _action: Draw;

	constructor(canvas: HTMLCanvasElement, strokeWeight?: number, strokeColor?: string) {
		super(canvas);
		this._strokeWeight = strokeWeight || 3;
		this._strokeColor = strokeColor || '#000000';

		this._action = new Draw(this.canvas);
	}

	get strokeColor() {
		return this._strokeColor;
	}

	set strokeColor(strokeColor: string) {
		this._strokeColor = strokeColor;
		this._action.lineColor = strokeColor;
	}

	get strokeWeight() {
		return this._strokeWeight;
	}

	set strokeWeight(strokeWeight: number) {
		this._strokeWeight = strokeWeight;
	}

	update(canvasObject: Canvas) {
		this._strokeColor = canvasObject.currentColor;
		this._action.lineColor = this._strokeColor;
	}
}
