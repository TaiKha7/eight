"use server";   
// it's a server action 

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, currentUser } from "@clerk/nextjs";
import { getCourseById, getUserProgress } from "@/db/queries";
import db from "@/db/drizzle";
import { userProgress } from "@/db/schema";

// upsert () : if we already  have the course in our database then update . 
//If we started the course Spanish then I passed to French and I want to go back to it We'll use upsert() method 

export const upsertUserProgress = async (courseId: number) => {

    const { userId } = await auth(); 
    const user = await currentUser() ; 

    if (!userId || !user) {
        throw new Error('Unauthorized');
        }
    // else 
    const course = await getCourseById(courseId); 

    if (!course) {
        throw new Error("Course not found");
    }

    // throw new Error("test");

    

    // if (!course.units.length || !course.units[0].lessons.length) {
    //     throw new Error("Course is empty");
    // }

    const existingUserProgress = await getUserProgress();
    
    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
            // in case of failure we use the dafault username and the default imageSrc declared in db schema 
        });
        
        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }
    // the revalidatePath: will purge the Client-side Router Cache and revalidate the Data Cache on the next page visit.
    // it will break the method and will not let the program go further 
    // if it's the first time that the user will make a progress : insert ()

    await db.insert(userProgress).values({
        userId,
        activeCourseId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
      });
    
      revalidatePath("/courses");
      revalidatePath("/learn");
      redirect("/learn");
    }
    // Enable when units and lessons are available : 
   // }
