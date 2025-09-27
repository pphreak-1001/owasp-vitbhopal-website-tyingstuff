import { Container } from "@/components/container";
import AchievementCard from "@/components/achievementCard";
import { achivementsContent } from "@/Content/Achievements";
import Header from '@/components/header'

export default function Achievements() {
    return (
        <Container>
            <Header title='Achivements'>
                Over the years we&#39;ve transformed the face of cybersecurity, therby therefore realise regardless thereafter unrestored underestimated variety of various undisputed achievments
            </Header>

            <section className="w-full py-20">
                <div className="w-full flex flex-col gap-12">
                    {achivementsContent.map((achievement, index) => (
                        <AchievementCard
                            key={index}
                            title={achievement.title}
                            description={achievement.description}
                            image={achievement.imgUrl}
                            gradientClass={index % 2 === 0 ? "bg-gradient-to-br from-orange-500 to-transparent" : "bg-gradient-to-br from-blue-500 to-cyan-400"}
                        />
                    ))}
                </div>
            </section>
        </Container>
    );
}