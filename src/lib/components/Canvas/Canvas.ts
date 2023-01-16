import Brush from './Brush';
import Tool from './Tool';

type CanvasInitializers = {
	target: HTMLDivElement;
	properties: {
		width: number;
		height: number;
	};
};

export default class Canvas {
	node: HTMLCanvasElement;
	private _tools: {
		brush: Brush;
	};
	private _selectedTool: Brush;
	private _currentColor: string;

	constructor(initializers: CanvasInitializers) {
		this.node = this.create(initializers.target, initializers.properties);
		this._currentColor = '#000000';
		this._tools = {
			brush: new Brush(this.node)
		};
		this._selectedTool = this._tools.brush;
	}

	create(target: HTMLDivElement, properties: CanvasInitializers['properties']) {
		const { width, height } = properties;

		const canvas = document.createElement('canvas');
		canvas.width = width;
		canvas.height = height;

		target.appendChild(canvas);
		return canvas;
	}

	get tools() {
		return this._tools;
	}

	get currentColor() {
		return this._currentColor;
	}

	set currentColor(color: string) {
		this._currentColor = color;
	}

	selectTool(tool: 'brush' | 'tool') {
		switch (tool) {
			case 'brush':
				return this._tools.brush;
		}
	}

	updateSelectedToolProperties() {
		this._selectedTool.update(this);
	}
	//clear()
}
