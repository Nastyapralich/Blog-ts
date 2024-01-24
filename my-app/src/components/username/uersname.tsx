import { useSelector } from 'react-redux';
import style from './usernaem.module.scss'
import classNames from 'classnames'
import { AuthSelectors } from '../../redux/reducers/authSlice';


// interface UserNameProps{
// username: string;
// }

const UserName = () =>{

    const username = useSelector(AuthSelectors.getUserInfo)

    return(
        <div>
<div className={classNames(style.userNameWrap)}>
<div className={classNames(style.initials)}>
{username?.username[0]}
</div>
<div className={classNames(style.fullName)}>
{username?.username}
</div>
</div>
        </div>
    )
}

export default UserName
