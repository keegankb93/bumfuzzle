type DataItem = {
	val: [number, number];
	priority: number;
};

type Data = DataItem[];

export default class PriorityQueue {
	data: Data;
	constructor() {
		this.data = [];
	}

	enqueue(val: [number, number], priority: number) {
		this.data.push({ val, priority });
		this.sort();
	}

	dequeue() {
		return this.data.shift();
	}

	sort() {
		this.data.sort((a, b) => a.priority - b.priority);
	}
}
