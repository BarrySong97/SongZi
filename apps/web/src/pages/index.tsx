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
      <div className="mx-auto max-w-3xl space-y-16 px-4 py-12 sm:px-6 lg:px-8">
        <HeroSection />
        <ExperienceSection />
      </div>
    </>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
