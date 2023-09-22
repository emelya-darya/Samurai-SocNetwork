import { IconType } from 'react-icons/lib'
import { Link } from 'react-router-dom'
import { PreloaderSmall } from '../preloaders/small/PreloaderSmall'
import { mainBgClr } from '../getCssVariableColor'
import c from './button.module.scss'

type ButtonPropsType = {
    name: string | null
    Icon: IconType | null
    extraClassName: string | null
    title?: string

    tag?: 'link'
    linkPath?: string

    type: 'button' | 'submit' | 'reset'
    isDisabled: boolean
    isLoading: boolean
    preloaderClr?: string
    onClickHandler?: () => void
}

const Button: React.FC<ButtonPropsType> = ({
    tag,
    type,
    name,
    Icon,
    extraClassName,
    isDisabled,
    isLoading,
    preloaderClr,
    onClickHandler,
    title,
    linkPath,
}) => {
    if (tag === 'link')
        return (
            <Link
                to={linkPath || '/'}
                className={`${c.btn} ${extraClassName}`}
                onClick={onClickHandler ? onClickHandler : () => {}}
                title={title}>
                {name && <span>{name}</span>}
                {Icon && <Icon />}
            </Link>
        )
    else
        return (
            <button
                type={type}
                className={`${c.btn} ${extraClassName}`}
                disabled={isDisabled || isLoading}
                onClick={onClickHandler ? onClickHandler : () => {}}
                title={title}>
                {isLoading ? (
                    <PreloaderSmall color={preloaderClr || mainBgClr} size={23} minHeight='23px' />
                ) : (
                    <>
                        {name && <span>{name}</span>}
                        {Icon && <Icon />}
                    </>
                )}
            </button>
        )
}

export { Button }
