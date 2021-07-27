
/* ---------------------------
    Card Generator Interfaces
-----------------------------*/

export interface BingoCardProps {
    cardId?: string | null;
}


export interface Subject {
    _id: string;
    subjectTitle?: string | null;
    subjectShortDesc: string | null;
    subjectImg:string;
    subjectDesc?: string | null;
    markDate?: string | null;
    rollerImgId?: number;
    imgClass?: string;
    nohover: boolean;
    probability: number;
}


export interface SubjectTileProps {
    idx: number;
    subject: Subject;
}


export interface SelectedSubject {
    _id: string;
    probability: number;
}


export interface CardData {
    selectedSubjects: SelectedSubject[];
    probabilityMatrix: [number[]] | string;
}


export interface CardGenDataState {
    subjects: Subject[];
    uiState: {
        screen: string;
        selectedSubjects: SelectedSubject[];
        enabled: boolean;
        tileDisplayCount: number;
        rollComplete: boolean;
        showGenerator?: boolean; 
        cardId?: string;
        playMusic: boolean;
        showReport: boolean;
        probabilityMatrix: ProbabilityMatrixProps;
    }
}


export interface ProbabilityMatrixProps {
    vals: [number[]];
    rowProbs: number[];
    colProbs: number[];
    diagProbs: number[];
}


export interface PreloadScreenProps {
    handleClick: () => void;
}


export interface ModalButtonProps {
    handleClose: () => void;
    cardId?: string | null;
}

// export interface CardGenModalProps {
//     handleClose: () => void 
// }

export interface CardGeneratorProps {
    cardId?: string | undefined;
}



/* ---------------------------
    AppData Interfaces
-----------------------------*/

export interface AppLoadingPayload {
    isLoading: boolean;
    loadingMsg?: string;
}

export interface AppConfig {
    rollImgRoot: string;
    audioRoot: string;
    playLength: number;
    subjImgRoot: string;
    cardThumbImgRoot: string;
    cardDownloadLimit: number;
    apiRoot: string;
    gameId: string;
}

export interface UserCard {
    _id?: string;
    gameId: string;
    cardName: string;
    createdAt?: string;
    selectedSubjects: SelectedSubject[];
    probabilityMatrix: string;
}


export interface AppDataLogin {
    token: string;
    user: AppUser;
}


export interface AppDataState {
    uiState: {
        isLoading: boolean;
        loadingMsg?: string;
        user?: AppUser;
        userCards?: UserCard[];
        token?: string;
        loginFail?: true;
        appError?: AppError;
    }
}

export interface LoginDataProps {
    username: string;
    password: string;
}



export interface AppUser {
    _id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    cardsRemaining?: number;
}




/* ---------------------------
    CardData Interfaces
-----------------------------*/

export interface SavedCardState {
    savedCards?: SavedCardData[] | [];
}


export interface SavedCardData {
    _id?: string;
    cardName: string;
    cardThumbImg: string;
    probabilityMatrix: string;
    gameId: string;
    downloadCount: number;
    selectedSubjects: Subject[];
    createdAt:  string;
    updatedAt: string;
}

export interface ProbabilityReportProps {
    cardId?: string | undefined;
}



export interface UserCardProps {
    cardData: SavedCardData;
}


export interface UserCardListProps {
    handleTileClick: (cardId:any) => void;
}



export interface ImageWithPreloaderProps {
    src: string;
    style?: string;
    className?: string;
    duration?: string;
}



export interface DynamicContent {
    contentId?: string;
    pageTitle: string;
    pageContent: string;
}


export interface AppError {
    error: {
        status: number | string;
        message: string;
        description?: string
    }
}



export interface PutDataConfiguration {
    method?: string;
    contentType?: string;
    body?:any;
}



export interface ShowGeneratorPayloadAction {
    showGenerator: boolean;
    cardId?: string;
}


export interface PlayAgainButtonProps {
    handleClick: () => void;
}


export interface TilePopoverProps {
    data: Subject
    show: boolean;
    target: any;
    containerRef: any;
    idx: number;
}

export interface PageTitleProps {
    pageTitle: string;
    ref?:React.MutableRefObject<any>
    
}