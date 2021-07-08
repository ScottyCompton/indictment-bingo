
export interface Subject {
    subjectId: string;
    subjectTitle?: string | null;
    subjectImg:string;
    subjectDesc?: string | null;
    bingoDate?: string | null;
    rollerImgId?: number;
    imgClass?: string;
}



export interface NonDataSubject {
    subjectImg: string;
}

export interface SubjectTileProps {
    idx: number;
    rollerImgId: number | undefined;
}


export interface SelectedSubject {
    subjectId: string | number;
}

export interface AppDataState {
    subjects: Subject[];
    selectedSubjects: SelectedSubject[];
    uiState: {
        screen: string;
        isLoading: boolean;
        tileDisplayCount: number;
        rollComplete: boolean;
    }
}


export interface SubjectUpdatePayload {
    subjects: Subject[];
}

export interface PreloadScreenProps {
    handleClick: () => void;
}