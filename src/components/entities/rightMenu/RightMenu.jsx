import sass from './rightMenu.module.sass'

import { AccordionTab } from 'primereact/accordion'

import { MyAccordion } from '../../shared/myAccordion/MyAccordion'
import { MySidebar } from '../../shared/mySidebar/MySidebar'

import { PathList } from '../pathList/PathList'
import { LocationSettings } from '../locationSettings/LocationSettings'
import { GraphicsSettings } from '../graphicsSettings/GraphicsSettings'
import { ResetSettings } from '../resetSettings/ResetSettings'
import { Donat } from '../donat/Donat'

export const RightMenu = () => {
  return (
    <MySidebar position="right">
      <MyAccordion activeIndex={0}>
        <AccordionTab header={<div className={sass.titlePath}>Маршруты</div>}>
          <PathList />
        </AccordionTab>
        <AccordionTab header={<div className={sass.titleMarker}>Локации</div>}>
          <LocationSettings />
        </AccordionTab>
        <AccordionTab header={<div className={sass.title}>Графика</div>}>
          <GraphicsSettings />
        </AccordionTab>
        <AccordionTab header={<div className={sass.titleClean}>Очистить / Удалить</div>}>
          <ResetSettings />
        </AccordionTab>
        {/* <AccordionTab header={<div className={sass.titleDonat}>Поддержка</div>}>
          <Donat />
        </AccordionTab> */}
      </MyAccordion>
    </MySidebar>
  )
}