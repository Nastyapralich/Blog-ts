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
import { PER_PAGE } from "../../utils/constants";
import Paginate from "../../components/pagination/pagination";


const AllPosts = () => {

    const dispatch = useDispatch()
    const cardsList = useSelector(PostSelectors.getAllPosts);
    const totalCount = useSelector(PostSelectors.getTotalCounts)
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);
    const myPosts = useSelector(PostSelectors.getMyPosts);
    const [currentPage, setCurrentPage] = useState(1)

    const [activeTab, setActiveTab] = useState(TabsTypes.All);

    const pagesCount = useMemo(() => Math.ceil(totalCount / PER_PAGE), [totalCount])

    
    //  useEffect(() => {
    //   dispatch(getAllPosts());
    // }, []);

    useEffect(()=>{
      if(activeTab === TabsTypes.MyFavorite){
        dispatch(getMyPosts())
      }else{
        const offset = (currentPage - 1) * PER_PAGE
        dispatch(getAllPosts({offset, isOverwrite: true}));
      }
    }, [activeTab, currentPage])


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
  
 const onPageChange = ({selected} : {selected:number}) =>{
console.log(selected);
setCurrentPage(selected+1)

 }
    // const {themeValue} = useThemeContext();
    
    return (
      <div>
        <Title content={"Blog"}  />
        <TabsList tabsList={tabList} activeTab={activeTab} onTabClick={onTabClick}/>
        <CardList cardsList={tabsContextSwitcher()} />
        <SelectedPostModal />
        <SelectedImageModal />
        <Paginate pagesCount={totalCount} onPageChange={onPageChange} currentPage={currentPage} />
      </div>
    );
  };
  
export default AllPosts;
