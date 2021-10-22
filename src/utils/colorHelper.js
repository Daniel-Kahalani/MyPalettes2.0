import chroma from 'chroma-js';
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePaletteWithShades(staterPalette) {
	if (!staterPalette) {
		return null;
	}
	let newPalette = {
		name: staterPalette.name,
		_id: staterPalette._id,
		emoji: staterPalette.emoji,
		colors: {},
	};

	for (let level of levels) {
		newPalette.colors[level] = [];
	}
	fillPaletteIn(newPalette, staterPalette);
	return newPalette;
}

function fillPaletteIn(newPalette, staterPalette) {
	for (let color of staterPalette.colors) {
		let scale = getScale(color.color, 10).reverse();
		for (let i in scale) {
			newPalette.colors[levels[i]].push({
				name: `${color.name} ${levels[i]}`,
				id: color.name.toLowerCase().replace(/ /g, '-'),
				hex: scale[i],
				rgb: chroma(scale[i]).css(),
				rgba: chroma(scale[i])
					.css()
					.replace('rgb', 'rgba')
					.replace(')', ',1.0)'),
			});
		}
	}
}

function getScale(hexColor, numbersOfColors) {
	return chroma.scale(getRange(hexColor)).mode('lab').colors(numbersOfColors);
}

function getRange(hexColor) {
	const end = '#fff';
	return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function getRandomColor() {
	let colorVals = [];
	for (let i = 0; i < 3; i++) {
		colorVals.push(Math.floor(Math.random() * 255) + 1);
	}
	colorVals.push(Math.random().toFixed(2));
	let color = `rgba(${colorVals[0]},${colorVals[1]},${colorVals[2]},${colorVals[3]})`;
	let colorName = `random (${colorVals[0]},${colorVals[1]},${colorVals[2]},${colorVals[3]})`;
	return { color: color, name: colorName };
}
export { generatePaletteWithShades, getRandomColor };
