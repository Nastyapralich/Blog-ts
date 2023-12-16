
import './App.css';
import Burger from './components/burger';
import Button, { ButtonType } from './components/button';
import Title from './components/title/title';
import UserName from './components/username/uersname';

function App() {
  return (
   <div>
    <Button type={ButtonType.Primary} title={'primary'} onClick={()=>{}} />
    <Button type={ButtonType.Secondary} title={'secondary'} onClick={()=>{}} />
    <Button type={ButtonType.Secondary_2} title={'secondary 2'} onClick={()=>{}} />
    <UserName username={'Pralich Nastya'} />
    <Title content={'Sign In'} />
    <Burger />
   </div>
  );
}

export default App;
