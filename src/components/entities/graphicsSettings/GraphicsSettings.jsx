import sass from './graphicsSettings.module.sass'

export const GraphicsSettings = ({ children, ...props }) => {
  return (
    <div className={sass.graphicsSettings} {...props}>
      Настройки карты
    </div>
  )
}