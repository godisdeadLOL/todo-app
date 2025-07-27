import React, { createContext, useContext, type PropsWithChildren } from "react"

type ContextType = { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }

const DropdownMenuContext = createContext<ContextType | undefined>(undefined)

type DropdownMenuContextProviderProps = {
	value: ContextType
} & PropsWithChildren
export function DropdownMenuContextProvider({ value, children }: DropdownMenuContextProviderProps) {
	return <DropdownMenuContext.Provider value={value}>{children}</DropdownMenuContext.Provider>
}

export function useDropdownMenuContext() {
	return useContext(DropdownMenuContext)!
}
