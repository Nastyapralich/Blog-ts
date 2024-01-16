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
import { PostSelectors, getAllPosts } from "../../redux/reducers/postSlice";


const AllPosts = () => {

    const dispatch = useDispatch()
    const cardsList = useSelector(PostSelectors.getAllPosts)

    const [activeTab, setActiveTab] = useState(TabsTypes.All);
    const [isLoggedIn, setLoggedIn] = useState(false);
    
    
    const tabsList = useMemo(
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
  
    useEffect(() => {
      dispatch(getAllPosts());
    }, []);
  
    const onTabClick = (tab: TabsTypes) => () => {
      setActiveTab(tab);
      if (tab === TabsTypes.Popular) {
        setLoggedIn(true);
      }
    };
  
    const {themeValue} = useThemeContext();
    
    return (
      <div>
        <Title content={"Blog"}  />
        <TabsList tabsList={tabsList} activeTab={activeTab} onTabClick={onTabClick}/>
        <CardList cardsList={cardsList} />
        <SelectedPostModal />
        <SelectedImageModal />
      </div>
    );
  };
  
export default AllPosts;
