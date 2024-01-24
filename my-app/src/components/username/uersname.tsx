import style from './usernaem.module.scss'
import classNames from 'classnames'


interface UserNameProps{
username: string;
}

const UserName = (props:UserNameProps) =>{

    return(
        username ?  <div>
    
{<div className={classNames(style.userNameWrap)}>
<div className={classNames(style.initials)}>
{username?.username[0]}
</div>
<div className={classNames(style.fullName)}>
{username?.username}
</div>
</div>} 
        </div> : null
    ) 
}

export default UserName
