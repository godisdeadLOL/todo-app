import classNames from "classnames"
import style from "./style.module.scss"
import { useEffect, useRef, useState, type PropsWithChildren } from "react"

type ExpandableProps = {
	expanded?: boolean
	className?: string
} & PropsWithChildren

export default function Expandable({ expanded = true, className, children }: ExpandableProps) {
	const [displayed, setDisplayed] = useState(expanded)

	const expandableRef = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (expanded) setDisplayed(true)

		if (!expandableRef.current) return

		const handleTransitionEnd = () => {
			if (!expanded) setDisplayed(false)
		}

		const element = expandableRef.current
		element.addEventListener("transitionend", handleTransitionEnd)
		return () => element.removeEventListener("transitionend", handleTransitionEnd)
	}, [expanded])

	return (
		<div ref={expandableRef} data-expanded={expanded} className={classNames(style.expandable, className)}>
			{displayed && children}
		</div>
	)
}
