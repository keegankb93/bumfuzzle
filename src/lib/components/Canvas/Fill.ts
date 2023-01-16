import Action from './Action';
import PriorityQueue from './PriorityQueue';

export default class Fill extends Action {
	private _color: string;

	constructor(canvas: HTMLCanvasElement, color?: string) {
		super(canvas);
		this._color = color || '#000000';
		this.setListeners();
	}

	setListeners() {
		const mousedown = (e: MouseEvent) => this.floodFill(e.clientX, e.clientY);
		this.canvas.addEventListener('mousedown', mousedown);
	}

	floodFill(
		startX: number = this.posX,
		startY: number = this.posY,
		newColor: number[] = [128, 0, 128, 255]
	) {
		const imageData = this.context?.getImageData(0, 0, this.canvas.width, this.canvas.height);
		const data = imageData?.data;

		if (!data) return;

		const stack: [number, number][] = [];
		const currColor = this.getPixelColor(data, startX, startY, this.canvas.width);

		if (this.arraysEqual(currColor, newColor)) return;

		stack.push([startX, startY]);

		while (stack.length) {
			const stackItem: number[] | undefined = stack.pop();

			if (!stackItem) break;

			const [x, y] = stackItem;
			let westX: number = x;
			let eastX: number = x;

			while (
				westX > 0 &&
				this.isWithinTolerance(
					this.getPixelColor(data, westX - 1, y, this.canvas.width),
					currColor,
					254
				)
			) {
				westX--;
			}

			while (
				eastX < this.canvas.width - 1 &&
				this.isWithinTolerance(
					this.getPixelColor(data, eastX + 1, y, this.canvas.width),
					currColor,
					254
				)
			) {
				eastX++;
			}

			for (let i = westX; i <= eastX; i++) {
				this.setPixelColor(data, i, y, newColor);

				if (
					y > 0 &&
					this.isWithinTolerance(
						this.getPixelColor(data, i, y - 1, this.canvas.width),
						currColor,
						254
					)
				) {
					stack.push([i, y - 1]);
				}

				if (
					y < this.canvas.height - 1 &&
					this.isWithinTolerance(
						this.getPixelColor(data, i, y + 1, this.canvas.width),
						currColor,
						254
					)
				) {
					stack.push([i, y + 1]);
				}
			}
		}

		this.context?.putImageData(imageData, 0, 0);
	}

	isWithinTolerance(color1: number[], color2: number[], tolerance: number) {
		return (
			Math.abs(color1[0] - color2[0]) <= tolerance &&
			Math.abs(color1[1] - color2[1]) <= tolerance &&
			Math.abs(color1[2] - color2[2]) <= tolerance &&
			Math.abs(color1[3] - color2[3]) <= tolerance
		);
	}

	arraysEqual(arr1: number[], arr2: number[]) {
		if (arr1.length !== arr2.length) {
			return false;
		}

		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i] !== arr2[i]) {
				return false;
			}
		}

		return true;
	}

	private getPixelColor(data: Uint8ClampedArray, x: number, y: number, width: number) {
		const index = (x + y * width) * 4;
		return [data[index], data[index + 1], data[index + 2], data[index + 3]];
	}

	private setPixelColor(data: Uint8ClampedArray, x: number, y: number, color: number[]) {
		const index = (x + y * this.canvas.width) * 4;
		data[index] = color[0];
		data[index + 1] = color[1];
		data[index + 2] = color[2];
		data[index + 3] = color[3];
	}
}
