"use client";
import { useEffect } from "react";

import { useSupabase } from "@/lib/context/SupabaseProvider";
import { redirectToPreviousPageOrChatPage } from "@/lib/helpers/redirectToPreviousPageOrChatPage";

import {
  DemoSection,
  FooterSection,
  HomeHeader,
  HomeSection,
  IntroSection,
  SecuritySection,
  TestimonialsSection,
} from "./components";
import { HomeHeaderBackground } from "./components/HomeHeader/components/HomeHeaderBackground";
import { UseCases } from "./components/UseCases/UseCases";

const HomePage = (): JSX.Element => {
  const { session } = useSupabase();

  useEffect(() => {
    if (session?.user !== undefined) {
      redirectToPreviousPageOrChatPage();
    }
  }, [session?.user]);

  return (
    <>
      <HomeHeaderBackground />
      <HomeHeader />

      <main
        className="relative flex flex-col items-center"
        data-testid="home-page"
      >
        <HomeSection bg="transparent">
          <IntroSection />
        </HomeSection>

        <HomeSection bg="bg-[#FCFAF6]" slantAfter="down" hiddenOnMobile={true}>
          <DemoSection />
        </HomeSection>

        <HomeSection
          bg="bg-[#362469]"
          slantCurrent="down"
          gradient="bg-gradient-to-t bg-gradient-to-t from-white to-[#362469]"
        >
          <UseCases />
          <div />
        </HomeSection>

        <HomeSection bg="bg-white" slantBefore="down" slantAfter="up">
          <SecuritySection />
        </HomeSection>

        <HomeSection bg="bg-[#FCFAF6]" slantCurrent="up">
          <TestimonialsSection />
        </HomeSection>

        <HomeSection
          bg="bg-gradient-to-b from-[#D07DF9] to-[#7A27FD]"
          slantBefore="up"
        >
          <FooterSection />
        </HomeSection>
      </main>
    </>
  );
};

export default HomePage;
