import sass from './tassTooltip.module.sass'

import { useSelector } from 'react-redux';
import { store } from '../../../store/store';

export const TassTooltip = () => {
  const visible = useSelector((state) => state.floatTooltipReducer).floatTooltipMVT;

  const task = store.getState().floatTooltipReducer.currTask;

  const modeModal = useSelector((state) => state.floatTooltipReducer).modeModal;

  return (
    visible &&
    <div className={sass.tassTooltip + " " + sass[modeModal]} >
      <div className={sass.taskManager}> Квестодатель - <span>{task.taskManager || "?"}</span></div>
      <div className={sass.location}> Локация - <span>{task.location || "?"}</span></div>
      <div className={sass.prize}> Награда - <span>{task.prize?.join(",\n") || "?"}</span></div>
      <div className={sass.description}> {task.description || "?"} </div>
    </div>
  )
}