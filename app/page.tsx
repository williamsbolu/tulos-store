import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Container classname="py-10">
        <HomeBanner />
      </Container>
    </div>
  );
}
