
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



export interface NonDataSubject {
    subjectImg: string;
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

export interface CreateImageResponse {
    thumbUrl: string;
    imageUrl: string;
}


export interface CardDisplay {
    _id: string;
    cardName: string;
    cardThumbImg: string;
    createdAt: string;
}

export interface CardGenDataState {
    subjects: Subject[];
    uiState: {
        screen: string;
        selectedSubjects: SelectedSubject[];
        enabled: boolean;
        tileDisplayCount: number;
        rollComplete: boolean;
        playMusic: boolean;
        showReport: boolean;
        probabilityMatrix: {
            vals: [number[]],
            rowProbs: number[],
            colProbs: number[],
            diagProbs: number[]
        };
    }
}


export interface SubjectUpdatePayload {
    subjects: Subject[];
}

export interface PreloadScreenProps {
    handleClick: () => void;
}


export interface ModalButtonProps {
    handleClose: () => void;
    cardId?: string | null;
}

export interface CardGenModalProps {
    cardId?: string | undefined;
    showGenerator: boolean;
    handleClose: () => void 
}

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
    selectedSubjects: Subject[];
    createdAt:  string;
    updatedAt: string;
}

export interface ProbabilityReportProps {
    cardId?: string | undefined;
}



export interface UserCardProps {
    cardData: SavedCardData;
    handleClick: (cardId: any) => void;
}


export interface UserCardListProps {
    handleClick: (cardId:any) => void;
}