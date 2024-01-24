import { useEffect, useMemo, useState } from "react";
import CardList from "../../components/cardList/cardList";
import Title from "../../components/title";
import style from "./allPosts.module.scss";
import { TabsTypes } from "../../@types";
import TabsList from "../../components/tabsList/tabsList";
import { useThemeContext } from "../../context/theme/context";
import SelectedPostModal from "./selectedPostModal/selectedPostModal";
import SelectedImageModal from "./selectedImageModal/selectedImageModal";
import { useDispatch, useSelector } from "react-redux";
import { PostSelectors, getAllPosts, getMyPosts } from "../../redux/reducers/postSlice";
import { AuthSelectors } from "../../redux/reducers/authSlice";


const AllPosts = () => {

    const dispatch = useDispatch()
    const cardsList = useSelector(PostSelectors.getAllPosts)
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
    const myPosts = useSelector(PostSelectors.getMyPosts);

    const [activeTab, setActiveTab] = useState(TabsTypes.All);

    
    //  useEffect(() => {
    //   dispatch(getAllPosts());
    // }, []);

    useEffect(()=>{
      if(activeTab === TabsTypes.MyFavorite){
        dispatch(getMyPosts())
      }else{
        dispatch(getAllPosts());
      }
    }, [activeTab])


    const tabsContextSwitcher = () => {
      if (activeTab === TabsTypes.MyFavorite) {
        return myPosts;
      } else {
        return cardsList;
      }
    };

    const tabList = useMemo(
      () => [
        { key: TabsTypes.All, title: "All Posts", disabled: false },
        { key: TabsTypes.Popular, title: "Popular Posts", disabled: false },
        {
          key: TabsTypes.MyFavorite,
          title: "Favourite Posts",
          disabled: !isLoggedIn,
        },
      ],
      [isLoggedIn]
    );
  
   
  
    const onTabClick = (tab: TabsTypes) => () => {
      setActiveTab(tab);
      console.log(activeTab);
      
    };
  

    // const {themeValue} = useThemeContext();
    
    return (
      <div>
        <Title content={"Blog"}  />
        <TabsList tabsList={tabList} activeTab={activeTab} onTabClick={onTabClick}/>
        <CardList cardsList={cardsList} />
        <SelectedPostModal />
        <SelectedImageModal />
      </div>
    );
  };
  
export default AllPosts;
