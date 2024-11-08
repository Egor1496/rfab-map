import sass from './navLinksMap.module.sass'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

export const NavLinksMap = () => {
  const selectActiveMap = useSelector((state) => state.menuSelectedReducer).activeMap

  const listMap = [
    { type: "skyrim", name: "Скайрим", isMain: true },
    { type: "solstheim", name: "Солстхеим", isMain: true },
    { type: "blackreach", name: "Черный предел" },
    { type: "forgottenvale", name: "Забытая долина" },
    { type: "soulcairn", name: "Каирн Душ" },
    { type: "skuldafn", name: "Скулдафн" },
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