import React, { Component } from "react";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import { Card } from "semantic-ui-react";

class CampaignShow extends Component {
  static async getInitialProps(address) {
    console.log(address);
    const campaign = Campaign(address.query.id);

    const summary = await campaign.methods.getSummary().call();

    return {
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
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        {this.renderCards()}
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
