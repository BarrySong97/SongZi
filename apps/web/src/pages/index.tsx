import ExperienceSection from "../components/home/experience-section";
import HeroSection from "../components/home/hero-section";
import { Metadata } from "../components/seo/metadata";

export default async function HomePage() {
  return (
    <>
      <Metadata
        title="4REAL - 个人主页"
        description="Barryson4real 的个人主页，全栈工程师，分享技术、思考和生活。"
        keywords={["个人主页", "全栈工程师", "前端", "React", "TypeScript"]}
      />
      <div className="mx-auto max-w-5xl  min-h-[calc(100vh-128px)] border border-border border-t-0 border-b-0">
        <div className="border-b border-b-border">
          <HeroSection />
        </div>
        <div className="border-b border-b-border">
          <ExperienceSection />
        </div>
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
