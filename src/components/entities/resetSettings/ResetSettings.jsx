import sass from './resetSettings.module.sass'

export const ResetSettings = ({ children, ...props }) => {
  return (
    <div className={sass.resetSettings} {...props}>
      Сброс настроек
    </div>
  )
}