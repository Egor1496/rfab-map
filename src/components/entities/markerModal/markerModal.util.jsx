import { pM } from "../../../scripts/map/paramsMap";

import allbossses from "../../../data/bossList/bossList.json"

export const getQuests = (quests = []) => quests.map((quest) => `<q lbl>Квест</q>: ${quest}`).join("<br/>");

export const getBossList = (bossList = [], modeModal) => {
	const bosses = bossList.map((currBoss) => {
		let strBoss = "<q lre>Босс</q> " + currBoss.trim();

		for (var key in allbossses) {
			if (allbossses.hasOwnProperty(key)) {
				const bosses = allbossses[key];

				for (let i = 0; i < bosses.length; i++) {
					if (currBoss.trim() === bosses[i].na.trim()) {
						if (bosses[i].lvl) strBoss += ` <q lbl>${bosses[i].lvl}</q><q tm llbl>lvl</q>`;
						if (modeModal) {
							if (bosses[i].xp) strBoss += ` <q lbl>${bosses[i].xp}</q><q tm llbl>xp</q>`;
							if (bosses[i].hp) strBoss += ` <q lre>${bosses[i].hp}</q><q tm llre>hp</q>`;
							if (bosses[i].ty) strBoss += ` ${bosses[i].ty}.`;
							if (bosses[i].de) strBoss += `<br/>&nbsp; -${bosses[i].de}.`;
						}
						else {
							if (bosses[i].ty) strBoss += ` ${bosses[i].ty}`;
							if (bosses[i].no) strBoss += `. ${bosses[i].no}.`;
						}
					}
				}
			}
		}

		return strBoss;
	});

	return bosses.join("<br/>");;
}

export const getPrizeList = (prize = []) => prize.map((prizz) => `${prizz}`).join(", ");

export const getPrizeIcon = (prizeIcon = [], sass) =>
	prizeIcon.map((pI, i) => {
		const name = pI[0] || "coin.png",
			count = pI[1] || "",
			width = pM.prizeType[pI[0]]?.width || "",
			height = pM.prizeType[pI[0]]?.height || "",
			color = pM.prizeType[pI[0]]?.color || "#000000";

		return (
			<div className={sass.prizeIcon} key={i}>
				<img
					src={`./assets/images/prize-icon/${name}`}
					style={{
						width: `${width}px`,
						height: `${height}px`,
						filter: `drop-shadow(0px 0px 2px ${color}) drop-shadow(0px 0px 2px ${color})`,
					}}
				/>
				<span className={sass.prizeCount}>{count}</span>
			</div>
		);
	});
