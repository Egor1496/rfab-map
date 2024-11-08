import sass from './navLinksMap.module.sass'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

export const NavLinksMap = () => {
  const selectActiveMap = useSelector((state) => state.menuSelectedReducer).activeMap

  const listMap = [
    { type: "rfab-map/skyrim", name: "Скайрим", isMain: true },
    { type: "rfab-map/solstheim", name: "Солстхеим", isMain: true },
    { type: "rfab-map/blackreach", name: "Черный предел" },
    { type: "rfab-map/forgottenvale", name: "Забытая долина" },
    { type: "rfab-map/soulcairn", name: "Каирн Душ" },
    { type: "rfab-map/skuldafn", name: "Скулдафн" },
  ]

  const getClassName = (link) => [
    link.isMain ? sass.main : "",
    selectActiveMap === link.type ? sass.activeMap : ""
  ].join(" ");

  return (
    <div className={sass.navLinksMap}>
      {
        listMap.map((link) =>
          <Link key={link.type} to={"/" + link.type} className={getClassName(link)} >
            {link.name}
          </Link>
        )
      }
    </div >
  )
}