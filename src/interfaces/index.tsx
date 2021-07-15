
/* ---------------------------
    Card Generator Interfaces
-----------------------------*/


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
}

export interface CardGenModalProps {
    showGenerator: boolean;
    handleClose: () => void 
}



/* ---------------------------
    AppData Interfaces
-----------------------------*/

export interface AppConfig {
    rollImgRoot: string;
    audioRoot: string;
    playLength: number;
    subjImgRoot: string;
    apiRoot: string;
    gameId: string;
}

export interface UserCard {
    _id?: string;
    gameId: string;
    cardName: string;
    createdAt?: string;
    userId: string;
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
        user?: AppUser;
        userCards?: UserCard[];
        token?: string;
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



