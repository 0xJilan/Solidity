export const getOwner = async (accounts, contract, setOwner) => {
  try {
    const contractOwner = await contract.methods
      .owner()
      .call({ from: accounts[0] });
    setOwner(contractOwner);
  } catch (error) {
    console.log("Unable to get Owner");
  }
};

export const getVoter = async (accounts, contract, setVoter) => {
  try {
    const voter = await contract.methods
      .getVoter(accounts[0])
      .call({ from: accounts[0] });
    setVoter(voter);
  } catch (error) {
    console.log("You're not whitelisted");
  }
};
const status = [
  "RegisteringVoters",
  "ProposalsRegistrationStarted",
  "ProposalsRegistrationEnded",
  "VotingSessionStarted",
  "VotingSessionEnded",
  "VotesTallied",
];
export const getWorkflowStatus = async (accounts, contract, setStatus) => {
  try {
    const currentWorkflow = await contract.methods
      .workflowStatus()
      .call({ from: accounts[0] });
    setStatus(status[currentWorkflow]);
  } catch (error) {
    console.log("Unable to get WorkflowStatus:");
  }
};

export const getWinner = async (accounts, contract, setWinningProposal) => {
  try {
    const winningProposalID = await contract.methods
      .winningProposalID()
      .call({ from: accounts[0] });
    const proposal = await contract.methods
      .getOneProposal(winningProposalID)
      .call({ from: accounts[0] });
    const winningProposal = {
      winningProposalID: winningProposalID,
      description: proposal.description,
      voteCount: proposal.voteCount,
    };
    setWinningProposal(winningProposal);
  } catch (error) {
    console.log("Unable to get WinningProposal");
  }
};

export const addVoter = async (contract, accounts, voterAddress) => {
  try {
    await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Already registered")) {
      console.log("Already registered");
    }
    if (error.message.includes("Voters registration is not open yet")) {
      console.log("Voters registration is not open yet");
    }
  }
};

export const addProposal = async (contract, accounts, proposal) => {
  try {
    await contract.methods.addProposal(proposal).send({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("ne rien proposer")) {
      console.log("Can't submit empty proposal");
    }
    if (error.message.includes("Voters registration is not open yet")) {
      console.log("Voters registration is not open yet");
    }
  }
};

export const fetchProposalsArray = async (
  contract,
  accounts,
  isOwner,
  setProposals
) => {
  try {
    if (!isOwner) {
      const numbersOfProposals = await contract.methods
        .getProposalsArrayCount()
        .call({ from: accounts[0] });
      let proposalsArray = [];

      for (let index = 0; index < numbersOfProposals; index++) {
        proposalsArray.push(
          await contract.methods
            .proposalsArray(index)
            .call({ from: accounts[0] })
        );
      }

      setProposals(proposalsArray);
    }
  } catch (error) {
    console.log("Error while fetching proposals");
  }
};

export const setVote = async (contract, accounts, proposalID) => {
  try {
    await contract.methods.setVote(proposalID).send({ from: accounts[0] });
  } catch (error) {
    console.log("error:", error);

    if (error.message.includes("already voted")) {
      console.log("already voted. ");
    }
    if (error.message.includes("Proposal not found")) {
      console.log("Proposal not found. ");
    }
    if (error.message.includes("Voting session havent started yet")) {
      console.log("Voting session havent started yet. ");
    }
  }
};

export const startProposalsRegistering = async (contract, accounts) => {
  try {
    await contract.methods
      .startProposalsRegistering()
      .send({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Registering proposals cant be started now")) {
      console.log("Registering proposals cant be started now");
    }
  }
};

export const endProposalsRegistering = async (contract, accounts) => {
  try {
    await contract.methods
      .endProposalsRegistering()
      .send({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Registering proposals havent started yet")) {
      console.log("Registering proposals havent started yet");
    }
  }
};
export const startVotingSession = async (contract, accounts) => {
  try {
    await contract.methods.startVotingSession().send({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Registering proposals phase is not finished")) {
      console.log("Registering proposals phase is not finished");
    }
  }
};
export const endVotingSession = async (contract, accounts) => {
  try {
    await contract.methods.endVotingSession().send({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Voting session havent started yet")) {
      console.log("Voting session havent started yet. ");
    }
  }
};

export const tallyVotes = async (contract, accounts) => {
  try {
    await contract.methods.tallyVotes().send({ from: accounts[0] });
  } catch (error) {
    if (error.message.includes("Current status is not voting session ended")) {
      console.log("Current status is not voting session ended");
    }
  }
};
