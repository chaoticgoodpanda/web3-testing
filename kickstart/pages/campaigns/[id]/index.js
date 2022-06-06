import React, { Component } from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import { Card, Grid } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.id);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.id,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of Manager",
        description:
          "The manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (wei)",
        description:
          "You must contribute at least this much wei to become an approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description: "A request tries to withdraw money from the contract",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of people who have already donated to this campaign",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Balance of Contract (ether)",
        description:
          "Balance is how much money the campaign has left to spend.",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address} />
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;

// export default function CampaignPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const campaign = Campaign(id);
//   const summary = campaign.methods.getSummary().call();
//   // properties of summary object
//   const minimumContribution = summary[0];
//   const balance = summary[1];
//   const requestsCount = summary[2];
//   const approversCount = summary[3];
//   const manager = summary[4];
//
//   const items = [
//     {
//       header: manager,
//       meta: "Address of Manager",
//       description:
//         "The manager created this campaign and can create requests for money.",
//       style: { overflowWrap: "break-word" },
//     },
//   ];
//
//   return (
//     <Layout>
//       <h3>Campaign {id}</h3>
//       <Card.Group items={items} />
//     </Layout>
//   );
// }
