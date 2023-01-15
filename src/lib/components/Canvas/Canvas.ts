type CanvasInitializers = {
	target: HTMLDivElement;
	properties: {
		width: number;
		height: number;
	};
};

enum MouseEvents {
	MOUSE_DOWN = 'mousedown',
	MOUSE_MOVE = 'mousemove',
	MOUSE_UP = 'mouseup'
}

export default class Canvas {
	node: HTMLCanvasElement;
	context: CanvasRenderingContext2D | null;
	isDrawing: boolean;
	posX: number;
	posY: number;
	tool: 'brush';
	listeners: ((e: MouseEvent) => void)[];
	strokeWeight: number;
	strokeColor: string | CanvasGradient | CanvasPattern;

	constructor(initializers: CanvasInitializers) {
		this.node = this.create(initializers.target, initializers.properties);
		this.context = this.node.getContext('2d');
		this.isDrawing = false;
		this.posX = 0;
		this.posY = 0;
		this.tool = 'brush';
		this.strokeWeight = 3;
		this.strokeColor = this.context?.strokeStyle || '#000000';
		this.listeners = this.setupListeners();
	}

	create(target: HTMLDivElement, properties: CanvasInitializers['properties']) {
		const { width, height } = properties;

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		target.appendChild(canvas);
		return canvas;
	}

	on<E extends Event>(event: `${MouseEvents}`, callback: (e: E) => void): void {
		const listener = this.node.addEventListener(event, (e: Event) => callback(e as E));
	}

	draw(x1: number, y1: number, x2: number, y2: number) {
		if (this.context === null) return;

		this.context.lineCap = 'round';
		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
	}

	drawStart(offsetX: number, offsetY: number) {
		if (!this.isDrawing) {
			this.posX = offsetX - this.node.offsetLeft;
			this.posY = offsetY - this.node.offsetTop;
			this.isDrawing = true;
		}
	}

	drawMove(offsetX: number, offsetY: number) {
		if (!this.isDrawing) return;

		this.draw(this.posX, this.posY, offsetX - this.node.offsetLeft, offsetY - this.node.offsetTop);
		this.posX = offsetX - this.node.offsetLeft;
		this.posY = offsetY - this.node.offsetTop;
	}

	drawStop(offsetX: number, offsetY: number) {
		if (!this.isDrawing) return;
		this.draw(this.posX, this.posY, offsetX - this.node.offsetLeft, offsetY - this.node.offsetTop);
		this.posX = 0;
		this.posY = 0;
		this.isDrawing = false;
	}

	toolCallbacks() {
		return {
			brush: {
				mousedown: (e: MouseEvent) => this.drawStart(e.offsetX, e.offsetY),
				mousemove: (e: MouseEvent) => this.drawMove(e.offsetX, e.offsetY),
				mouseup: (e: MouseEvent) => this.drawStop(e.offsetX, e.offsetY)
			}
		};
	}

	setupListeners() {
		const mouseDown = (e: MouseEvent) => this.toolCallbacks().brush.mousedown(e);
		const mouseMove = (e: MouseEvent) => this.toolCallbacks().brush.mousemove(e);
		const mouseUp = (e: MouseEvent) => this.toolCallbacks().brush.mouseup(e);

		this.on<MouseEvent>('mousedown', mouseDown);
		this.on<MouseEvent>('mousemove', mouseMove);
		this.on<MouseEvent>('mouseup', mouseUp);

		return [mouseDown, mouseMove, mouseUp];
	}

	setTool(tool: 'brush') {
		this.tool = tool;
	}

	setStrokeWeight(weight: number) {
		if (this.context === null) return;
		this.context.lineWidth = weight;
	}

	//clear()
}
