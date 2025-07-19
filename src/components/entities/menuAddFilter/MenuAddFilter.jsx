import sass from './menuAddFilter.module.sass'

import { useDispatch, useSelector } from "react-redux";
import { activeFilter } from '../../../store/slice/menuSelected.slice';
import { setLocalStoreFilter } from '../../../scripts/global/localStore';

import MyTooltip from "../../shared/myTooltip/MyTooltip";

import { filterRender } from "../../../scripts/map/creating/marker/filterRender"

import listMenu from "../../../data/ui/menuFilters"
import { pM } from '../../../scripts/map/paramsMap';

const getTooltip = (target, position) => {
  return <MyTooltip
    target={target}
    position={position}
    mouseTrack
    mouseTrackTop={20}
  />
};

const iconUrl = "./assets/images/ui/left-menu/";

const iconSizes = {
  trade: 28,
  soc: 28,
  xp: 28,
  bottle: 0,
  word: 30,
  stal: 29,
  roc: 23,
  book: 29,
  set: 28,
  boss: 25,
  mine: 25,
  lich: 30,
  chest: 30,
  map: 38,
  lode: 32
};

const getIconStyle = (option) => ({
  backgroundImage: `url("${iconUrl + option.icon}.svg")`,
  backgroundSize: iconSizes[option.type] || ""
});

export const MenuAddFilter = () => {
  const selectActive = useSelector((state) => state.menuSelectedReducer).activeFilter
  const selectActiveMap = useSelector((state) => state.menuSelectedReducer).activeMap

  const dispatch = useDispatch();

  const filterAddMenu = listMenu?.[selectActiveMap + "Add"] || [];

  const tooltip = false;

  const handlerClick = (type) => {
    if (selectActive === type)
      type = "";

    dispatch(activeFilter(type))
    setLocalStoreFilter(type);
    pM.typeFilter = type;

    filterRender();
  };

  const menuItem = (option) => {
    const classNames = [sass.itemInner, selectActive === option.type ? sass.activeFilter : ""].join(" ");

    return (
      <div
        key={option.type}
        className={sass.listItem}
        onClick={() => handlerClick(option.type)}
      >
        {tooltip && getTooltip("." + option.type, "bottom")}
        <div
          className={classNames}
          data-pr-tooltip={`Фильтр "${option.tooltip}"`}
        >
          <div
            className={`${sass.icon} ${sass[`icon--${option.type}`]}`}
            style={getIconStyle(option)}
          ></div>
        </div>
      </div>
    );
  };

  const classesItem = [sass.list, filterAddMenu.length !== 5 ? sass.itemLeft : ""];

  return <div className={classesItem.join(" ")}>{filterAddMenu.map((option) => menuItem(option))}</div>;
}
