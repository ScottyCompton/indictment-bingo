export interface Subject {
    subjectId: number;
    subjectTitle: string;
    subjectImg:string;
    subjectDesc: string;
    bingoDate: string | null;
}

export interface NonDataSubject {
    subjectImg: string;
}

export interface SubjectTileProps {
    subjectData: Subject;
    idx: number;
    incrementCounter: (subjectId: number) => void;
}

export interface InfoScreenProps {
    onNav: (navState:string) => void;
}

export interface SplashScreenProps {
    onNav: (navState:string) => void;
}

export interface PreLoadScreenProps {
    onNav: (navState:string) => void;    
}

export interface SubjectScreenProps {
    onNav: (navState:string) => void;    

}

