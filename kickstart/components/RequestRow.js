import React from "react";
import { Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";

export default function RequestRow(props) {
  const { Row, Cell } = Table;
  const { id, request, approversCount } = props;

  return (
    <Row>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
    </Row>
  );
}
