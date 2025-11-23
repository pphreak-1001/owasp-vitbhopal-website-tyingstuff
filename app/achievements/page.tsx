import Achievement from "@/components/achievement";
import Header from "@/components/header";
import { Container } from "@/components/container";

export default function Achievements() {
  return (
    <Container>
      <Header title="Achivements">
        Over the years we&#39;ve transformed the face of cybersecurity, therby
        therefore realise regardless thereafter unrestored underestimated
        variety of various undisputed achievments
      </Header>

      <h2 className='md:text-4xl text-3xl font-medium'>Our Achievements</h2>
      <div className='w-full border-2 my-4 border-dashed border-white/12' />

      {/* New slider-based achievements component */}
      <div className="mt-12">
        <Achievement />
      </div>
    </Container>
  );
}
