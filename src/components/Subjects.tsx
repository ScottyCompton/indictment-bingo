import {useState, useEffect} from 'react';
import subjectData from '../fixtures/subjectData.json';
import SubjectTile from '../components/SubjectTile';
import {v4 as uuid} from 'uuid';




const Subjects:React.FC = () => {
    const {subjects} = subjectData;
    const [arySubjects, setSubjectData] = useState([
        {
            subjectId: -1,
            subjectTitle: "",
            subjectImg: 'nothing.png',
            subjectDesc: "",
            bingoDate: ""

        }
    ]);

    

    useEffect(() => {
        let subjectData = {
            subjectId: -1,
            subjectTitle: "",
            subjectImg: 'nothing.png',
            subjectDesc: "",
            bingoDate: ""
        }

        const aryOut:any[] = [];
            for(let i = 0; i < subjects.length; i++) {
                aryOut.push(subjectData)
            }
            setSubjectData(aryOut)


    }, [subjects])






    const setPreSelected = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // const aryOut:any[] = [];
        // arySubjects.forEach((item) => {
        //     aryOut.push(blankData)
        // })
        // setSubjectData(aryOut)

    }



    const setRolling = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {  
        let aryOut = arySubjects.slice();

        let currIdx = 0;
        let nextIdx = 0;
        arySubjects.forEach((item, idx) => {
            while (nextIdx === currIdx) {
                nextIdx = Math.floor(Math.random() * 6)+1;
            }
            const rollerImg = `roller${nextIdx}.gif`
            aryOut.splice(idx, 1, {...arySubjects[idx], subjectImg: rollerImg})
            currIdx = nextIdx;
        })

        setSubjectData(aryOut);


        let selectedIndex = -1;
        const arySelected:any[] = [];

        while((arySelected.length < subjects.length)) {
            selectedIndex = Math.floor(Math.random() * subjects.length);
            let nextSubject = subjects[selectedIndex];      // pull a random subject out of the subjects array
            
            if (arySelected.findIndex(item =>  item.subjectId === nextSubject.subjectId) === -1) {
                arySelected.push(nextSubject);
            }
        }
        setSubjectData(arySelected);
        
    }


    return (
        <>
            <div className="card bg-light mb-3 subjects">
                <div className="card-body">
                    <div className="subjects_subheading">I N D I C T M E N T</div>
                    <div className="subjects_wrapper">
                        <div className="subjects_title">B</div>
                        <div className="subjects_title">I</div>
                        <div className="subjects_title">N</div>
                        <div className="subjects_title">G</div>
                        <div className="subjects_title">O</div>
                        {arySubjects && arySubjects.map((subject,idx) => {
                        return <SubjectTile key={uuid()} idx={idx}  subjectData={subject} />
                        })}
                    </div>
                </div>
            </div>
            <div className="subjects_nav">
                <button className="btn btn-success" onClick={setRolling}>PLAY INDICTMENT BINGO!</button>
            </div>
        </>
                
    )
}

export default Subjects;



