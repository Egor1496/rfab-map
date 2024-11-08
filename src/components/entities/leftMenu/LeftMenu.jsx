import sass from './leftMenu.module.sass'

import { useSelector } from 'react-redux'

import { AccordionTab } from 'primereact/accordion'

import { MySidebar } from '../../shared/mySidebar/MySidebar'
import { MyAccordion } from '../../shared/myAccordion/MyAccordion'
// import { MySpinner } from '../../shared/mySpinner/MySpinner';

import { MenuFilter } from '../menuFilter/MenuFilter'
import { MenuAddFilter } from '../menuAddFilter/MenuAddFilter'
import { NavLinksMap } from '../navLinksMap/NavLinksMap'

import { BossList } from '../bossList/BossList';

import listMenu from "../../../data/ui/menuFilters"

// const TaskList = React.lazy(() => import('../taskList/TaskList'));

export const LeftMenu = () => {
  const selectActiveMap = useSelector((state) => state.menuSelectedReducer).activeMap

  const filterTitle = <div className={sass.filterTitle}>Фильтр</div>,
    bossTitle = <div className={sass.bossTitle}>Боссы</div>,
    taskTitle = <div className={sass.taskTitle}>Квесты</div>;

  return (
    <MySidebar position="left">
      <MyAccordion activeIndex={Number(Boolean(listMenu?.[selectActiveMap]))}>
        <AccordionTab header={<div className={sass.locationTitle}>Карты</div>}>
          <NavLinksMap />
        </AccordionTab>
        {
          listMenu?.[selectActiveMap] && (
            <AccordionTab header={filterTitle}>
              <MenuFilter />
              <MenuAddFilter />
            </AccordionTab>
          )
        }
        <AccordionTab header={bossTitle}>
          <BossList />
        </AccordionTab>
        {/* <AccordionTab header={taskTitle} >
          <Suspense fallback={<MySpinner />} >
            <TaskList />
          </Suspense>
        </AccordionTab> */}
      </MyAccordion>
    </MySidebar>
  )
}