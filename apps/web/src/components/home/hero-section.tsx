"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@songzi/ui";
import { BookOpen, Github, Mail, Tv, Twitter } from "lucide-react";

// EDIT HERE: Your headline and description
const HERO_DATA = {
  headline: "一句简短的话",
  description:
    "在这里写一段稍微长一点的描述，告诉访客你是谁，你做什么，你的兴趣爱好是什么。这段文字可以更长一些，让访客更好地了解你。",
  avatar: {
    src: "https://github.com/evilrabbit.png",
    fallback: "ER",
  },
} as const;

// EDIT HERE: Your social media links
const SOCIAL_LINKS = {
  github: "https://github.com/username",
  twitter: "https://twitter.com/username",
  douyin: "https://www.douyin.com/user/123456",
  rednote: "https://xiaohongshu.com/user/profile/123456",
  email: "example@email.com",
} as const;

export default function HeroSection() {
  return (
    <section className="px-10 py-24">
      <div className="flex flex-col space-y-6">
        <Avatar className="size-16 rounded-sm">
          <AvatarImage
            src={HERO_DATA.avatar.src}
            alt="avatar"
            className="rounded-sm"
          />
          <AvatarFallback>{HERO_DATA.avatar.fallback}</AvatarFallback>
        </Avatar>

        <div className="space-y-4">
          <h1 className="text-2xl font-bold sm:text-3xl">
            {HERO_DATA.headline}
          </h1>
          <p className="max-w-3xl  text-muted-foreground">
            {HERO_DATA.description}
          </p>
        </div>

        <Tabs defaultValue="github" className="mt-4">
          <div className="rounded-md border border-border bg-muted">
            <div className="px-4 pt-3">
              <TabsList variant="line">
                <TabsTrigger value="github">
                  <Github className="size-4" />
                  GitHub
                </TabsTrigger>
                <TabsTrigger value="twitter">
                  <Twitter className="size-4" />
                  Twitter
                </TabsTrigger>
                <TabsTrigger value="douyin">
                  <Tv className="size-4" />
                  抖音
                </TabsTrigger>
                <TabsTrigger value="rednote">
                  <BookOpen className="size-4" />
                  小红书
                </TabsTrigger>
                <TabsTrigger value="email">
                  <Mail className="size-4" />
                  Email
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="border-t border-border p-4">
              <TabsContent value="github">
                <code className="text-sm text-muted-foreground">
                  {SOCIAL_LINKS.github}
                </code>
              </TabsContent>
              <TabsContent value="twitter">
                <code className="text-sm text-muted-foreground">
                  {SOCIAL_LINKS.twitter}
                </code>
              </TabsContent>
              <TabsContent value="douyin">
                <code className="text-sm text-muted-foreground">
                  {SOCIAL_LINKS.douyin}
                </code>
              </TabsContent>
              <TabsContent value="rednote">
                <code className="text-sm text-muted-foreground">
                  {SOCIAL_LINKS.rednote}
                </code>
              </TabsContent>
              <TabsContent value="email">
                <code className="text-sm text-muted-foreground">
                  {SOCIAL_LINKS.email}
                </code>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
