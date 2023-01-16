import Action from './Action';

enum DrawEvents {
	MouseDown = 'mousedown',
	MouseMove = 'mousemove',
	MouseUp = 'mouseup',
	MouseLeave = 'mouseleave'
}

export default class Draw extends Action {
	isDrawing: boolean;
	private _lineColor: string | CanvasGradient | CanvasPattern;
	private _lineWidth: number;

	constructor(
		canvas: HTMLCanvasElement,
		lineColor?: string | CanvasGradient | CanvasPattern,
		lineWidth?: number
	) {
		super(canvas);
		this._lineColor = lineColor || '#000000';
		this._lineWidth = lineWidth || 3;
		this.setListeners();
		this.isDrawing = false;
	}

	get lineColor() {
		return this._lineColor;
	}

	set lineColor(lineColor: string | CanvasGradient | CanvasPattern) {
		this._lineColor = lineColor;
	}

	get lineWidth() {
		return this._lineWidth;
	}

	set lineWidth(lineWidth: number) {
		this._lineWidth = lineWidth;
	}

	handleMouseDown(e: MouseEvent) {
		this.start(e.clientX, e.clientY);
	}

	handleMouseMove(e: MouseEvent) {
		this.move(e.clientX, e.clientY);
	}

	handleMouseUp(e: MouseEvent) {
		this.stop(e.clientX, e.clientY);
	}

	handleMouseLeave(e: MouseEvent) {
		this.stop(e.clientX, e.clientY);
	}

	setListeners() {
		Object.values(DrawEvents).forEach((event) => {
			switch (event) {
				case DrawEvents.MouseDown:
					this.canvas.addEventListener(event, this.handleMouseDown.bind(this));
					break;
				case DrawEvents.MouseMove:
					this.canvas.addEventListener(event, this.handleMouseMove.bind(this));
					break;
				case DrawEvents.MouseUp:
					this.canvas.addEventListener(event, this.handleMouseUp.bind(this));
					break;
				case DrawEvents.MouseLeave:
					this.canvas.addEventListener(event, this.handleMouseUp.bind(this));
					break;
			}
		});
	}

	draw(x1: number, y1: number, x2: number, y2: number) {
		if (this.context === null) return;

		this.context.lineCap = 'round';
		this.context.globalCompositeOperation = 'source-over';
		this.context.strokeStyle = this.lineColor;
		this.context.lineWidth = 8; //this.lineWidth;
		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
	}

	start(clientX: number, clientY: number) {
		if (!this.isDrawing) {
			this.posX = clientX - this.canvas.offsetLeft;
			this.posY = clientY - this.canvas.offsetTop;
			this.isDrawing = true;
		}
	}

	move(clientX: number, clientY: number) {
		if (!this.isDrawing) return;

		this.draw(
			this.posX,
			this.posY,
			clientX - this.canvas.offsetLeft,
			clientY - this.canvas.offsetTop
		);
		this.posX = clientX - this.canvas.offsetLeft;
		this.posY = clientY - this.canvas.offsetTop;
	}

	stop(clientX: number, clientY: number) {
		if (!this.isDrawing) return;
		this.draw(
			this.posX,
			this.posY,
			clientX - this.canvas.offsetLeft,
			clientY - this.canvas.offsetTop
		);
		this.posX = 0;
		this.posY = 0;
		this.isDrawing = false;
	}
}
