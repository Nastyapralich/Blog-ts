import { useEffect, useMemo, useState } from "react";
import CardList from "../../components/cardList/cardList";
import Title from "../../components/title";
import style from "./allPosts.module.scss";
import { PostsList, TabsTypes } from "../../@types";
import TabsList from "../../components/tabsList/tabsList";
import { useThemeContext } from "../../context/theme/context";

const MOCKARRAY = [
  {
    id: 1,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/1473613140_zlye-volki.jpeg",
    text: "фыв",
    date: "2021-10-06",
    lesson_num: 123,
    title: "фывфывфыв",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 7,
  },
  {
    id: 2,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2021-08-04_%D0%B2_17.37.38.png",
    text: "Text",
    date: "2021-10-07",
    lesson_num: 48,
    title: "Title",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 7,
  },
  {
    id: 3,
    image: "https://tms-studapi-dev.s3.amazonaws.com/media/unnamed.jpeg",
    text: "Hello!",
    date: "2021-10-07",
    lesson_num: 23,
    title: "B-52!",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 97,
  },
  {
    id: 4,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/unnamed_5c5gF9H.jpeg",
    text: "Hi",
    date: "2021-10-07",
    lesson_num: 22,
    title: "b-52",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 97,
  },
  {
    id: 5,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/unnamed_MQSTowL.jpeg",
    text: "Test",
    date: "2021-10-07",
    lesson_num: 59,
    title: "b-52",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 97,
  },
  {
    id: 6,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2021-10-07_%D0%B2_10.12.21.png",
    text: "Hello",
    date: "2021-10-07",
    lesson_num: 44,
    title: "b-52",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 99,
  },
  {
    id: 7,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/unnamed_Akeb3ob.jpeg",
    text: "Hello2",
    date: "2021-10-07",
    lesson_num: 441,
    title: "b-52!!",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 99,
  },
  {
    id: 8,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2021-10-08_%D0%B2_11.32.46.png",
    text: "На чиле",
    date: "2021-10-08",
    lesson_num: 100,
    title: "b-52!!",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 122,
  },
  {
    id: 9,
    image: "https://tms-studapi-dev.s3.amazonaws.com/media/a1.JPG",
    text: "Blablablalba",
    date: "2021-10-08",
    lesson_num: 49,
    title: "BLABLABLA",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 123,
  },
  {
    id: 10,
    image: "https://tms-studapi-dev.s3.amazonaws.com/media/Niira.jpg",
    text: "my sisters cat",
    date: "2021-10-08",
    lesson_num: 49,
    title: "Cat Niira",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 123,
  },
  {
    id: 11,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA_%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0_2021-10-08_%D0%B2_15.13.22.png",
    text: "AbrfKadabra",
    date: "2021-10-09",
    lesson_num: 223,
    title: "B-52 the best",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 133,
  },
  {
    id: 12,
    image:
      "https://tms-studapi-dev.s3.amazonaws.com/media/1473613140_zlye-volki.jpeg",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, odio voluptates aut molestiae, corporis consequatur assumenda corrupti quasi vitae architecto perspiciatis deleniti dolorem, reiciendis quidem nulla natus nobis ducimus omnis?",
    date: "2021-10-10",
    lesson_num: 12,
    title: "Woolf",
    description:
      "default default default default default default default default default default default default default default default default default default default default default default default default default default default",
    author: 133,
  },
];

const AllPosts = () => {
    
    const [activeTab, setActiveTab] = useState(TabsTypes.All);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [cardsList, setCardsList] = useState<PostsList>([]);
  
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
      setCardsList(MOCKARRAY);
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
      </div>
    );
  };
  
export default AllPosts;
