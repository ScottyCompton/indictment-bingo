

const LeaderBoard728X90:React.FC = () => {
    const mockIdx = Math.floor(Math.random() * 5)+1;
    return (
        <div className="leaderboard-728x90 d-flex justify-content-center">
            <img src={`../dist/images/mockup/728x90_${mockIdx}.jpg`} alt="Click here to buy our shit" />
        </div>
    )
}

export default LeaderBoard728X90