import { useSelector } from 'react-redux';
import style from './usernaem.module.scss'
import classNames from 'classnames'
import { AuthSelectors } from '../../redux/reducers/authSlice';




const UserName = () =>{

    const username = useSelector(AuthSelectors.getUserInfo)
    console.log(username);
    

    return(
        username ?  <div>
    
{<div className={classNames(style.userNameWrap)}>
<div className={classNames(style.initials)}>
{username.username[0]}
</div>
<div className={classNames(style.fullName)}>
{username?.username}
</div>
</div>} 
        </div> : null
    ) 
}

export default UserName
