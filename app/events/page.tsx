import React from "react";
import PastEvents from "@/components/pastEvents";
import { Container } from "@/components/container";
import { pastEvents } from "@/Content/Events";
import Header from '@/components/header'


const page = () => {
  return (
    <Container>
      <Header title='Events'>
        Over the years we&apos;ve transformed the face of cybersecurity, therby therefore realise regardless thereafter unrestored underestimated variety of various undisputed achievments
      </Header>


      <h2 className='md:text-4xl text-3xl font-medium'>Past Events</h2>
      <div className='w-full border-2 my-4 border-dashed border-white/12' />


      {/* <EventCard /> */}

      <div className="mt-12 flex flex-col gap-8">
        {pastEvents.map((event, idx) => (
          <PastEvents key={idx} {...event} />
        ))}
      </div>
    </Container>
  );
};

export default page;
