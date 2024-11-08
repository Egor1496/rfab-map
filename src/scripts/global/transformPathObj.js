export const transformPathObj = (obj, name) => ({
	n: name,
	l: obj.map((el) => ({
		t: el.top,
		l: el.left,
		li: Number(el.line),
		ty: el.type === "Knot" ? 0 : 1,
	})),
});
