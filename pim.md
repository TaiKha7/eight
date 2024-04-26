Lesson header ----------------------------------

Plz define Sidebar + MobileHeader
Comment all gitignore.. / mention things i have to install too in a file

Learn page layouts:
<!-- layout       (error)
page: learnPage
user-progress -->    (error)
heart.svg
points.svg
spainflag.svg
header
feed-wrapper
stciky-wrapper

Sidebar:
sidebar
sidebar-item
learn.svg
<!-- 
quests.svg
leaderboard.svg
shop.svg 
-->

Courses page:
app\(main)\courses\
list.tsx
card.tsx
page.tsx
db\queries.ts(+)
db/schema.ts

user progress: // Each time a course is selected, a new user progress is made
db/schema.ts(+)
db/queries.ts
courses/page.tsx
courses/list.tsx
(main)/learn/page.tsx
courses/loading.tsx
app/layout.tsx
actions/user-progress.ts
<!-- npm run db:push
npm run db:studio
(relation with userProgress)+userPorgress table
// if wanna change database/error happens, (delete old neon DB) create new db
   go to .env file
  change database_url -->

<!-- queries.ts are used to create functions to get userprogress..coursesid etc..
   used inside page.tsx
   ==>page shows userprogress so it calls function(userprogress()) from queries.ts -->
npx shadcn-ui@latest add sonner



Lesson button: // Create buttons of the path of the course
main/learn/page.tsx(+)    Unit
db/schema.ts
\db\queries.ts
learn/unit.tsx
main/learn/learn-buttons.tsx
<!-- missing: npm i react-circular-progressbar -->
scripts/seed.ts      npm run db:seed
\components\ui\button.tsx

<>
exit modal : //when clicking on X button(wanting to leave)
quiz.tsx (?)
<!-- npx shadcn-ui@latest add dialog
npm i zustand -->
public/mascot_sad.svg
store/use-exit-modals.ts
components/modals/exit-modal.tsx // If clicks on leaves he goes back to learning page
app/layout.tsx (ExitModal)
app/lesson/header.tsx

Challenge_cards:
app/lesson/quiz.tsx
npm run db:studio          (a challenge of SELECT type)
app/lesson/page.tsx
app/lesson/question-bubble.tsx
app/lesson/challenge.tsx
public/man.svg 
public/woman.svg
public/robot.svg
app/lesson/card.tsx


challenge footer: 
<!-- ilelevenlabs -->
public/es_man.mp3
<!-- es_robot
es_woman -->
npm i react-use
lesson/footer.tsx

Challenge actions:      //seeing challenge progress being saved
actions/challenge-progress.ts
<!-- follow import ... from @/db/schema to add to ur schema file -->
npm run db:seed
// hearts getting reduced and staying that way
actions/user-progress.ts
app/lesson/quiz.tsx


Challenge finish screen
challenge practice
shop
stripe (mine)
Details
Admin (mine)
Deployment (mine)



Sheet ? 
import * as SheetPrimitive from "@radix-ui/react-dialog";
// npm install @radix-ui/react-dialog





courses/cards.tsx-------------------------------------
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    title: string;
    id: number;
    imageSrc: string;
    onClick: (id: number) => void;
    disabled?: boolean;
    active?: boolean;
    
};

export const Card = ({
    title,
    id,
    imageSrc,
    disabled,
    onClick,
    active
}: Props) => {
    return (
        <div
            onClick={() => onClick(id)}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
                disabled && "pointer-events-none opacity-50"
            )} // if disabled is true, lower opacity and disable pointer events

        >
            <div className="min-[24px] w-full flex items-center justify-end">
                {active && (
                    <div className="rounded-md bg-green-600 flex items-center justify-center p-1.5">
                        <Check className="text-white stroke-[4] h-4 w-4" />
                    </div> // if active then green small rectangle is on top of
                )}
            </div>

            <Image 
            src={imageSrc}
            alt={title}
            height={70}
            width={93.33}
            className="rounded-lg drop-shadow-md border object-cover"
            />

            <p className="text-neutral-700 text-center font-bold mt-3">
                {title}
             </p>
        </div>
    )
}
