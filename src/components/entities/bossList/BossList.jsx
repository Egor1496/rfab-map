import sass from './bossList.module.sass'

import { useDispatch, useSelector } from 'react-redux';

import { MyAccordion } from '../../shared/myAccordion/MyAccordion';
import { AccordionTab } from 'primereact/accordion';

import bossesMenu from '../../../data/ui/menuBosses';

import listBossses from '../../../data/bossList/bossList.json'
import { floatTooltipMVB, floatTooltipPos, setCurrBoss } from '../../../store/slice/floatTooltip.slice';

export const BossList = () => {
  const dispatch = useDispatch();

  const keyPress = useSelector((state) => state.eventsReducer).keyPress;

  return (
    <div className={sass.myBossList}>
      <MyAccordion sassProps={sass.myAccordion}>
        {
          bossesMenu.map((item, i) => (
            <AccordionTab key={"bossHeader_" + i}
              header={
                <div className={sass.accordTab}>
                  <span dangerouslySetInnerHTML={{ __html: item.name }} />
                  <div className={sass.lvlWrap}>
                    {
                      item.level && <>
                        <span className={sass.lvl}>{item.level[0]}</span>
                        -
                        <span className={sass.lvl}>{item.level[1]}</span>
                      </>
                    }
                  </div>
                </div>
              }>
              {
                listBossses[item.name]?.map((boss) => {
                  return <div
                    key={boss.na}
                    onMouseEnter={(el) => {
                      dispatch(setCurrBoss(boss))
                      dispatch(floatTooltipPos(el.target.getBoundingClientRect().y))
                      dispatch(floatTooltipMVB(true))
                    }}

                    onMouseLeave={() => {
                      if (keyPress !== "ControlLeft")
                        dispatch(floatTooltipMVB(false))
                    }}
                  >
                    <div className={`${sass.boss}`}>
                      {boss.na}
                      <span className={sass.lvl}> {boss.lvl ? boss.lvl + "lvl" : ""}</span>
                    </div>
                  </div>
                })
              }
            </AccordionTab>
          ))
        }
      </MyAccordion>
    </div >
  )
}