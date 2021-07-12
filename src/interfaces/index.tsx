
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


export interface CardGenDataState {
    subjects: Subject[];
    selectedSubjects: SelectedSubject[];
    uiState: {
        screen: string;
        isLoading: boolean;
        enabled: boolean;
        tileDisplayCount: number;
        rollComplete: boolean;
        tileTimers: number[],
        playMusic: boolean;
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





/* ---------------------------
    AppData Interfaces
-----------------------------*/


export interface AppDataState {
    uiState: {
        isLoading: boolean;
        user?: AppUser;
    }
}

export interface LoginDataProps {
    username: string;
    password: string;
}



export interface AppUser {
    user: {
        _id: string;
        email: string;
        name: string;
    };
    token: string;
}