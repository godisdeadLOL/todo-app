import style from "./style.module.scss"
import type { Tag } from "@/features/tags/types"
import classNames from "classnames"
import TagsEditDialog from "@/features/tags/components/TagsEditDialog"
import TagDisplay from "@/features/tags/components/TagDisplay"
import useCurrentTags from "@/features/tags/hooks/useCurrentTags"
import TagStackFallback from "./TagStackFallback"
import Badge from "@/components/Badge"
import { LuPlus } from "react-icons/lu"

type TagStackProps = {
	tagsData: Tag[]
	mode: "show" | "edit"

	className?: string
}

export default function TagStack({ mode, className }: TagStackProps) {
	const currentTagsData = useCurrentTags()

	return (
		<div className={classNames(className, style.tagStack)}>
			{currentTagsData.length === 0 && <TagStackFallback />}
			{currentTagsData.map((tag) => (
				<TagDisplay key={tag.id} tagData={tag} deletable={mode === "edit"} />
			))}

			{mode === "show" && (
				<TagsEditDialog
					triggerElement={(onOpen) => (
						<Badge className={style.tagsEditButton} onClick={onOpen}>
							<LuPlus />
						</Badge>
					)}
				/>
			)}
		</div>
	)
}
