import Register from "./Register";
import Registration from "./Registration";
import Vote from "./Vote";
import Winner from "../../Winner";

const VoterView = ({ props }) => {
  const { status } = props;
  return (
    <div className="view">
      {status === "RegisteringVoters" && <Registration props={props} />}
      {status === "ProposalsRegistrationStarted" && <Register props={props} />}
      {status === "ProposalsRegistrationEnded" && (
        <p>Wait until admin start voting session...</p>
      )}
      {status === "VotingSessionStarted" && <Vote props={props} />}
      {status === "VotingSessionEnded" && (
        <p>Vote ended. wait until admin tally votes</p>
      )}
      {status === "VotesTallied" && <Winner props={props} />}
    </div>
  );
};

export default VoterView;
