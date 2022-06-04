import { Icon, Menu } from "semantic-ui-react";

export default function Header() {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item>CrowdCoin</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item>
          <Icon name="add" />
          Add Campaign
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
