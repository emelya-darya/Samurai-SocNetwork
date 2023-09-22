const getCssVariableColor = (varName: string) => {
    let value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    // если такой переменной нет, то работаем с accent-color
    if (!value) {
        varName = '--accent-clr_main'
        value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    }

    // если цвет в формате HEX(#ffffff) или rgb/rgba (rgb(255, 255, 255)), то возвращаем переменную без оберток
    if (value.match(/^#.{3,8}$/) || value.match(/^rgba?\(/)) return `var(${varName})`

    //иначе, если цвет в формате  255, 255, 255
    return `rgb(var(${varName}))`
}

export const sidebarHeaderClr = getCssVariableColor('--sidebar-header-clr')
export const mainBgClr = getCssVariableColor('--main-bg-clr')
export const bodyBgClr = getCssVariableColor('--body-bg')
export const textClr = getCssVariableColor('--text-clr')
export const accentMainClr = getCssVariableColor('--accent-clr_main')
export const accentSecClr = getCssVariableColor('--accent-clr_sec')
export const errClr = getCssVariableColor('--err-clr')
export const smallScrollbarClr = getCssVariableColor('--small-scrollbar-clr')
// const accentMainClr = getCssVariableColor('--boxsh-val')
// const accentMainClr = getCssVariableColor('--boxsh-val-small')
// const accentMainClr = getCssVariableColor('--boxsh-for-message')
export const myMsgClr = getCssVariableColor('--my-msg-clr')
export const myMsgDateViewedClr = getCssVariableColor('--my_msg-date-viewed-clr')
export const companionMsgClr = getCssVariableColor('--companion-msg-clr')
export const deleteMsgIconClr = getCssVariableColor('--delete-msg-icon-clr')
export const restoreMaskBgClr = getCssVariableColor('--mask-for-restore-msg-bg')
export const signOutBtnClr = getCssVariableColor('--sign-out-btn-bg')

export const restoreFrMaskClr = getCssVariableColor('--restore-fr-mask-bg')

// console.log(first)
