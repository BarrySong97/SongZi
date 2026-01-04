import { Avatar, AvatarFallback, AvatarImage } from "@songzi/ui";

// EDIT HERE: Your personal information
const AUTHOR_DATA = {
  name: "Barryson4real",
  bio: "在这里写一段简短的自我介绍，告诉访客你是谁，你做什么。",
  avatar: {
    src: "/avatar.jpg", // 将你的头像图片放在 public 文件夹
    fallback: "YN", // 你的姓名首字母（2个字母）
  },
} as const;

export default async function HeroSection() {
  return (
    <section className="flex flex-col space-y-6">
      <Avatar className="size-16 rounded-sm">
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
          className="rounded-sm"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold sm:text-3xl">{AUTHOR_DATA.name}</h1>
        <p className="max-w-3xl text-lg text-muted-foreground">
          {AUTHOR_DATA.bio}
        </p>
      </div>
    </section>
  );
}
