import {NotFound, Home, Cards, Subjects, SubjectDetail, Paywall, BasicContent} from '../components/content';
import {Basic, ContentWithRightSideBar, BasicWithTitle, HomePage} from '../components/templates'


const appRoutes =  [
    {
        path: "/howitworks",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "How It Works",
        public: true
    },    
    {
        path: "/cards", 
        exact: true,
        LayoutComponent: ContentWithRightSideBar,
        ContentComponent: Cards,
        rootClass: "cards",
        menuTitle: "Play Bingo!",
        public: false
    },  
    {
        path: "/subjects", 
        exact: true,  
        pageTitle: "Trump World Indictables",  
        LayoutComponent: ContentWithRightSideBar,
        ContentComponent: Subjects,
        rootClass: "subjects",
        menuTitle: "The Indictables",
        public: true
    },      
    {
        path: "/indictable-news",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "Indictable News",
        public: true
    },
    {
        path: "/indictable-swag",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "Indictable Swag",
        public: true
    },

    {
        path: "/about",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "About Us",
        public: true
    },
    {
        path: "/donate",
        LayoutComponent: ContentWithRightSideBar,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "Donate",
        public: true
    },                
    {
        path: "/hate-mail", 
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "Hate Mail",
        public: true
    },
    

    {
        path: "/subjects/:subjectId",
        LayoutComponent: ContentWithRightSideBar,
        ContentComponent: SubjectDetail,
        rootClass: "subject-detail",
        public: true
    },
    {
        path: "/paywall",
        LayoutComponent: Basic,
        ContentComponent: Paywall,
        rootClass: "paywall",
        public: true
    },

    {
        path: "/", 
        exact: true, 
        LayoutComponent: HomePage,
        ContentComponent: Home,
        rootClass: "home-page",
        public: true
    },
    {
        LayoutComponent: ContentWithRightSideBar, 
        pageTitle: "Well.. this is awkward",
        ContentComponent: NotFound,  
        rootClass: "not-found-page",
        public: true
    }
        
    ]


export default appRoutes;