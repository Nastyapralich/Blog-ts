import style from './usernaem.module.scss'
import classNames from 'classnames'


interface UserNameProps{
username: string;
}

const UserName = (props:UserNameProps) =>{

    return(
        <div>
<div className={classNames(style.userNameWrap)}>
<div className={classNames(style.initials)}>
{props.username[0]}{props.username.split(' ')[1][0]}
</div>
<div className={classNames(style.fullName)}>
{props.username}
</div>
</div>
        </div>
    )
}

export default UserName
