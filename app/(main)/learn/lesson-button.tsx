"use client"; //bcz its gonna be interactive

import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "react-circular-progressbar/dist/styles.css";
//modifying css of it

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

export const LessonButton = ({
   id,
   index,
   totalCount,
   locked,
   current,
   percentage,

}: Props) => {
// go one two out, one in then back inside

  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  //moving right from 0 to 2:
  if (cycleIndex <= 2) { 
    indentationLevel = cycleIndex; 
  }

  else if (cycleIndex <= 4) indentationLevel = 4 - cycleIndex;
  //move back from center: 2 to 0

  else if (cycleIndex <= 6) indentationLevel = 4 - cycleIndex;
  //move from left to -2(other direction)

  else indentationLevel = cycleIndex - 8;
  // go back to center

  const rightPosition = indentationLevel * 40;
  //40 = spacing

  const isFirst = index === 0;
  //check if index is 0
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;
  //if is completed = check icon, otherwise if last = crown, otherwise  = star

  const href = isCompleted ? `/lesson/${id}` : "/lesson";
  //if iscompleted go to lessonid otherwise load any active lesson
  //logic from duolingo architecture

  return (
    
    <Link
      href={href}
      aria-disabled={locked}
      style={{ pointerEvents: locked ? "none" : "auto" }}
    >
      <div
        className="relative"
        style={{
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
          // marginTop = if is first, move away a bit from unitbanner
        }}
      >
        {current ? (
            //bouncing "start" element
          <div className="relative h-[102px] w-[102px]">
            <div className="absolute -top-6 left-2.5 z-10 animate-bounce rounded-xl border-2 bg-white px-3 py-2.5 font-bold uppercase tracking-wide text-green-500">
              Start
              <div
                className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent"
                aria-hidden
              />
            </div>
            <CircularProgressbarWithChildren
              value={Number.isNaN(percentage) ? 0 : percentage}
              // if percentage = nan , default it to 0 , else percentage
              styles={{ 
                path: {
                  stroke: "#4ade80",
                },
                trail: {
                  stroke: "#e5e7eb",
                },
              }}
              //circular shape
            >
              <Button
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] border-b-8"
              >
                <Icon
                //created at the top
                //CN = TO MAKE IT DYNAMIC
                  className={cn(
                    "h-10 w-10",
                    locked
                      ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                      : "fill-primary-foreground text-primary-foreground",
                    isCompleted && "fill-none stroke-[4]"
                  )}
                />
              </Button>
            </CircularProgressbarWithChildren>
          </div>
        ) : (
          <Button
            size="rounded"
            variant={locked ? "locked" : "secondary"}
            className="h-[70px] w-[70px] border-b-8"
          >
            <Icon
              className={cn(
                "h-10 w-10",
                locked
                  ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
                  : "fill-primary-foreground text-primary-foreground",
                isCompleted && "fill-none stroke-[4]"
              )}
            />
          </Button>
        )}
      </div>
    </Link>
  );
};
