
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
    uiState: {
        screen: string;
        selectedSubjects: SelectedSubject[];
        isLoading: boolean;
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



