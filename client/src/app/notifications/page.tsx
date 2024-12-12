import Container from "@/components/basic/container/Container";
import BasicHeader from "@/components/basic/basicHeader/BasicHeader";
import BottomNotifications from "@/components/bottomNotifications/BottomNotifications";
export default function Notifications() {
  return (
    <>
      <BasicHeader />
      <Container>
        <BottomNotifications />
      </Container>
    </>
  );
}
