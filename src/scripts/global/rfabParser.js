import bossStats from "../../data/else/bossStats.json";
import prizeIcon from "../../data/else/prizeIcon.json";

import bossList from "../../data/bossList/bossList.json";

const typePrize = {
	Книги: "book.png", // Книга опыта.
	Яйца: "сhaurus.png", // Яйцо коруса.
	Кошельки: "purse.png", // Кошелечек.
	Сумочки: "satchel.png", // Сумочка алхимика.
	Сундучки: "chest-sm.png", // Небольшой сундук.
	"Камни Борензии": "roc.webp", // Камень Барензии.
	Сердце: "daedra.png", // Сердце даэдра.
	Портфели: "knapsack.png", // Портфель.
	Скума: "skooma.png", // Скума.
	Паралич: "bottleP.png", // Паралич.
	ВЕС: "bottleW.png", // Превосходка веса.
	ХП: "bottleH.png", // Превосходка ХП.
	СТ: "bottleS.png", // Превосходка СТ.
	МП: "bottleM.png", // Превосходка МП.
	"Мастер сундуки": "chest.png", // Мастерский сундук.
	Сейф: "Safe.webp",
};

const setPrize = (prize, marker) => {
	const markerPrizes = marker.prizeIcon || [];

	for (const prizeNameNew in prize) {
		if (Object.prototype.hasOwnProperty.call(prize, prizeNameNew)) {
			let prizeCountNew = prize[prizeNameNew];

			let isFind = false;

			for (let j = 0; j < markerPrizes.length; j++) {
				let [prizeNameOld, prizeCountOld] = markerPrizes[j];

				if (prizeNameOld?.trim() === typePrize[prizeNameNew]?.trim()) {
					isFind = true;

					if (Number(prizeCountNew) < 2) prizeCountNew = "";

					marker.prizeIcon[j][1] = prizeCountNew;

					// console.log("ЕСТЬ " + prizeNameOld, prizeCountNew);
				}
			}

			if (isFind === false && Number(prizeCountNew) > 0) {
				if (!marker.prizeIcon) marker.prizeIcon = [];

				if (Number(prizeCountNew) < 2) prizeCountNew = "";

				marker.prizeIcon.push([typePrize[prizeNameNew], prizeCountNew]);

				// console.log("НЕТ " + prizeNameNew, prizeCountNew);
			}

			// Вместо пустой строки масив в 1 ел!

			// !!!!!!!!!!!!! Награды перебери вручную!!!!!!!
			// 			<q ye>OOOOO</q>
			// "prizeList":["<q ye>OOOOO</q>."],
			// "prizeList":[""],
		}
	}
};

const prizeIconInMarkers = (allMarkers) => {
	for (let i = 0; i < allMarkers.length; i++) {
		delete allMarkers[i].oImg;

		for (const prizeId in prizeIcon) {
			if (Object.prototype.hasOwnProperty.call(prizeIcon, prizeId)) {
				if (prizeId == allMarkers[i].id) setPrize(prizeIcon[prizeId], allMarkers[i]);
			}
		}
	}

	console.log(allMarkers);
};

const bossStatsInBossList = () => {
	for (const i in bossStats) {
		if (Object.prototype.hasOwnProperty.call(bossStats, i)) {
			const statsB = bossStats[i];
			const nameB = i;

			for (const j in bossList) {
				if (Object.prototype.hasOwnProperty.call(bossList, j)) {
					const allBosses = bossList[j];

					for (const k in allBosses) {
						if (Object.prototype.hasOwnProperty.call(allBosses, k)) {
							const boss = allBosses[k];

							if (nameB === boss.na) {
								boss.lvl = statsB.lvl;
								boss.hp = statsB.ХП || "0";
								boss.arr = statsB.Броня || "0";
								boss.inf = statsB.Болезнь || "0";
								boss.poi = statsB.Яд || "0";
								boss.mag = statsB.Магия || "0";
								boss.fir = statsB.Огонь || "0";
								boss.col = statsB.Холод || "0";
								boss.sto = statsB.Гроза || "0";
								boss.ra = statsB.Раса || "0";
								boss.ty = statsB.Тип || "0";
								boss.wp = statsB.Оружие || "0";

								if (!boss.no?.trim()) boss.no = statsB.descr;
								else if (statsB.descr) boss.no_new = statsB.descr;
							}
						}
					}
				}
			}
		}
	}

	console.log(bossList);
};

export const rfabParser = (allMarkers) => {
	// bossStatsInBossList();
	prizeIconInMarkers(allMarkers);
};
