type NestedObject = { [key: string]: any };

export function pluck(obj: NestedObject, path: string): any {
	const keys = path.split('.');
	let result: any = obj;

	for (const key of keys) {
		result = result[key];

		if (result === undefined || result === null) {
			return undefined; // Return undefined if the path does not exist
		}
	}

	return result;
}
