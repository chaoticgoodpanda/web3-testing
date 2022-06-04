import { Icon, Menu } from "semantic-ui-react";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Menu.Item onClick={() => router.push("/")}>CrowdCoin</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item onClick={() => router.push("/campaigns/new")}>
          <Icon name="add" />
          Add Campaign
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
