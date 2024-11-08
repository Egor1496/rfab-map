export const readFilePath = (file, callback) => {
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = () => callback(reader.result);
	reader.onerror = () => console.log(reader.error);
};

export const downloadFilePath = (textJson, name) => {
	const elem = document.createElement("a");
	const file = new Blob([textJson], { type: "data:text/json;charset=utf-8" });
	elem.href = URL.createObjectURL(file);
	elem.download = name + ".json";
	document.body.appendChild(elem);
	elem.click();
	elem.remove();
};
