import { gS } from "../../global/paramsGlobal";

import $ from "jquery";

export const getPosModalMarker = (modalWidth, modalHeight, oImg) => {
	const doc = document.documentElement,
		scrollOffsetX = (window.scrollX || doc.scrollLeft) - (doc.clientLeft || 0),
		scrollOffsetY = (window.scrollY || doc.scrollTop) - (doc.clientTop || 0);

	const winOffsetX = gS.$element.offset().left - scrollOffsetX,
		winOffsetY = gS.$element.offset().top - scrollOffsetY;

	const modalWidthMid = modalWidth / 2,
		modalHeightMid = modalHeight / 2;

	const iconWidth = ((oImg.get("width") * oImg.scaleX) / 2) * 1.1,
		iconHeight = ((oImg.get("height") * oImg.scaleY) / 2) * 1.1;

	const margin = 10;

	let modalLeft = winOffsetX + oImg.get("left") - modalWidthMid,
		modalTop = winOffsetY + oImg.get("top") - modalHeight - iconHeight;

	if (modalLeft < margin) {
		modalLeft = margin;
	} else if (modalLeft + modalWidth > $(window).width()) {
		modalLeft = $(window).width() - modalWidth - margin;
	}

	if (modalTop < margin) {
		modalTop = winOffsetY + oImg.get("top") + iconHeight;

		if (modalTop + modalHeight > $(window).height() - margin) {
			if (oImg.get("left") > gS.$element.width() / 2) {
				modalLeft = winOffsetX + oImg.get("left") - modalWidth - iconWidth;
				modalTop = winOffsetY + oImg.get("top") - modalHeightMid;
			} else {
				modalLeft = winOffsetX + oImg.get("left") + iconWidth;
				modalTop = winOffsetY + oImg.get("top") - modalHeightMid;
			}

			if (modalTop < margin) {
				modalTop = margin;
			} else if (modalTop + modalHeight + margin > $(window).height()) {
				modalTop = $(window).height() - modalHeight - margin;
			}
		}
	}

	return [modalTop, modalLeft];
};
