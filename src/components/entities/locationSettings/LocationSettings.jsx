import sass from './locationSettings.module.sass'

export const LocationSettings = ({ children, ...props }) => {
  return (
    <div className={sass.locationSettings} {...props}>
      настройки видимости
    </div>
  )
}