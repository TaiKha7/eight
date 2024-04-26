"use client"; // cuz interactive

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar"; //npm i react-circular-progressbar


import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import "react-circular-progressbar/dist/styles.css";

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
  percentage
}: Props) => {
// Positions of circles "start"..level1... :
  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;

  if (cycleIndex <= 2) {    // moving from 0 to 2
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) { // move from 2 to 0
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) { // move from left to -2
    indentationLevel = 4 - cycleIndex;
  } else {  // complete cycle and go back to the center
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 40;

  const isFirst = index === 0; // check if index = 0
  const isLast = index === totalCount;  // check if index = total count of lessons
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const href = isCompleted ? `/lesson/${id}` : "/lesson";   // load current active lesson
  return (
    <Link
      href={href}
      aria-disabled={locked}    // disabled if lesson is locked
      style={{ pointerEvents: locked ? "none" : "auto" }}   // no pointerevents if locked
    >
      <div
        className="relative"
        style={{
            // current lesson will have tooltip saying " start " and we need to remove it 
            // just a lil bit from the banner "unit1..learn..continue..." otherwise it will hover over the banner
          right: `${rightPosition}px`,
          marginTop: isFirst && !isCompleted ? 60 : 24,
        }}
      >
        {current ? (
          <div className="h-[102px] w-[102px] relative">
            <div className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase text-green-500 bg-white rounded-xl animate-bounce tracking-wide z-10">
              Start
              <div
                className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"
              />
            </div>
            <CircularProgressbarWithChildren    // circle showing percentage of progress
              value={Number.isNaN(percentage) ? 0 : percentage}
              styles={{
                path: {
                  stroke: "#4ade80",
                },
                trail: {
                  stroke: "#e5e7eb",
                },
              }}
            >
              <Button   // button.tsx size: rounded:"rounded-full"
                size="rounded"
                variant={locked ? "locked" : "secondary"}
                className="h-[70px] w-[70px] border-b-8" //fixed height and width
              >
                <Icon
                  className={cn( //cn = dynamic
                    "h-10 w-10",
                    locked 
                    ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                    : "fill-primary-foreground text-primary-foreground",
                    isCompleted && "fill-none stroke-[4]"   //if it is completed = fill-none..
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
                ? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
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