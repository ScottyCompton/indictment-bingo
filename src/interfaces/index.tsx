export interface Subject {
    subjectId: number;
    subjectTitle: string;
    subjectImg:string;
    subjectDesc: string;
    bingoDate: string;
}

export interface NonDataSubject {
    subjectImg: string;
}

export interface SubjectTileProps {
    subjectData: Subject;
    idx: number;
}

