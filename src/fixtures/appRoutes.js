import {NotFound, Home, Cards, Subjects, SubjectDetail, Paywall, BasicContent} from '../components/content';
import {Basic, ContentWithRightSideBar, BasicWithTitle, HomePage} from '../components/templates'
import {TomiLahren, LatestSubject} from '../components/sidebar';
// import TestWidget from '../components/sidebar/TestWidget';

const appRoutes =  [
    {
        path: "/howitworks",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "How It Works",
        public: true,
        showInHeader: true,
        showInFooter: true
    },    
    {
        path: "/cards", 
        exact: true,
        LayoutComponent: ContentWithRightSideBar,
        ContentComponent: Cards,
        SidebarComponents: [LatestSubject],
        rootClass: "cards",
        menuTitle: "Play Bingo!",
        public: false,
        showInHeader: true,
        showInFooter: true
    },  
    {
        path: "/subjects", 
        exact: true,  
        pageTitle: "Trump World Indictables",  
        LayoutComponent: ContentWithRightSideBar,
        ContentComponent: Subjects,
        SidebarComponents: [TomiLahren, LatestSubject],
        rootClass: "subjects",
        menuTitle: "The Indictables",
        public: true,
        showInHeader: true,
        showInFooter: true
    },      
    {
        path: "/indictable-news",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "Indictable News",
        public: true,
        showInHeader: true,
        showInFooter: true
    },
    {
        path: "/indictable-swag",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "Indictable Swag",
        public: true,
        showInHeader: true,
        showInFooter: true
    },

    {
        path: "/about",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "About Us",
        public: true,
        showInHeader: true,
        showInFooter: true
    },
    {
        path: "/donate",
        LayoutComponent: ContentWithRightSideBar,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "Donate",
        public: true,
        showInHeader: true,
        showInFooter: true
    },                
    {
        path: "/hate-mail", 
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        rootClass: "basic-content",
        menuTitle: "Hate Mail",
        public: true,
        showInHeader: true,
        showInFooter: true
    },
    

    {
        path: "/subjects/:subjectId",
        LayoutComponent: ContentWithRightSideBar,
        ContentComponent: SubjectDetail,
        rootClass: "subject-detail",
        public: true,
        showInHeader: false,
        showInFooter: false
    },
    {
        path: "/paywall",
        LayoutComponent: Basic,
        ContentComponent: Paywall,
        rootClass: "paywall",
        public: true,
        showInHeader: false,
        showInFooter: false
    },
    {
        path: "/terms",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        menuTitle: "Terms Of Service",
        rootClass: "tos",
        public: true,
        showInHeader: false,
        showInFooter: true
    },
    {
        path: "/privacy",
        LayoutComponent: BasicWithTitle,
        ContentComponent: BasicContent,
        menuTitle: "Privacy Policy",
        rootClass: "privacy",
        public: true,
        showInHeader: false,
        showInFooter: true
    },    
    {
        path: "/", 
        exact: true, 
        LayoutComponent: HomePage,
        ContentComponent: Home,
        SidebarComponents: [TomiLahren, LatestSubject],
        rootClass: "home-page",
        public: true,
        showInHeader: false,
        showInFooter: false
    },
    {
        LayoutComponent: ContentWithRightSideBar, 
        pageTitle: "Well.. this is awkward",
        ContentComponent: NotFound,  
        rootClass: "not-found-page",
        public: true,
        showInHeader: false,
        showInFooter: false
    }
        
    ]


export default appRoutes;