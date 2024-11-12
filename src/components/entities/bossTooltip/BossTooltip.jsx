import sass from './bossTooltip.module.sass'

import { useSelector } from 'react-redux';
import { store } from '../../../store/store';

const UrlWiki = "https://elderscrolls.fandom.com/ru/wiki/";

const getLinkWiki = (boss) => {
  if (boss.lc_l === 1)
    return UrlWiki + boss.lc;
  else
    return UrlWiki + boss.lc_l;
}

export const BossTooltip = () => {
  const visible = useSelector((state) => state.floatTooltipReducer).floatTooltipMVB;

  const boss = store.getState().floatTooltipReducer.currBoss;

  const toggleModeInfo = useSelector((state) => state.settingsReducer).toggleModeInfo;

  return (
    visible &&
    <div className={sass.bossTooltip + " " + (toggleModeInfo ? sass.md : sass.sm)} >
      <div className={sass.mainStats}>
        {boss.xp && <span className={sass.xp}>{boss.xp}<div className={sass.icn} /></span>}
        {boss.hp && <span className={sass.hp}>{boss.hp}<div className={sass.icn} /></span>}
        {boss.arr && <span className={sass.arr}>{boss.arr}<div className={sass.icn} /></span>}
      </div>

      <div className={sass.addStats}>
        {boss.inf && <span className={sass.inf}>{boss.inf}<div className={sass.icn} /></span>}
        {boss.poi && <span className={sass.poi}>{boss.poi}<div className={sass.icn} /></span>}
        {boss.mag && <span className={sass.mag}>{boss.mag}<div className={sass.icn} /></span>}
        {boss.fir && <span className={sass.fir}>{boss.fir}<div className={sass.icn} /></span>}
        {boss.col && <span className={sass.col}>{boss.col}<div className={sass.icn} /></span>}
        {boss.sto && <span className={sass.sto}>{boss.sto}<div className={sass.icn} /></span>}
      </div>

      {boss.ty &&
        <div className={sass.ty}>
          <div className={sass.icn} /> - {boss.ra && <span>{boss.ra}, </span>} {boss.ty}
        </div>}

      {boss.wp && <div className={sass.weapon}><div className={sass.icn} /> - {boss.wp}</div>}

      {
        boss.lc &&
        <div className={sass.location}>
          {
            boss.lc_l &&
            <a href={getLinkWiki(boss)} className={`${sass.locLink} ${sass.decLi1}`} />
          }
          {
            !boss.lc_l &&
            <div className={`${sass.icn} ${sass.decLi2}`} />
          }
          <span>-</span>
          <span className={sass.decLi2}>{boss.lc}</span>
        </div>
      }

      {
        boss.no &&
          boss.no_l ?
          <a href={UrlWiki + boss.no_l} className={`${sass.no}  ${sass.noLink}`}> {boss.no}</a>
          :
          <div className={sass.no}> {boss.no}</div>
      }

      {
        boss.de &&
        <div className={`${sass.de}`} dangerouslySetInnerHTML={{ __html: boss.de }} />
      }
    </div>
  )
}