import sass from './taskList.module.sass'

import { useDispatch } from 'react-redux'
import { floatTooltipMVT, floatTooltipPos, setCurrTask } from '../../../store/slice/floatTooltip.slice'

import { AccordionTab } from 'primereact/accordion'
import { MyAccordion } from '../../shared/myAccordion/MyAccordion'

import tasksMenu from '../../../data/ui/menuTasks'
import listTasks from '../../../data/taskList'

export default function TaskList() {
  const dispatch = useDispatch();

  return (
    <div className={sass.myTaskList}>
      <MyAccordion sassProps={sass.myAccordion}>
        {
          tasksMenu.map((item, i) => (
            <AccordionTab key={"taskHeader_" + i} header={item.name}>
              {
                listTasks[item.type]?.map((task, i) => {
                  return <div
                    key={i}
                    className={sass.task}

                    onMouseEnter={(el) => {
                      dispatch(setCurrTask(task))
                      dispatch(floatTooltipPos(el.target.getBoundingClientRect().y))
                      dispatch(floatTooltipMVT(true))
                    }}

                    onMouseLeave={() => { dispatch(floatTooltipMVT(false)) }}
                  >
                    {task.name}
                    <div className={sass.lvlWrap}>
                      <span className={sass.lvl}>{task.level[0] || "?"}</span>-
                      <span className={sass.lvl}>{task.level[1] || "?"}</span> lvl
                    </div>
                  </div>
                })
              }
            </AccordionTab>
          ))
        }
      </MyAccordion>
    </div>
  )
}