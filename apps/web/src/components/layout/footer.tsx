import { NavMenu } from "./nav-menu";

export interface FooterProps {
  placeholderText?: string;
  className?: string;
}

export default async function Footer({
  placeholderText = "在这里填写您的页脚文字",
  className,
}: FooterProps) {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">{placeholderText}</p>
        <NavMenu />
      </div>
    </footer>
  );
}
