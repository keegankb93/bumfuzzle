type ActionEvents = MouseEvent | KeyboardEvent;

export default class Action {
	canvas: HTMLCanvasElement;
	context: CanvasRenderingContext2D | null;
	posX: number;
	posY: number;
	listeners?: ((e: ActionEvents) => void)[] | [];

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		this.posX = 0;
		this.posY = 0;
	}

	static cleanup(canvas: HTMLCanvasElement, events: any) {
		events.forEach((event: any) => {
			canvas.removeEventListener(event.type, event.listener);
		});
	}
}
