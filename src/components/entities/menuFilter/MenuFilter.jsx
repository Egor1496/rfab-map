import sass from './menuFilter.module.sass'

import { useDispatch, useSelector } from 'react-redux';

import { activeFilter } from '../../../store/slice/menuSelected.slice';
import { setLocalStoreFilter } from '../../../scripts/global/localStore';

import MyTooltip from "../../shared/myTooltip/MyTooltip";

import { filterRender } from '../../../scripts/map/creating/marker/filterRender';

import listMenu from "../../../data/ui/menuFilters"

const getTooltip = (target, position) => {
  return <MyTooltip
    target={target}
    position={position}
    mouseTrack
    mouseTrackLeft={10}
  />
}

export const MenuFilter = () => {
  const selectActive = useSelector((state) => state.menuSelectedReducer).activeFilter
  const selectActiveMap = useSelector((state) => state.menuSelectedReducer).activeMap

  const dispatch = useDispatch();

  const filterMenu = listMenu?.[selectActiveMap] || [];

  const tooltip = false;

  const handlerClick = (type) => {
    if (selectActive === type) {
      type = "";
      filterRender();
    } else filterRender(type);

    dispatch(activeFilter(type))
    setLocalStoreFilter(type);
  }

  const getLevel = (option) => option.level.length === 2 ?
    <> {option.level[0]}<span className={sass.slash}>-</span>{option.level[1]} </>
    : option.level[0];

  const getItem = (option) => {
    const classNames = [sass.text, selectActive === option.type ? sass.activeFilter : ""].join(" ");

    return (
      <div
        className={classNames}
        data-pr-tooltip={`Рекомендуемый уровень ${option.level.join(" - ")}`}
        onClick={() => handlerClick(option.type)}
      >
        <div className={sass.textName}> {option.name}</div>
        <div className={sass.textLevel}> {getLevel(option)} </div>
      </div>
    )
  }

  const getItemBoss = (option) => {
    const classNames = [sass.boss, selectActive === option.type + "_boss" ? sass.activeFilter : ""].join(" ");

    return <div
      className={classNames}
      data-pr-tooltip={`Фильтр боссов "${option.name}"`}
      onClick={() => handlerClick(option.type + "_boss")}
    />
  };

  const menuItem = (option) => (
    <div key={option.type} className={sass.listbox}>
      <div className={sass.itemInner}>
        {tooltip && getTooltip("." + option.type, "top")}
        {getItem(option)}
        {
          option.isBoss &&
          <>
            {tooltip && getTooltip("." + option.type + "_boss", "right")}
            {getItemBoss(option)}
          </>
        }
      </div >
    </div>
  )

  return <div>{filterMenu.map((option) => menuItem(option))}</div>
}