import { type Experience, TimelineItem } from "./timeline-item";

// EDIT HERE: Add/edit your work experience
const EXPERIENCES: Experience[] = [
	{
		company: "Mazo AI",
		role: "全栈工程师 · 远程",
		period: "2024 - 至今",
		description: "美国",
		type: "current",
	},
	{
		company: "Signerlabs",
		role: "全栈工程师 · 远程",
		period: "2023 - 2024",
		description: "北京",
		type: "past",
	},
	{
		company: "成都索贝数码科技股份有限公司",
		role: "前端工程师",
		period: "2021 - 2023",
		description: "成都，四川",
		type: "past",
	},
	{
		company: "成都深瑞同华科技有限公司",
		role: "前端工程师",
		period: "2020 - 2021",
		description: "成都，四川",
		type: "past",
	},
];

export default async function ExperienceSection() {
	return (
		<section className="space-y-8">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold sm:text-3xl">工作经历</h2>
			</div>

			<div className="space-y-8">
				{EXPERIENCES.map((exp, index) => (
					<TimelineItem
						key={`${exp.company}-${index}`}
						experience={exp}
						isLast={index === EXPERIENCES.length - 1}
					/>
				))}
			</div>
		</section>
	);
}
